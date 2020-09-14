export const validURL = (str: string) => {
  try {
    new URL(str);
  } catch (_) {
    return false;
  }

  return true;
};
