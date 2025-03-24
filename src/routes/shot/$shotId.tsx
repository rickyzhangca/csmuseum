import { ContentDetails } from '@/components/content-details';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/shot/$shotId')({
  component: ShotDetail,
});

function ShotDetail() {
  const { shotId } = Route.useParams();

  return <ContentDetails contentId={shotId} contentType="shots" />;
}
