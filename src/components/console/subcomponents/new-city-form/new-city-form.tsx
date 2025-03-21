import { Tabs } from '@/primitives';
import { useState } from 'react';
import { CityInfoTab } from './city-info-tab';
import { CreatorTab } from './creator-tab';
import { ShotsTab } from './shots-tab';

export const NewCityForm = () => {
  const [selectedTab, setSelectedTab] = useState<
    'city-info' | 'creator' | 'shots'
  >('city-info');

  const [cityId, setCityId] = useState<string | null>(null);

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
      <Tabs.List>
        <Tabs.Tab className="data-[selected]:bg-white" value="city-info">
          City Info
        </Tabs.Tab>
        <Tabs.Tab className="data-[selected]:bg-white" value="creator">
          Creator
        </Tabs.Tab>
        <Tabs.Tab className="data-[selected]:bg-white" value="shots">
          Shots
        </Tabs.Tab>
        {/* <Tabs.Indicator /> bug: wrong initial size if used in dialog */}
      </Tabs.List>
      <Tabs.Panel value="city-info">
        <CityInfoTab
          onComplete={id => {
            setCityId(id);
            setSelectedTab('creator');
          }}
        />
      </Tabs.Panel>
      <Tabs.Panel value="creator">
        <CreatorTab cityId={cityId} />
      </Tabs.Panel>
      <Tabs.Panel value="shots">
        <ShotsTab cityId={cityId} />
      </Tabs.Panel>
    </Tabs>
  );
};
