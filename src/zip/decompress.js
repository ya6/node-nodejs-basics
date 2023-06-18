import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createReadStream, createWriteStream } from "fs";
import { createGzip, createGunzip } from "zlib";
import { pipeline } from "stream/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const src_file = join(__dirname, "files", "archive.gz");
  const dest_file = join(__dirname, "files", "fileToCompress.txt");
  await pipeline(createReadStream(src_file), createGunzip(), createWriteStream(dest_file));
};

await decompress();
