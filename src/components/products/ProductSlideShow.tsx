import { FC } from "react";
import { Slide } from "react-slideshow-image";

import "react-slideshow-image/dist/styles.css";
import styles from "./ProductSlideShow.module.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
interface Props {
  images: string[];
}
export const ProductSlideShow: FC<Props> = ({ images }) => {
  return (
    <Zoom>
      <img
        alt="That Wanaka Tree, New Zealand by Laura Smetsers"
        src={images[0]}
        width="100%"
        height="100%"
      />
    </Zoom>

    // <Slide
    //   easing="ease"
    //   duration={7000}
    //   indicators
    // >
    //     {
    //       images.map(image=> {
    //         const url = `${image}`;
    //         return (
    //           <div className={styles['each-slide']} key={image}>
    //             <div style={{
    //               backgroundImage: `url(${url})`,
    //               backgroundSize: 'cover'
    //             }}>

    //             </div>
    //           </div>
    //         )
    //       })
    //     }
    // </Slide>
  );
};
