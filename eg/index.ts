import { pen } from 'color-pen';

import { _p } from 'src/print';

const message = pen.brightRed('dev 从我开始');

_p();
_p();
_p(message);
_p();
_p();

import './pkg';
