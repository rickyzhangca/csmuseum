export const canShowConsole = () => {
  return import.meta.env.DEV || import.meta.env.IS_ADMIN;
};
