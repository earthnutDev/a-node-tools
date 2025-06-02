import { RunOtherCodeWaiting, waitingTipsParams } from './types';
import { isBoolean, isNumber, isString, isUndefined } from 'a-type-of-js';

/**  解析参数  */
export function parse(
  params: undefined | waitingTipsParams,
  parsingParameters?: RunOtherCodeWaiting,
): RunOtherCodeWaiting {
  const { show, info, prefix, interval } = parsingParameters ?? {
    show: true,
    info: '请等待',
    prefix: 0,
    interval: 20,
  };
  /**  等待  */
  const waiting = isBoolean(params)
    ? {
        show: params,
        info,
        prefix,
        interval,
      }
    : isString(params)
      ? {
          show,
          info: params,
          prefix,
          interval,
        }
      : isUndefined(params)
        ? {
            show,
            info,
            prefix,
            interval,
          }
        : isNumber(params)
          ? {
              show: true,
              info: '请等待',
              prefix: isNaN(params) ? prefix : Math.min(Math.max(0, params), 2),
              interval,
            }
          : {
              show,
              info,
              prefix,
              interval,
              ...params,
            };
  waiting.interval = isFinite(waiting.interval)
    ? Math.max(20, Math.min(2000, waiting.interval))
    : interval;

  waiting.info = waiting.info.replace(/\n/g, '\\n');

  return waiting;
}
