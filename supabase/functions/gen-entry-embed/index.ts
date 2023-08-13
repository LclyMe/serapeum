import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Database } from "../../../types/database.types.ts"
import { env, pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.5.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

env.useBrowserCache = false
env.allowLocalModels = false

type Entry = Database['public']['Tables']['entries']["Row"];

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: Entry;
  schema: "public";
  old_record: null | Entry;
}

serve(async (req) => {
  const payload: WebhookPayload = await req.json();

  const newEntry = payload.record;

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
  )
  
  const pipe = await pipeline(
    'feature-extraction',
    'Supabase/gte-small',
  )

  const contentObj = {
    content: newEntry.text,
    description: newEntry.description,
    name: newEntry.name,
    createdAt: newEntry.created_at,
    location: newEntry.location,
    related_date: newEntry.related_date,
  };

  const validatedObj = Object.fromEntries(Object.entries(contentObj).filter(([_, v]) => v != null))
  const content = JSON.stringify(validatedObj);

  const output = await pipe(content, {
    pooling: 'mean',
    normalize: true,
  })

  const embedding = Array.from(output.data)

  const { data, error } = await supabase
    .from('entries')
    .update({ embedding, embedding_updated_at: new Date() })
    .eq('id', newEntry.id)
    .select();

  if (error) {
    console.error(error);
    return new Response("error");
  }

  return new Response("ok");
});