import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { promises as fsPromises } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  const src_dir = join(__dirname, "./files");
  const dest_dir = join(__dirname, "./files_copy");
  try {
    await fsPromises.access(src_dir);
  } catch (error) {
    throw new Error("FS operation failed");
  }

  try {
    const dest_result = await fsPromises.access(dest_dir);
    if (dest_result === undefined) {
      // means dir exist
      throw new Error("FS operation failed");
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      // means dir not exist
      await fsPromises.cp(src_dir, dest_dir, { recursive: true });
    } else throw error;
  }
};

await copy();
