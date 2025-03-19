import { Tabs } from '@/primitives';
import { supabase } from '@/supabase';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const getCities = useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const { data, error } = await supabase.from('cities').select('*');
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="max-w-8xl mx-auto flex flex-col gap-4 px-16 py-8">
      <h1>Discover</h1>
      <div className="flex flex-col gap-4">
        {getCities.isLoading && <div>Loading cities...</div>}
        {getCities.isError && <div>Error loading cities</div>}
        {getCities.data?.map(city => <div key={city.id}>{city.name}</div>)}
      </div>
      <Tabs defaultValue="new-creator">
        <Tabs.List>
          <Tabs.Tab value="new-creator">New creator</Tabs.Tab>
          <Tabs.Tab value="existing-creator">Existing creator</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Panel value="new-creator">aaa</Tabs.Panel>
        <Tabs.Panel value="existing-creator">bbb</Tabs.Panel>
      </Tabs>
    </div>
  );
}
