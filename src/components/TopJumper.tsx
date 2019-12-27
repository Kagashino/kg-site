import React, { useEffect, useState } from 'react';
import { createThrottle } from '../assets/helpers';

import './TopJumper.scss';

function TopJumper() {
  const [show, switchShow] = useState(false);
  useEffect(() => {
    const listener = createThrottle(() => {
      // I think you'd better learn this way;
      // 看看老司机是怎么处理这种逻辑的
      const shouldShow = window.scrollY > 300;
      if (shouldShow !== show) {
        switchShow(shouldShow);
      }
    }, 500) as EventListener;
    document.addEventListener('scroll', listener);
    return () => document.removeEventListener('scroll', listener);
  }, [show]);

  return show ? (
    <div className="top-jumper" onClick={() => window.scrollTo(0, 0)}>
      <span className="text"> </span>
    </div>
  ) : null;
}

export default TopJumper;
