import { ToggleGroup, ToggleGroupItem } from '@/components';

const Homepage = async () => {
  return (
    <div className="flex flex-col gap-8 py-12">
      <h1>How do you city?</h1>
      <div className="flex items-center gap-4">
        <p className="text-muted-foreground">Filters</p>
        <ToggleGroup type="single">
          <ToggleGroupItem value="contest-winning" variant="outline">
            Contest-winning
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="single">
          <ToggleGroupItem value="american" variant="outline">
            American
          </ToggleGroupItem>
          <ToggleGroupItem value="european" variant="outline">
            European
          </ToggleGroupItem>
          <ToggleGroupItem value="asian" variant="outline">
            Asian
          </ToggleGroupItem>
          <ToggleGroupItem value="mixed" variant="outline">
            Mixed
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default Homepage;
