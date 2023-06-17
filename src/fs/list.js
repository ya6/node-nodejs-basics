import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { promises as fsPromises } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  const src_dir = join(__dirname, "./files");
    try {
      await fsPromises.access(src_dir);
     const res =  await fsPromises.readdir(src_dir);
     console.log(res);
    } catch (error) {
      throw new Error("FS operation failed");
    }
};

await list();
