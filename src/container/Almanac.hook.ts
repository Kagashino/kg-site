import {useEffect, useState} from "react";

import { getAlmanacSet } from "../assets/api";
import { generateAlmanac } from "../assets/helpers/Almanac";
import { AlmanacResult, AlmanacSet} from "../types";

export const useAlmanac = ()=>{
  const [result, setResult] = useState<AlmanacResult>({
    bad: [],
    direction: '',
    drink: [],
    good: [],
    rate: '',
    todayStr: '',
  })
  useEffect(()=>{
    getAlmanacSet().then(res=>{
      const Assets: AlmanacSet = res.default;
      const Almanac = generateAlmanac(Assets, new Date())
      setResult(Almanac);
    })
  }, [])
  return result;
}
