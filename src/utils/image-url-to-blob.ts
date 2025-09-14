import { axiosInstance } from "@/services";
export const ImageUrlToBlob = async (
  url?: string,
  filename?: string
): Promise<File[] | undefined> => {
  if (!url) return undefined;
  const response = await axiosInstance.get("/proxy-media", {
    params: {
      url,
    },
    responseType: "blob",
  });
  const blob = response.data;

  const file = new File([blob], filename as string, {
    type: blob.type,
  });

  return [file];
};
