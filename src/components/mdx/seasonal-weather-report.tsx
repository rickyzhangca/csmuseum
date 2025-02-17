'use client';

type SeasonalWeatherReportProps = {
  season?: string;
  temperature?: string;
  precipitation?: string;
  description?: string;
};

export function SeasonalWeatherReport({
  season = 'Unknown',
  temperature = '0°C to 10°C',
  precipitation = 'Moderate',
  description = 'No weather data available',
}: SeasonalWeatherReportProps) {
  return (
    <div className="my-6 rounded-lg border bg-gray-50 p-6">
      <h3 className="mb-4 text-xl font-semibold">{season} Weather Report</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <div className="mb-4">
            <span className="font-medium">Temperature:</span> {temperature}
          </div>
          <div>
            <span className="font-medium">Precipitation:</span> {precipitation}
          </div>
        </div>
        <div>
          <span className="font-medium">Description:</span>
          <p className="mt-1 text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
}
