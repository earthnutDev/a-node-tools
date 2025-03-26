import { isNumber } from 'a-type-of-js';
import { pen } from 'color-pen';
import { runOtherCode, testNpmPackageExist } from '../dist/mjs/index.mjs';
import { getRandomInt } from 'a-js-tools';

// eslint-disable-next-line no-undef
console.log(process.argv.slice(2));

// process.exit();

await testNpmNameTwoLength('d', 'n');
await testNpmNameThreeLength();
/**
 *
 *
 *
 */
async function testNpmNameTwoLength(startA = 'a', startB = 'a') {
  let i = startA.charCodeAt();
  let j = startB.charCodeAt();
  for (; i < 123; i++) {
    j = i === startA.charCodeAt() ? startB.charCodeAt() : 97;
    for (; j < 123; j++) {
      const npmName = String.fromCharCode(i) + String.fromCharCode(j);
      const delay = getRandomInt(48000, 128000);
      await sleep(delay, npmName);
      const result = await testNpmPackageExist(npmName);
      if (true === result) {
        writeInfo(`${npmName} is exist`);
        continue;
      } else if (isNumber(result)) {
        writeInfo(`${npmName} is error: ${result}`);
        console.log(npmName, result);
        throw new Error('test failed');
      } else if (result === false) {
        writeInfo(`${npmName} is missing`);
      }
    }
  }
}

/**
 *
 *
 *
 */
async function testNpmNameThreeLength(
  startA = 'a',
  startB = 'a',
  startC = 'a',
) {
  let i = startA.charCodeAt();
  let j = startB.charCodeAt();
  let k = startC.charCodeAt();
  for (; i < 123; i++) {
    j = i === startA.charCodeAt() ? startB.charCodeAt() : 97;
    for (; j < 123; j++) {
      k =
        i === startA.charCodeAt() && j === startB.charCodeAt()
          ? startC.charCodeAt()
          : 97;
      for (; k < 123; k++) {
        const npmName =
          String.fromCharCode(i) +
          String.fromCharCode(j) +
          String.fromCharCode(k);
        const delay = getRandomInt(48000, 128000);
        await sleep(delay, npmName);
        const result = await testNpmPackageExist(npmName);
        if (true === result) {
          writeInfo(`${npmName} is exist`);
          console.log(
            ' '.repeat(5).concat(`${pen.bgBrightBlack(npmName)} is exist`),
          );
          continue;
        } else if (isNumber(result)) {
          writeInfo(`${npmName} is error: ${result}`);
          console.log(npmName, result);
          throw new Error('test failed');
        } else if (result === false) {
          writeInfo(`${npmName} is missing`);
        }
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
/**
 *
 *
 *
 */
function writeInfo(info) {
  runOtherCode(`echo "${info}" >> test-npm-name-exist.txt`);
}
