import { stdout } from 'process';

const prefix = 'RSS_';
const variables = [];

const parseEnv = () => {
  for (const [key, value] of Object.entries(process.env)) {
    if (key.startsWith(prefix)) {
      variables.push(`${key}=${value}`);
    }
  }

  console.log(variables.join('; '));
};

parseEnv();
