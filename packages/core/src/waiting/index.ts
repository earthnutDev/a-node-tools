import { RunOtherCodeWaiting, waitingTipsParams } from './types';
import { WaitingTipsResult } from './waiting-tips-class';

/**
 *
 *
 *  - show 可选属性，是否展示文本。缺省值为 true
 *  - info 可选属性，展示的具体文本。缺省值为 ""
 *  - interval 前缀的两个时间间隔
 * - beforeDestroyed 临销毁前执行
 *  - prefix 可选属性，展示跳动前缀类型。缺省将随机展示（可通过全局的 `waitingTipsPrefixStore` 数组替换为自己想要展示的前缀）
 *    - 0 旋转的省略号前缀 ['···', '⋱', '⋮', '⋰', '···', '⋱', '⋮', '⋰']
 *    - 1 时针旋转的前缀  ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖','🕗','🕘', '🕙','🕚','🕛']
 *    - 2 分针旋转前缀 ['🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧']
 *    - 3 前缀 ['👈','👆','👉','👇','🤘','🤟','🫳','🫴','👊']
 *    - 4 前缀 ['🌞','🌕','🌖','🌗' ,'🌜','🌘','🌑','🌒','🌓','🌛','🌔','🌔','🌔','🌝']
 */
export function waitingTips(params?: waitingTipsParams): WaitingTipsResult {
  const result = new WaitingTipsResult(params);
  return result;
}

export { WaitingTipsResult };

export { waitingTipsPrefixStore } from './waitingTipsPrefixStore';

export type { RunOtherCodeWaiting, waitingTipsParams };
