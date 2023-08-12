import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Database } from "../../../types/database.types.ts"
import { env, pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.5.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { handleCORS } from '../../../lib/cors.ts'

env.useBrowserCache = false
env.allowLocalModels = false

serve(handleCORS(async (req) => {
  const { input, valut_id } = await req.json();

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
  )
  
  const pipe = await pipeline(
    'feature-extraction',
    'Supabase/gte-small',
  )

  const output = await pipe(input, {
    pooling: 'mean',
    normalize: true,
  })

  const embedding = Array.from(output.data)

  const { data, error } = await supabase.rpc("match_entries", {
    valut_id,
    query_embedding: embedding, // Pass the embedding you want to compare
    match_threshold: 0.78, // Choose an appropriate threshold for your data
    match_count: 10, // Choose the number of matches
  })

  if (error) {
    console.error(error);
    return new Response("error");
  }

  return new Response(JSON.stringify(data));
}));