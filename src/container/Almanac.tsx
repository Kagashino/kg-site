import React from 'react';
import { useAlmanac } from './Almanac.hook'
import { AlmanacResult } from "../types";

export default function Almanac () {
  const res: AlmanacResult = useAlmanac();
  console.log(res)
  return (
    <>
      <h3>程序员老黄历</h3>
      <section>
        <h2>{res.todayStr}</h2>
        <table>
          <tbody>
          <tr>
            <td><h2>宜</h2></td>
            <td>
              {
                res.good.map((item, index)=>(
                  <div key={index}>
                    <h3>{item.name}</h3>
                    <p>{item.good}</p>
                  </div>
                ))
              }
            </td>
          </tr>
          <tr>
            <td><h2>忌</h2></td>
            <td>
              {
                res.bad.map((item, index)=>(
                  <div key={index}>
                    <h3>{item.name}</h3>
                    <p>{item.bad}</p>
                  </div>
                ))
              }
            </td>
          </tr>
          </tbody>
        </table>
        <div className="">
          <h4>坐位朝向</h4>
          <span>{ res.direction }</span>
          <h4>今日宜饮</h4>
          <span>{ res.drink.join('，') }</span>
          <h4>女神亲近指数：</h4>
          <span className="mekami">{ res.rate }</span>
        </div>
        <footer>
          本老黄历保留了日期种子计算方法，可通过自定义配置，生成任意类型的老黄历
        </footer>
      </section>
    </>
  )
}
