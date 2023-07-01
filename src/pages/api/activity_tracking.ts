import axiosTracking from "./axiostracking";

const activityTrackingAPI = {
  async getPopularProduct() {
    return await axiosTracking.get("get-popular-product");
  }, 
  async getPopularCategory() {
    return await axiosTracking.get("get-popular-category");
  },
  async getAmountUserAddAuctionProduct() {
    return await axiosTracking.get("get-amount-user-add-auction-product");
  },
  async getRecentAddAuctionPrice() {
    return await axiosTracking.get("get-recent-add-auction-price");
  },
  async getAmountSessionId() {
    return await axiosTracking.get("get-amount-session-id");
  },
  async getPopularBrowser() {
    return await axiosTracking.get("get-popular-browser");
  },
  async getTotalUserAddAuctionPrice() {
    return await axiosTracking.get("get-total-user-add-auction-price");
  },
  async getTotalApprovedAuction() {
    return await axiosTracking.get("get-total-approved-auction");
  },
};

export default activityTrackingAPI;
