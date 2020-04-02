declare type AlmanacResult = {
  todayStr: string
  good: Array<{ name: string, good: string, bad: string, weekend?: boolean }>
  bad: Array<{ name: string, good: string, bad: string, weekend?: boolean }>
  direction: string
  drink: string[]
  rate: string
}

declare module 'programmer-almanac-generator';
