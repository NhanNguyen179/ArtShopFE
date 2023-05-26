import { FC } from "react";
import { UserAuctionProduct } from "../Type";
import styles from "./Ticket.module.scss";

interface Props {
  auctionItem: UserAuctionProduct;
}

export const Ticket: FC<Props> = ({ auctionItem }) => {
  return (
    <div className={styles["ticketContainer"]}>
      <div className={styles["ticket"]}>
        <div className={styles["ticketTitle"]}>{auctionItem.auction_price}$</div>
        <div className={styles["ticketDetail"]}>
          <div>Mr.{auctionItem.user.email}</div>
        </div>
        <div className={styles["ticketRip"]}>
          <div className={styles["circleLeft"]}></div>
          <div className={styles["ripLine"]}></div>
          <div className={styles["circleRight"]}></div>
        </div>
        <div className={styles["ticketSubDetail"]}>
          <div className={styles["code"]}>{auctionItem.is_success}</div>
          <div className={styles["date"]}>
            {" "}
            {auctionItem.create_at}
          </div>
        </div>
      </div>
      <div className={styles["ticketShadow"]}></div>
    </div>
  );
};
