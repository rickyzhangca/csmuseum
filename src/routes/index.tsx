import { ContentPreview } from '@/components';
import { Tabs } from '@/primitives';
import { supabase } from '@/supabase';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { parseAsStringLiteral, useQueryState } from 'nuqs';

export const Route = createFileRoute('/')({
  component: Index,
});

const contents = ['cities', 'shots', 'assets'] as const;
type Content = (typeof contents)[number];

function Index() {
  const [content, setContent] = useQueryState<Content>(
    'content',
    parseAsStringLiteral(contents).withDefault('cities')
  );

  const getCities = useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cities_details')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: content === 'cities',
  });

  const getShots = useQuery({
    queryKey: ['shots'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('shots_details')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: content === 'shots',
  });

  const getAssets = useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('assets_details')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: content === 'assets',
  });

  return (
    <div className="max-w-8xl mx-auto flex flex-col gap-6 px-4 py-8 lg:px-8 xl:px-12 2xl:px-16">
      <h1>Discover</h1>
      <Tabs
        className="gap-6"
        value={content}
        onValueChange={value => setContent(value)}
      >
        <Tabs.List className="gap-2 bg-transparent p-0">
          <Tabs.Tab
            value={contents[0]}
            className="rounded-full border border-gray-900/15 text-gray-900 transition hover:bg-gray-900/5 data-[selected]:text-white"
          >
            Cities
          </Tabs.Tab>
          <Tabs.Tab
            value={contents[1]}
            className="rounded-full border border-gray-900/15 text-gray-900 transition hover:bg-gray-900/5 data-[selected]:text-white"
          >
            Shots
          </Tabs.Tab>
          <Tabs.Tab
            value={contents[2]}
            className="rounded-full border border-gray-900/15 text-gray-900 transition hover:bg-gray-900/5 data-[selected]:text-white"
          >
            Assets
          </Tabs.Tab>
          <Tabs.Indicator className="rounded-full bg-gray-900" />
        </Tabs.List>
        <Tabs.Panel value={contents[0]}>
          <div className="flex w-full flex-col gap-4">
            {getCities.isLoading && <div>Loading cities...</div>}
            {getCities.isError && <div>Error loading cities</div>}
            {getCities.data?.map(city => (
              <ContentPreview
                key={city.id}
                display="multiple"
                content={city}
                contentType="cities"
              />
            ))}
          </div>
        </Tabs.Panel>
        <Tabs.Panel value={contents[1]}>
          <div className="3xl:grid-cols-3 4xl:grid-cols-4 grid w-full gap-4 lg:grid-cols-2">
            {getShots.isLoading && <div>Loading shots...</div>}
            {getShots.isError && <div>Error loading shots</div>}
            {getShots.data?.map(shot => (
              <ContentPreview
                key={shot.id}
                display="single"
                content={shot}
                contentType="shots"
              />
            ))}
          </div>
        </Tabs.Panel>
        <Tabs.Panel value={contents[2]}>
          <div className="3xl:grid-cols-3 4xl:grid-cols-4 grid w-full gap-4 lg:grid-cols-2">
            {getAssets.isLoading && <div>Loading assets...</div>}
            {getAssets.isError && <div>Error loading assets</div>}
            {getAssets.data?.map(asset => (
              <ContentPreview
                key={asset.id}
                display="single"
                content={asset}
                contentType="assets"
              />
            ))}
          </div>
        </Tabs.Panel>
      </Tabs>
      <footer>
        <div className="max-w-8xl mx-auto flex flex-col items-center justify-center pt-12 pb-8 sm:pt-20 sm:pb-16">
          <p className="text-center text-gray-400">
            CSMuseum is proudly ad-free and open-source. All contents belong to
            their creators only.
          </p>
        </div>
      </footer>
    </div>
  );
}
