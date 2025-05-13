import { isFunction } from 'a-type-of-js';
import { dataStore } from './dataStore';
import { dog } from '../dog';

/**
 *
 * 键盘按下回调 */
export function pressCallFn(keyValue: string | undefined, key: unknown) {
  /**  当前运行的 action  */
  const currentItem = dataStore[dataStore.list[0]];

  const { callback, resolve } = currentItem;

  dog('当前执行的回调是', {
    ...currentItem,
    rl: '原始值为 readline 的 Interface 对象',
  });
  // 如果当前并非第一个注册的方法先返回等待上一个注册的方法结束先
  /// 这里为了给列表做一个
  if (isFunction(callback)) {
    /**
     *  回调返回的是  true
     *
     *  则说明该方法已经结束，可以申请结束当前的移除监听工作
     */
    if (Reflect.apply(callback, null, [keyValue, key])) {
      dog(
        '回调遇见了想待的键，执行了退出操作，keyValue: < ',
        keyValue,
        '> key：  <',
        key,
        '>',
      );
      dataStore.remove();
      resolve(true);
    }
  } else {
    // 移除监听
    dataStore.remove();
    // 返回值
    resolve(false);
  }
}
