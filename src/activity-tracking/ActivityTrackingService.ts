import axios from "axios";
import BaseEvent from "./Types/BaseEvent";
import VisitProductDetailPage from "./Types/VisitProductDetailPage";
import { Product } from "../components/Type";

const ENABLE_ACTIVITY_TRACKING = process.env.ENABLE_ACTIVITY_TRACKING;
const ACTIVITY_TRACKING_URL = process.env.ACTIVITY_TRACKING_URL;
const activityTrackingRoute = "add-tracking-event";

const isActivityTrackingEnabled = (): boolean => {
  return ENABLE_ACTIVITY_TRACKING === "true";
};

const saveActivityEvent = async (event: BaseEvent) => {
  try {
    if (isActivityTrackingEnabled()) {
        console.log("call tracking")
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
        },
        data: event,
      };
      await axios.post(
        `${ACTIVITY_TRACKING_URL}/${activityTrackingRoute}`,
        requestOptions
      );
    }
  } catch (err) {
    return false;
  }
};

export const visitProductDetailPageEvent = async (product: Product) => {

  if (isActivityTrackingEnabled()) {
    const pageLoadEvent = new VisitProductDetailPage(product);
    await saveActivityEvent(pageLoadEvent);
  }
};
