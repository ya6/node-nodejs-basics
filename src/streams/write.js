import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { promises as fsPromises } from "fs";
import { promises as readline } from "node:readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  let filehandle;
  const file = join(__dirname, "files", "fileToWrite.txt");
  try {
    filehandle = await fsPromises.open(file, "w");
    const writeStream = filehandle.createWriteStream({ encoding: "utf8" });

    rl.on("line", (line) => {
      writeStream.write(line + "\n");
    });

    rl.on("SIGINT", () => {
      rl.close();
      filehandle.close();
    });
  } catch (error) {
    console.error(error);
  }
};

await write();
