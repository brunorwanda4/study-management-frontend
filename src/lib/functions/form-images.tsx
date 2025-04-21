export const formImageOnDrop = (
  acceptedFiles: File[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any,
  setError: (error: string) => void
) => {
  setError("");
  const file = acceptedFiles[0];
  if (!file) return;

  if (!file.type.includes("image")) {
    return setError("Please select an image file.");
  }
  if (file.size > 2 * 1024 * 1024) {
    return setError("Image size exceeds 2MB.");
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    const imageDataUrl = event.target?.result as string;
    form.setValue("symbol", imageDataUrl);
  };
  reader.onerror = () => setError("Failed to read image file.");
  reader.readAsDataURL(file);
};
