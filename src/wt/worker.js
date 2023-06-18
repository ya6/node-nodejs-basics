import { parentPort } from "worker_threads";

// n should be received from main thread
const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

const sendResult = () => {
  parentPort.on("message", (data) => {
    // console.log("Message received from main script", data);
    const workerResult = nthFibonacci(data);
    // console.log("Posting message back to main script");
    parentPort.postMessage(workerResult);
    
  });
};

sendResult();
