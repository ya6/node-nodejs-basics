import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { promises as fsPromises } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const file = join(__dirname, "files", "fileToRead.txt");
  try {
    await fsPromises.access(file);
    const res = await fsPromises.readFile(file, 'utf8');
    console.log(res);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await read();
