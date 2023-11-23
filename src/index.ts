import { Command } from "commander";
import figlet from "figlet";
import { getFiles, getFilesWithAboveSizes } from "./utils/getFiles";
import { bold, green } from "colorette";
import { getDirPath } from "./utils/getDirPath";

const program = new Command();

console.log(figlet.textSync("File Resolver", { horizontalLayout: "full" }));
program
  .version("1.0.0")
  .description("An example CLI for managing a directory")
  .option("-l, --ls  [value]", "List directory contents")
  .option(
    "-lws, --listwithsizes <value...>",
    "List directory contents with sizes"
  )
  .option("-p, --curpath <value>", "Current path")
  .option("-m, --mkdir <value>", "Create a directory")
  .option("-t, --touch <value>", "Create a file")
  .parse(process.argv);

const options = program.opts();

let allFiles = [];

if (options.ls) {
  const dirPath = typeof options.ls === "string" ? options.ls : __dirname;
  getFiles(dirPath);
}

if (options.listwithsizes) {
  let [value1, value2] = options.listwithsizes;
  value1 = value1 != "." ? value1 : __dirname;
  getFilesWithAboveSizes(value1, value2);
}

if (options.curpath) {
  const value = options.curpath;
  getDirPath(value);
}
