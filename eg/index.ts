import { runOtherCode } from 'src/run-other-code';
import { pen } from 'color-pen';
import { _p } from 'src/print';
import './file';

import './pkg';
import { dog } from 'src/dog';

const message = pen.brightRed('dev 从我开始');

_p();
_p();
_p(message);
_p();
_p();

const result = await runOtherCode({
  code: 'ps ax | grep ssh',
  printLog: false,
});

dog(result);
