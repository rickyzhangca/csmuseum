// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

import { corsHeaders, handleCors } from '../_shared/cors.ts';

const BUNNY_API_KEY = Deno.env.get('BUNNY_API_KEY') ?? '';
const BUNNY_STORAGE_ZONE = Deno.env.get('BUNNY_STORAGE_ZONE') ?? '';
const BUNNY_STORAGE_REGION = Deno.env.get('BUNNY_STORAGE_REGION') ?? '';

// Supabase client setup
const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  {
    auth: {
      persistSession: false,
    },
  }
);

interface CountRequestBody {
  folderPath: string;
  cityId: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Get user session
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

    const { folderPath, cityId }: CountRequestBody = await req.json();

    if (!folderPath) {
      throw new Error('Missing folder path');
    }

    if (!cityId) {
      throw new Error('Missing city ID');
    }

    // Sanitize the folder path to prevent directory traversal attacks
    const sanitizedPath = folderPath
      .replace(/\.\.\/|\.\./g, '')
      .replace(/^\/+/, '');
    if (sanitizedPath !== folderPath) {
      throw new Error('Invalid folder path');
    }

    // List files in the Bunny CDN folder
    const response = await fetch(
      `https://${BUNNY_STORAGE_REGION}.storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}/${sanitizedPath}/`,
      {
        method: 'GET',
        headers: {
          AccessKey: BUNNY_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to list files: ${response.statusText}`);
    }

    // Parse the response to get file list
    const fileList = await response.json();
    
    // Count only image files (jpg, jpeg, png, webp)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const imageCount = Array.isArray(fileList) 
      ? fileList.filter(file => {
          if (typeof file.ObjectName !== 'string') return false;
          const lowerName = file.ObjectName.toLowerCase();
          return imageExtensions.some(ext => lowerName.endsWith(ext));
        }).length
      : 0;

    // Update the city's shot_count in Supabase
    const { error: updateError } = await supabaseClient
      .from('cities')
      .update({ shots_count: imageCount })
      .eq('id', cityId);

    if (updateError) {
      throw new Error(`Failed to update city: ${updateError.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        count: imageCount,
        cityId,
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

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/bunny-count' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"folderPath":"cities/example-city-id", "cityId":"example-city-id"}'

*/
