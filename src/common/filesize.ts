export const convertFileSizes = (fileSize: string): number => {
  fileSize = fileSize.toUpperCase();
  if (fileSize.includes("KB")) {
    return parseInt(fileSize.replace("KB", "").trim());
  } else if (fileSize.includes("MB")) {
    return parseInt(fileSize.replace("MB", "").trim()) * 1024;
  } else if (fileSize.includes("GB")) {
    return parseInt(fileSize.replace("GB", "").trim()) * 1024 * 1024;
  } else {
    throw new Error("Invalid file size format. Please use KB, MB or GB.");
  }
};
