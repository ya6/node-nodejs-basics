import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { promises as fsPromises } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
  const src_file = join(__dirname, "files", "wrongFilename.txt");
  const dest_file = join(__dirname, "files", "properFilename.md");

  try {
    await fsPromises.access(src_file);
  } catch (error) {
    throw new Error("FS operation failed");
  }

  try {
    const dest_result = await fsPromises.access(dest_file);
    if (dest_result === undefined) {
      // means file exist
      throw new Error("FS operation failed");
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      // means file not exist
      await fsPromises.rename(src_file, dest_file);
    } else throw error;
  }
};

await rename();
