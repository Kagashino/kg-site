import {init} from "programmer-almanac-generator";

export const useAlmanac = (): AlmanacResult => {
  return init(new Date());
}
