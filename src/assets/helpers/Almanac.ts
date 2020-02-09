import { AlmanacActivity, AlmanacResult, AlmanacSet } from '../../types';

/**
 * 以11117这个质数为模生成随机种子
 * @param today
 * @param indexSeed
 */
export const random = (today: Date, indexSeed: number): number => {
  const MOD = 11117;
  const daySeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const offset = 100;
  let n = daySeed % MOD;
  for (let i = 0; i < offset + indexSeed; i++) {
    n = n * n % MOD;
  }
  return n;
}

/**
 * 获取日期文字
 * @param today
 * @param weeks
 */
export const getTodayStr = (today: Date, weeks: string[]): string => {
  const d = new Date(today);
  return `今天是${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 星期${weeks[d.getDay()]}`
}

/**
 * 判断是否为周末
 * @param today 当天时间
 */
export const isWeekend = (today: Date): boolean => today.getDay() % 6 === 0;

/**
 * 根据日期挑拣数组中的随机元素
 * @param today 当天日期
 * @param list 数据源
 * @param size 挑拣数量
 */
export const pickRandomItems = (today: Date, list: any[], size: number) => {
  const picked = list.slice();
  for (let i = 0; i < list.length - size; i++) {
    const index = random(today, i) % picked.length;
    picked.splice(index, 1);
  }
  return picked;
}

/**
 * 生成评分星星
 * @param num 评分数
 * @param max 满分
 */
export function rate (num: number, max: number = 5): string {
  let stars = '';
  for (let i = 0; i < max; i++) {
    stars += i < num ? '★' : '☆'
  }
  return stars;
}

/**
 * 解析占位符
 * @param str { string }: 带有%v(变量名)、%t(编程工具)、%l(代码行数)的文字
 * @param Assets
 * @param date
 */
export const fillRandom = (str: string, Assets: AlmanacSet, date: Date): string => {
  const { Tools, Variables } = Assets;
  const VariableSeed = random(date, 12) % Variables.length;
  const toolSeed = random(date, 11) % Tools.length;
  const lineSeed = random(date, 12) % 247 + 30
  return str.replace(/(%v|%t|%l)/, (result: string): string => {
    switch (result) {
      case '%v': return Variables[VariableSeed];
      case '%t': return Tools[toolSeed];
      case '%l': return `${lineSeed}`;
      default: return result;
    }
  })
};

/**
 * 生成今日时间
 * @param Assets 配置JSON
 * @param date 日期，默认当天
 */
export const generateAlmanac = (Assets: AlmanacSet, date: Date | string | number): AlmanacResult => {
  const { Activities, Directions, Drinks, Variables, Tools } = Assets;
  const today = new Date(date);
  const weekend = isWeekend(today);
  const filteredActivities = Activities.filter((i: AlmanacActivity) => !weekend || i.weekend);
  const goodCount = random(today, 98) % 3 + 2;
  const badCount = random(today, 87) % 3 + 2;
  const directionSeed = random(today, 2) % Directions.length;
  const rateSeed = random(today, 6) % 5 + 1;
  const events = pickRandomItems(today, filteredActivities, goodCount + badCount);
  events.forEach(e => {
    e.name = fillRandom(e.name, Assets, today)
  });
  return {
    todayStr: getTodayStr(today, Assets.Weeks),
    good: events.slice(0, goodCount),
    bad: events.slice(goodCount, goodCount + badCount),
    direction: Directions[directionSeed],
    drink: pickRandomItems(today, Drinks ,2),
    rate: rate(rateSeed)
  }
};
