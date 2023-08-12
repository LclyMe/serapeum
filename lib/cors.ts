export const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

export const handleCORS = (cb: (req: any) => Promise<Response>) => {
    return async (req: any) => {
      if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
      }
  
      const response = await cb(req);
      Object.entries(corsHeaders).forEach(([header, value]) => {
        response.headers.set(header, value);
      });
  
      return response;
    }
};