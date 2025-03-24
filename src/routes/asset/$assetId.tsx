import { ContentDetails } from '@/components/content-details';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/asset/$assetId')({
  component: AssetDetail,
});

function AssetDetail() {
  const { assetId } = Route.useParams();

  return <ContentDetails contentId={assetId} contentType="assets" />;
}
