import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import './styles/Sidebar.scss';
import Loading from '../components/Loading';
import { AppContext } from '../assets/store/context';

interface UseAppReturnValue {
  loading: boolean,
  subApps: Partial<SubApp>[]
}

const useSubApps = (): UseAppReturnValue => {
  const { Api } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [subApps, setSubApps] = useState<Partial<SubApp>[]>([]);

  useEffect(() => {
    if (!subApps.length) {
      Api.Manifest.list().then((res: any[]) => {
        setSubApps(res);
        setLoading(false);
      });
    }
  }, [Api, loading, subApps, subApps.length]);

  return {
    loading,
    subApps,
  } as UseAppReturnValue;
};

export default function Sidebar() {
  const { loading, subApps } = useSubApps();

  return (
    <aside className="sidebar">
      <h3>功能</h3>
      {
        loading
          ? <Loading />
          : subApps.map(({ name, title }) => (
            <NavLink key={name} to={`/app/${name}`}>{ title }</NavLink>
          ))
      }
    </aside>
  );
}
