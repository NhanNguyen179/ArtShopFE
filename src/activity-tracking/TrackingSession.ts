import {
  browserName,
  browserVersion,
  osName,
  osVersion,
} from 'react-device-detect';
import { v4 as uuidv4 } from 'uuid';

const uniqueId = uuidv4();
const layoutType: string =
  (browserName === ('Chrome' || 'Safari') && 'WebKit') ||
  (browserName === 'Internet Explorer' && 'Trident') ||
  (browserName === 'Firefox' && 'Gecko') ||
  '';

const ActivityTrackingSessionKey = 'acttrksession';

export interface ActivityTrackingSession {
  SessionId: string;
  BrowserName: string;
  BrowserVersion: string;
  LayoutType: string;
  ClientOS: string;
  ClientDescription: string;
  UserAgent: string;
}

export const getTrackingSession = () => {
  const sessionDataString = sessionStorage.getItem(ActivityTrackingSessionKey);
  if (sessionDataString) {
    const sessionData: ActivityTrackingSession = JSON.parse(sessionDataString);
    if (!sessionData || !sessionData.SessionId) {
      throw new Error('no sessionId');
    }
    return sessionData;
  } else {
    null;
  }
};

export const createTrackingSession = () => {
  if (window) {
    const agent = navigator.product;
    const browserDetails: ActivityTrackingSession = {
      SessionId: uniqueId,
      BrowserName: browserName,
      BrowserVersion: browserVersion,
      LayoutType: layoutType,
      ClientOS: osName + ' ' + osVersion,
      ClientDescription: `${browserName} ${browserVersion} on ${navigator.product} ${osName} ${osVersion}`,
      UserAgent: navigator.userAgent,
    };

    sessionStorage.setItem(
      ActivityTrackingSessionKey,
      JSON.stringify(browserDetails),
    );
  }
};
