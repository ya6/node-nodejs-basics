const parseEnv = () => {
  const args = process.argv.slice(2);
  let count = 0;
  args.forEach((el) => {
      count ? process.stdout.write("; RSS_" + el) : process.stdout.write("RSS_" + el);
      count += 1;
    
  });
};

parseEnv();
