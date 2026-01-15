import { isBoolean, isNumber, isString, isUndefined } from 'a-type-of-js';
import { RunOtherCodeWaiting, waitingTipsParams } from './types';

/**
 * 解析参数
 *
 * @param params  原始参数
 * @param parsingParameters  配置初始的参数，多用于一个已经 destroyed 的 waiting 又执行了 run
 */
export function parse(
  params: undefined | waitingTipsParams,
  parsingParameters?: RunOtherCodeWaiting,
): RunOtherCodeWaiting {
  const {
    show,
    info,
    prefix,
    interval,
    canCtrlCExit,
    canCtrlDExit,
    beforeDestroyed,
  } = parsingParameters ?? {
    show: true,
    info: '请等待',
    prefix: 0,
    interval: 20,
    canCtrlCExit: false,
    canCtrlDExit: false,
    beforeDestroyed: () => undefined,
  };
  /**  等待  */
  const waiting = isBoolean(params)
    ? {
        show: params,
        info,
        prefix,
        interval,
        canCtrlCExit,
        canCtrlDExit,
        beforeDestroyed,
      }
    : isString(params)
      ? {
          show,
          info: params,
          prefix,
          interval,
          canCtrlCExit,
          canCtrlDExit,
          beforeDestroyed,
        }
      : isUndefined(params)
        ? {
            show,
            info,
            prefix,
            interval,
            canCtrlCExit,
            canCtrlDExit,
            beforeDestroyed,
          }
        : isNumber(params)
          ? {
              show: true,
              info: '请等待',
              prefix: isNaN(params) ? prefix : Math.min(Math.max(0, params), 2),
              interval,
              canCtrlCExit,
              canCtrlDExit,
              beforeDestroyed,
            }
          : {
              show,
              info,
              prefix,
              interval,
              canCtrlCExit,
              canCtrlDExit,
              beforeDestroyed,
              ...params,
            };
  waiting.interval = isFinite(waiting.interval)
    ? Math.max(20, Math.min(2000, waiting.interval))
    : interval;

  waiting.info = waiting.info.replace(/\n/g, '\\n');

  return waiting;
}
