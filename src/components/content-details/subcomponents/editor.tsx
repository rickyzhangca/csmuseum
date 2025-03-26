import { useStore } from '@/store';
import type { Content, ContentType } from '@/types';
import { canShowConsole } from '@/utils';
import { ContentInfoTab } from './content-info-tab';
import { CreatorTab } from './creator-tab';
import { ShotsTab } from './shots-tab';

type EditorProps = {
  contentType: ContentType;
  content: Content;
};

export const Editor = ({ contentType, content }: EditorProps) => {
  const { user } = useStore();

  //TODO - extract this into a hook to also check auth
  if (!user || !canShowConsole()) return null;

  return (
    <div className="max-w-8xl flex flex-col items-center justify-center bg-black/95 px-16">
      <div className="grid w-full grid-cols-3 items-center justify-center gap-3 rounded-xl">
        <ContentInfoTab content={content} contentType={contentType} />
        <CreatorTab content={content} contentType={contentType} />
        <ShotsTab contentType={contentType} content={content} />
      </div>
    </div>
  );
};
