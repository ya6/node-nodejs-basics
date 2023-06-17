import crypto from "crypto";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { promises as fsPromises } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
  const file = join(__dirname, "files", "fileToCalculateHashFor.txt");
  try {
    await fsPromises.access(file);
    const buffer = await fsPromises.readFile(file);
    const hashSum = crypto.createHash("sha256");
    hashSum.update(buffer);
    const hex = hashSum.digest("hex");
    console.log(hex);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await calculateHash();
