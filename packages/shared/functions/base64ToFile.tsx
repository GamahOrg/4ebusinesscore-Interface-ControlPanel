export function base64ToFile(
  base64Data: string,
  fileName?: string
): File | null {
  if (!base64Data || typeof base64Data !== "string") return null;

  const parts = base64Data.split(",");
  if (parts.length !== 2) {
    console.error("Invalid base64 format");
    return null;
  }

  const mimeMatch = parts[0].match(/^data:(.*?);base64$/);
  if (!mimeMatch) {
    console.error("Invalid base64 mime type");
    return null;
  }

  const mimeType = mimeMatch[1];
  const extension = mimeType.split("/")[1];
  const binaryString = atob(parts[1]); // safe now
  const len = binaryString.length;
  const uint8Array = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  const defaultFileName = fileName || `file-${Date.now()}.${extension}`;
  return new File([uint8Array], defaultFileName, { type: mimeType });
}
export default base64ToFile;
