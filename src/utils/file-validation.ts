export const fileValidation = (files: File[]) =>
  files.every((f) => f.size <= 1024 * 1024 * 100);
