const parseArgs = () => {
  const argv = process.argv.slice(2);
  const parsedArgv = [];

  for (let i = 0; i < argv.length - 1; i += 2) {
    parsedArgv.push(`${argv[i].slice(2)} is ${argv[i + 1]}`);
  }

  console.log(parsedArgv.join(', '));
};

parseArgs();
