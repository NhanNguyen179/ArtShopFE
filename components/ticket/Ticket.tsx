// interface Props {
//   products: SeedProduct[];
// }
import styles from "./Ticket.module.scss";

export const Ticket = ({}) => {
  return (
    <div className={styles["ticketContainer"]}>
      <div className={styles["ticket"]}>
        <div className={styles["ticketTitle"]}>1000$</div>
        <div className={styles["ticketDetail"]}>
          <div>Mr.Nguyễn Văn Nhân</div>
        </div>
        <div className={styles["ticketRip"]}>
          <div className={styles["circleLeft"]}></div>
          <div className={styles["ripLine"]}></div>
          <div className={styles["circleRight"]}></div>
        </div>
        <div className={styles["ticketSubDetail"]}>
          <div className={styles["code"]}>LO-2314XXX</div>
          <div className={styles["date"]}>
            {" "}
            Jan 14<sup>th</sup> 2023
          </div>
        </div>
      </div>
      <div className={styles["ticketShadow"]}></div>
    </div>
  );
};
