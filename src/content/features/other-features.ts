// Time of day
const timeFeatures = ['day', 'night', 'sunset', 'sunrise'] as const;

// Architectural styles
const architecturalFeatures = [
  'historic',
  'modern',
  'futuristic',
  'european',
  'asian',
  'american',
  'african',
  'oceanian',
] as const;

// Urban features
const urbanFeatures = [
  'dense',
  'sprawling',
  'planned',
  'organic',
  'residential',
  'commercial',
  'industrial',
] as const;

// Natural features
const naturalFeatures = [
  'mountain',
  'coastal',
  'desert',
  'forest',
  'river',
  'lake',
  'island',
] as const;

// Special features
const specialFeatures = [
  'smart-city',
  'sustainable',
  'gardens',
  'parks',
  'neon',
  'oasis',
] as const;

export const OtherFeatures = [
  ...timeFeatures,
  ...architecturalFeatures,
  ...urbanFeatures,
  ...naturalFeatures,
  ...specialFeatures,
] as const;
