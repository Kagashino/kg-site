import React, {
  useContext, useEffect, useLayoutEffect,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { batchLoadResources } from '../assets/helpers';
import { AppContext } from '../assets/store/context';
import { registerSubApp } from '../assets/store/actions';
import TrustSubApps from '../assets/routes/subApps';


const fireLaunch = (appId: string) => {
  document.dispatchEvent(new Event(`LAUNCH_APP:kg-site-${appId}`));
};

const fireClose = (appId: string) => {
  document.dispatchEvent(new Event(`CLOSE_APP:kg-site-${appId}`));
};

export default function ({ match }: RouteComponentProps<{ id: string }>) {
  const { params: { id: appId } } = match;
  const { Api: { Manifest }, SubApps, dispatch } = useContext(AppContext);
  const SubAppMismatch = !TrustSubApps.find(({ id }) => appId === id);

  useLayoutEffect(() => {
    if (SubApps[appId] || SubAppMismatch) {
      fireLaunch(appId);
    } else {
      Manifest
        .get(appId)
        .then(async (result: any) => {
          const { baseUrl, files } = result;
          if (!files || !files.length) {
            return;
          }
          dispatch(registerSubApp(appId, result));
          await batchLoadResources(files.map((i: string) => `${baseUrl}/${i}`));
          fireLaunch(appId);
        });
    }
    return () => {
    };
  }, [SubApps, Manifest, dispatch, appId, SubAppMismatch]);

  useEffect(() => {
    fireClose(appId);
  }, [appId]);

  if (SubAppMismatch) {
    return (
      <div>404 - Not Found</div>
    );
  }
  return (
    <div id={`kg-site-${appId}`} />
  );
}
