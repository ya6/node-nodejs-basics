import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { promises as fsPromises } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  let filehandle;
  const file = join(__dirname, "files", "fileToRead.txt");
  try {
    filehandle = await fsPromises.open(file, "r");
    const stream = filehandle.createReadStream({ encoding: "utf8" });
    for await (const chunk of stream) {
      process.stdout.write(chunk + "\n");
    }
  } catch (error) {
    console.error(error);
  } finally {
    await filehandle?.close();
  }
};

await read();
