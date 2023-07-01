import { decodeUser, getUserFromCookie } from "../../utils/helper";
import { getTrackingSession } from "../TrackingSession";

export enum ActionTypeEnum {
  Login,
  VisitProductDetailPage,
  UserAddAuctionPrice,
  ApprovedAuctionProduct,
}

export class BaseEvent {
  Application = "Art Auction";
  Page: string;
  Url: string;
  ActionType: string;
  Action: string;
  SessionId = "";
  LocalTimestamp: Date;
  Outcome?: string | null;
  Feature?: string | null;

  UserId?: string | null;
  UserEmail?: string | null;
  UserClub?: string | null;
  UserType?: string | null;
  UserTeam?: string | null;
  UserOrganisation?: string | null;

  BrowserName?: string | null;
  BrowserVersion?: string | null;
  BrowserLayout?: string | null;
  ClientOS?: string | null;
  ClientDescription?: string | null;
  UserAgent?: string | null;
  SubscriptionPlan?: string | null;

  Attribute1?: any;
  Attribute2?: any;
  Attribute3?: any;
  Attribute4?: any;
  Attribute5?: any;
  Attribute6?: any;
  Attribute7?: any;
  Attribute8?: any;
  Attribute9?: any;
  Attribute10?: any;

  protected HasUser: boolean;

  constructor(actionType: ActionTypeEnum) {
    this.Page = window.location.href;
    this.Url = window.location.href;
    this.Action = "unknown";
    this.LocalTimestamp = new Date();
    const sessionData = getTrackingSession();
    if (sessionData && sessionData.SessionId) {
      this.SessionId = sessionData?.SessionId;
      this.BrowserName = sessionData?.BrowserName;
      this.BrowserVersion = sessionData?.BrowserVersion;
      this.BrowserLayout = sessionData?.LayoutType;
      this.ClientOS = sessionData?.ClientOS;
      this.ClientDescription = sessionData?.ClientDescription;
      this.UserAgent = sessionData?.UserAgent;
    }

    const user: decodeUser | null = getUserFromCookie();

    if (user) {
      this.HasUser = true;
      this.UserId = user.user_id;
      this.UserEmail = user.email;
      this.UserType = user.role;
    } else {
      this.HasUser = false;
    }

    switch (actionType) {
      case ActionTypeEnum.Login:
        this.ActionType = "login_attempt";
        this.Action = `Submit login`;
        this.Feature = `Login`;
        break;
      case ActionTypeEnum.VisitProductDetailPage:
        this.ActionType = "visit_detail_product";
        this.Action = `Click Detail Product`;
        this.Feature = `Visit Detail Product`;
        break;
      case ActionTypeEnum.UserAddAuctionPrice:
        this.ActionType = "add_auction_price";
        this.Action = `Add auction price`;
        this.Feature = `Add Auction Price`;
        break;
      case ActionTypeEnum.ApprovedAuctionProduct:
        this.ActionType = "approved_auction_product";
        this.Action = `Approved Auction Product`;
        this.Feature = `Approved Auction Product`;
        break;

      default:
        this.ActionType = "";
        this.Action = "";
        break;
    }
  }
}

export default BaseEvent;
