import React, { useState } from 'react';
import SubApps from '../assets/routes/subApps';
import './styles/Sidebar.scss';


interface UseAppReturnValue {
  subApps: Partial<SubApp>[]
}

const useSubApps = (): UseAppReturnValue => {
  const [subApps] = useState<Partial<SubApp>[]>(SubApps);

  return {
    subApps,
  } as UseAppReturnValue;
};

export default function Sidebar() {
  const { subApps } = useSubApps();

  return (
    <aside className="sidebar">
      <h3>功能</h3>
      <p>I'm maintaining this block 🚧</p>
      {/*{*/}
      {/*  subApps.map(({ name, title }) => (*/}
      {/*    <NavLink key={name} to={`/app/${name}`}>{ title }</NavLink>*/}
      {/*  ))*/}
      {/*}*/}
    </aside>
  );
}
