import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";
import { pipeline } from "stream/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const src_file = join(__dirname, "files", "_fileToCompress.txt");
  const dest_file = join(__dirname, "files", "archive.gz");

  await pipeline(createReadStream(src_file), createGzip(), createWriteStream(dest_file));
};
await compress();
