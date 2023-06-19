import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
  const file = join(__dirname, "files", "script.js");

  const childProcess = spawn("node", [file, ...args]);

  // master stdin -->  child stdin
  process.stdin.pipe(childProcess.stdin);
  
  //  child stdout -->  master stdout
  childProcess.stdout.pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(["test_arg_1", "test_arg_1"]);
