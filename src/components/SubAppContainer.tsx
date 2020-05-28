import React, { useContext, useLayoutEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { batchLoadResources } from '../assets/helpers';
import { AppContext } from '../assets/store/context';
import { registerSubApp } from '../assets/store/actions';
import TrustSubApps from '../assets/routes/subApps';


export default function ({ match }: RouteComponentProps<{ id: string }>) {
  const { params: { id: appId } } = match;
  const { Api: { Manifest }, SubApps, dispatch } = useContext(AppContext);
  const SubAppMismatch = !TrustSubApps.find(({ id }) => appId === id);

  useLayoutEffect(() => {
    if (SubApps[appId] || SubAppMismatch) {
      document.dispatchEvent(new Event(`LAUNCH_APP:kg-site-${appId}`));
    } else {
      Manifest.get(appId).then(async (result: any) => {
        const { baseUrl, files } = result;
        if (files && files.length) {
          dispatch(registerSubApp(appId, result));
          await batchLoadResources(files.map((i: string) => `${baseUrl}/${i}`));
          document.dispatchEvent(new Event(`LAUNCH_APP:kg-site-${appId}`));
        }
      });
    }
    return () => {
      document.dispatchEvent(new Event(`CLOSE_APP:kg-site-${appId}`));
    };
  }, [SubApps, Manifest, dispatch, appId, SubAppMismatch]);

  if (SubAppMismatch) {
    return (
      <div>404 - Not Found</div>
    );
  }
  return (
    <div id={`kg-site-${appId}`} />
  );
}
