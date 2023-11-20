import fs from "fs";
import path from "path";
export const getFiles = async (dirPath: string) => {
  try {
    const files = await fs.promises.readdir(dirPath);
    const detailedFilesPr = files.map(async (file: string) => {
      let fileDetails = await fs.promises.lstat(path.resolve(dirPath, file));
      const { size, birthtime } = fileDetails;
      return {
        fileName: file,
        "size(KB)": size,
        created_at: birthtime,
      };
    });
    const detailedFiles = await Promise.all(detailedFilesPr);
    console.table(detailedFiles);
  } catch (error) {
    console.log("Error: ", error);
  }
};
