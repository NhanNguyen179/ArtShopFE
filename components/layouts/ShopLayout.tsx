import React, { FC } from "react";
import Head from "next/head";
import { Navbar, SideMenu } from "../ui";
import Auth from "../Auth";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children: React.ReactNode;
  isPublic: boolean;
}
export const ShopLayout: FC<Props> = ({
  title,
  pageDescription,
  imageFullUrl,
  children,
  isPublic
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>
      <Auth isPublic={isPublic}>
        <nav>
          <Navbar />
        </nav>
        <SideMenu />
        <main
          style={{
            margin: "80px auto",
            maxWidth: "1440px",
            padding: "0px 30px",
          }}
        >
          {children}
        </main>
      </Auth>

      <footer>{/* TODO CustomFooter */}</footer>
    </>
  );
};
