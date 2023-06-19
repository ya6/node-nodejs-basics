import { cpus } from "os";
import { Worker } from "worker_threads";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { promises as fsPromises } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
  const host_cpus = cpus().length;
  const workers = {};
  const results = [];
  let count = 1;
  let done_count = 0;
  const start_data = 9;

  try {
    while (count <= host_cpus) {
      await fsPromises.cp(join(__dirname, "worker.js"), join(__dirname, `worker_${count}.js`));
      workers[`${count}`] = new Worker(join(__dirname, `worker_${count}.js`));

      workers[`${count}`].postMessage(start_data + count);

      workers[`${count}`].on("message", function (message) {
        results.push({ data: message, status: "resolved", id: this.threadId });
        this.terminate();
      });

      workers[`${count}`].on("error", (error) => {
        results.push({ data: null, status: "error", id: this.threadId });
        this.terminate();
      });

      workers[`${count}`].on("exit", (exitCode) => {
        done_count += 1;
        if (done_count === host_cpus) {
          const sorted = results.sort((a, b) => {
            return a.id < b.id ? -1 : 1;
          });
          console.log(
            sorted.map((el) => {
              return { data: el.data, status: el.status };
            })
          );
        }
      });

      count += 1;
    }
  } catch (error) {
    console.error(error);
  }
};

await performCalculations();
