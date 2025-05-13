import { dev } from '@qqi/dev-log';
import { pen } from 'color-pen';
import { _p } from '../index';

const message = pen.brightRed`dev 从我开始`;

dev.beforeEach(() => {
  _p(message);
});

import './file';

import './pkg';

import './runOtherCode';

import './typewrite';

import './read-input';
