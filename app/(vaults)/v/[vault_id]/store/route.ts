import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { nanoid } from 'nanoid';
import { cookies, headers } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(Request: Request, {params}: { params: { vault_id: string } }) {
  const headersList = headers()
  const authHeader = headersList.get('Authorization');
  if (!authHeader) {
    console.log("Authorization header missing. Please provide an API key.");
    return NextResponse.error();
  }
  const token = authHeader.split(' ')[1];
  const supabase = createRouteHandlerClient({ cookies }, {
    supabaseKey: process.env.SUPABASE_SECRET_KEY
  })
  const { data: apiKey } = await supabase.from('api_keys').select().eq('key', token).single();
  const { data: vault } = await supabase.from('vaults').select().eq('short_id', params.vault_id).match({created_by: apiKey.user_id }).single();
  if (!vault) {
    console.log("Vault not found");
    return NextResponse.error();
  }
  const body = await Request.json();
  const short_id = nanoid(10);
  const {error, data} = await supabase.from('entries').insert({
    vault_id: vault.id,
    text: body.text,
    short_id,
    created_by: apiKey.user_id
  });

  if (error) {
    console.log(error);
    return NextResponse.error();
  }  

  return NextResponse.json({ success: true })
}