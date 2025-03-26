export const sanitizeXiaohongshuUrl = (url: string) => {
  return url.replace(/&xsec_source=pc_user/, '');
};
