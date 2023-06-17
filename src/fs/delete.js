import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { promises as sfPromises } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
  const src_file = join(__dirname, "files", "fileToRemove.txt");

  try {
    const src_result = await sfPromises.access(src_file);
    if (src_result === undefined) {
      // means file exist
      await sfPromises.unlink(src_file);
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("FS operation failed");
    } else throw error;
  }
};

await remove();
