import { Tabs } from '@/primitives';
import type { ContentType } from '@/types';
import { useState } from 'react';
import { ContentInfoTab } from './content-info-tab';
import { CreatorTab } from './creator-tab';
import { ShotsTab } from './shots-tab';

export const NewContentForm = () => {
  const [selectedTab, setSelectedTab] = useState<
    'city-info' | 'creator' | 'shots'
  >('city-info');

  const [cityId, setCityId] = useState<string | null>(null);
  const [newContentType, setNewContentType] = useState<ContentType | null>(
    null
  );

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
      <Tabs.List>
        <Tabs.Tab className="data-[selected]:bg-white" value="city-info">
          Content Info
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
        <ContentInfoTab
          onComplete={(id, type) => {
            setCityId(id);
            setNewContentType(type);
            setSelectedTab('creator');
          }}
        />
      </Tabs.Panel>
      <Tabs.Panel value="creator">
        <CreatorTab
          cityId={cityId}
          newContentType={newContentType}
          onComplete={() => setSelectedTab('shots')}
        />
      </Tabs.Panel>
      <Tabs.Panel value="shots">
        <ShotsTab cityId={cityId} newContentType={newContentType} />
      </Tabs.Panel>
    </Tabs>
  );
};
