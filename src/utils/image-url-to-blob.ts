export const ImageUrlToBlob = async (
  url?: string,
  filename?: string
): Promise<File[] | undefined> => {
  if (!url) return undefined;
  const response = await fetch(url);
  const blob = await response.blob();

  const file = new File([blob], filename as string, {
    type: blob.type,
  });

  return [file];
};
