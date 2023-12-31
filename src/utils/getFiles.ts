import fs from "fs";
import path from "path";
import { convertFileSizes } from "../common/filesize";
import { red, bold } from "colorette";
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
    if (detailedFiles.length === 0) {
      console.log(bold(red("No file found")));
      return;
    }
    console.table(detailedFiles);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getFilesWithAboveSizes = async (
  dirPath: string,
  sizeOfFile: string
) => {
  try {
    const files = await fs.promises.readdir(dirPath);
    const detailedFiles = files.map(async (file: string) => {
      let fileDetails = await fs.promises.lstat(path.resolve(dirPath, file));
      const { size, birthtime } = fileDetails;
      const sizeInKB = convertFileSizes(sizeOfFile);
      if (size >= sizeInKB) {
        return {
          file: file,
          "size(KB)": size,
          created_at: birthtime,
        };
      } else {
        return null;
      }
    });
    const detailedFilesToPrint = (await Promise.all(detailedFiles)).filter(
      (file) => file !== null
    );
    if (detailedFilesToPrint.length === 0) {
      console.log(bold(red("No file found")));
      return;
    }
    console.table(detailedFilesToPrint);
  } catch (error) {
    console.log("Error: ", error);
  }
};
