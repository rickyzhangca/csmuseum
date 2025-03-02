export const withBunny = (src: string) => {
  return `https://csmuseum.b-cdn.net/${src}`;
};

export const withBunnyShots = (id: string, index: number) => {
  const paddedIndex = index.toString().padStart(2, '0');
  return `https://csmuseum.b-cdn.net/cities/${id}/${paddedIndex}.webp`;
};

export const withBunnyThumbnail = (id: string) => {
  return `https://csmuseum.b-cdn.net/cities/${id}/thumbnail.webp`;
};

export const withBunnyHeaderSection = (id: string) => {
  return `https://csmuseum.b-cdn.net/ui/header-section/${id}.webp`;
};

export const withBunnyRegion = (id: string) => {
  return `https://csmuseum.b-cdn.net/ui/region-filter/${id}.webp`;
};
