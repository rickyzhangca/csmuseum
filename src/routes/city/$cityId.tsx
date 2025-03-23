import { ContentDetails } from '@/components/content-details';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/city/$cityId')({
  component: CityDetail,
});

function CityDetail() {
  const { cityId } = Route.useParams();

  return <ContentDetails contentId={cityId} contentType="cities" />;
}
