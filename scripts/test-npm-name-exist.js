import { isNumber } from 'a-type-of-js';
import { pen } from 'color-pen';
import { runOtherCode, testNpmPackageExist } from '../dist/mjs/index.mjs';
import { getRandomInt } from 'a-js-tools';

for (let i = 97; i < 123; i++) {
  for (let j = 97; j < 123; j++) {
    const npmName = String.fromCharCode(i) + String.fromCharCode(j);
    const delay = getRandomInt(18000, 28000);
    await sleep(delay, npmName);
    const result = await testNpmPackageExist(npmName);
    if (true === result) {
      continue;
    } else if (isNumber(result)) {
      console.log(npmName, result);
      throw new Error('test failed');
    } else if (result === false) {
      runOtherCode(`echo ${npmName} >> test-npm-name-exist.txt`);
    }
  }
}
for (let i = 97; i < 123; i++) {
  for (let j = 97; j < 123; j++) {
    for (let k = 97; k < 123; k++) {
      const npmName =
        String.fromCharCode(i) +
        String.fromCharCode(j) +
        String.fromCharCode(k);
      const delay = getRandomInt(18000, 28000);
      await sleep(delay, npmName);
      const result = await testNpmPackageExist(npmName);
      if (true === result) {
        console.log(
          ' '.repeat(5).concat(`${pen.bgBrightBlack(npmName)} is exist`),
        );
        continue;
      } else if (isNumber(result)) {
        console.log(npmName, result);
        throw new Error('test failed');
      } else if (result === false) {
        runOtherCode(`echo ${npmName} >> test-npm-name-exist.txt`);
      }
    }
  }
}

/**
 *
 * @param ms milliseconds
 * @returns Promise<void>
 *
 */
async function sleep(ms, npmName) {
  return new Promise(resolve =>
    setTimeout(() => {
      console.log(
        new Date().toLocaleString(),
        pen.random.italic(ms),
        pen.bgRandom.bold(npmName),
      );
      resolve();
    }, ms),
  );
}
