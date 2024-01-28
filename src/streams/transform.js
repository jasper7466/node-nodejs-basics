import { EOL } from 'os';
import { stdin, stdout } from 'process';
import { Transform } from 'stream';
import streamPromises from 'stream/promises';

/**
 * Reverses input chunks.
 */
class ReverseTransform extends Transform {
  async _transform(chunk, encoding, next) {
    return next(
      null,
      chunk
        .toString()
        .split('')
        .filter((value) => value !== EOL)
        .reverse()
        .join('') + EOL,
    );
  }
}

const transform = async () => {
  const reverse = new ReverseTransform();

  return streamPromises.pipeline(stdin, reverse, stdout);
};

await transform();
