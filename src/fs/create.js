import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { promises as fsPromises } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  const file = join(__dirname, "files", "fresh.txt");
  const content = "I am fresh and young";
  try {
    const result = await fsPromises.access(file);
    if (result === undefined) {
      // means file exist
      throw new Error("FS operation failed");
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      // means file not exist
      await fsPromises.writeFile(file, content);
    } else throw error;
  }
};

await create();
