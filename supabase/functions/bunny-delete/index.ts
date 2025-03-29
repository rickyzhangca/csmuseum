// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// setup type definitions for built-in Supabase Runtime APIs
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

import { corsHeaders, handleCors } from '../_shared/cors.ts';

const BUNNY_API_KEY = Deno.env.get('BUNNY_API_KEY') ?? '';
const BUNNY_STORAGE_ZONE = Deno.env.get('BUNNY_STORAGE_ZONE') ?? '';
const BUNNY_STORAGE_REGION = Deno.env.get('BUNNY_STORAGE_REGION') ?? '';

// supabase client setup
const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  {
    auth: {
      persistSession: false,
    },
  }
);

interface DeleteRequestBody {
  imagePath: string;
}

serve(async (req: Request) => {
  // handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // get user session
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser(token);

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    // parse request body
    const { imagePath }: DeleteRequestBody = await req.json();

    if (!imagePath) {
      throw new Error('Missing image path');
    }

    // sanitize the image path to prevent directory traversal attacks
    const sanitizedPath = imagePath
      .replace(/\.\.\/|\.\./g, '')
      .replace(/^\/+/, '');

    if (sanitizedPath !== imagePath) {
      throw new Error('Invalid image path');
    }

    // extract the path from the CDN URL if a full URL was provided
    let finalPath = sanitizedPath;
    if (sanitizedPath.includes('b-cdn.net')) {
      // extract the path after the storage zone name
      const regex = new RegExp(`${BUNNY_STORAGE_ZONE}\\.b-cdn\\.net\\/(.+)`);
      const match = sanitizedPath.match(regex);
      if (match?.[1]) {
        finalPath = match[1];
      } else {
        throw new Error('Invalid CDN URL format');
      }
    }

    // delete from Bunny.net storage
    const deleteResponse = await fetch(
      `https://${BUNNY_STORAGE_REGION}.storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}/${finalPath}`,
      {
        method: 'DELETE',
        headers: {
          AccessKey: BUNNY_API_KEY,
        },
      }
    );

    if (!deleteResponse.ok) {
      throw new Error(`Bunny.net delete failed: ${await deleteResponse.text()}`);
    }
    
    // purge the CDN cache for this file
    const purgeResponse = await fetch(
      `https://api.bunny.net/purge?url=${encodeURIComponent(`https://${BUNNY_STORAGE_ZONE}.b-cdn.net/${finalPath}`)}`,
      {
        method: 'POST',
        headers: {
          AccessKey: BUNNY_API_KEY,
        },
      }
    );
    
    if (!purgeResponse.ok) {
      console.log(`Cache purge warning: ${await purgeResponse.text()}`);
      // We don't throw here as the file is already deleted
      // Just log the warning and continue
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Image deleted successfully',
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    const status = (error as Error).message === 'Unauthorized' ? 401 : 400;
    return new Response(
      JSON.stringify({
        success: false,
        error: (error as Error).message,
      }),
      {
        status,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/bunny-delete' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"imagePath":"path/to/image.webp"}'

*/
