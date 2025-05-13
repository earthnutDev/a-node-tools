import { dog } from './../dog';
import { DataStore } from './types';
/**  子线程启动回调，好像没啥用一样  */
export function spawnCn(dataStore: DataStore) {
  const { result } = dataStore;
  dog('子线程已启动，运行良好');
  result.success = true;
  result.status = 1;
}
