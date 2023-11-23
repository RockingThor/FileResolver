import copypaste from "copy-paste";
import { bold, green } from "colorette";

export const getDirPath = (arg: string) => {
  if (arg == "copy") {
    const dirPath = __dirname;
    copypaste.copy(dirPath);
    console.log(
      bold(
        green(
          "Directory path is copied to clipboard, the directory path is: " +
            dirPath
        )
      )
    );
  } else {
    console.log(bold(green("Directory path: " + __dirname)));
  }
};
