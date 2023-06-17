const parseArgs = () => {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i += 2) {
    i ? process.stdout.write(`, ${args[i].slice(2)} is ${args[i + 1]}`) : process.stdout.write(`${args[i].slice(2)} is ${args[i + 1]}`);
  }
};

parseArgs();
