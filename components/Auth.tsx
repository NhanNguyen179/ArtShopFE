import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container } from "@mui/material";
import authAPI from "../pages/api/auth";
import { ROLE_TYPE_ENUM, User } from "./Type";

interface EnrichedChildren {
  myProfile?: User;
  children?: React.ReactNode;
}

function recursiveMap(
  children: React.ReactNode,
  fn: (child: React.ReactElement) => React.ReactElement<EnrichedChildren>
) {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement<EnrichedChildren>(child)) {
      return child;
    }

    let elementChild: React.ReactElement<EnrichedChildren> = child;

    if (child.props.children) {
      elementChild = React.cloneElement(elementChild, {
        children: recursiveMap(child.props.children, fn),
      });
    }

    if (typeof elementChild.type === "string") {
      return elementChild;
    }

    return fn(elementChild);
  });
}

export interface IAuth {
  children?: React.ReactNode;
  isPublic?: boolean;
}

const Auth: React.FunctionComponent<IAuth> = ({
  children,
  isPublic,
}: IAuth) => {
  const [myProfile, setMyProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const getProfile = async () => {
    authAPI
      .getMyProfile()
      .then((rs) => {
        setMyProfile(rs);
        setIsLoading(false);
      })
      .catch((rs) => {
        setMyProfile(rs);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);
  
  const router = useRouter();

  if (!isLoading) {
    if (myProfile && myProfile.status && myProfile.status !== 200) {
      router.push("/auth/login");
      return (
        <Container>
          API error come back later, server likely does not responds
        </Container>
      );
    }

    if (myProfile) {
      if (myProfile?.role?.name.includes(ROLE_TYPE_ENUM.USER)) {
        router.push(`/`);
      } else if (myProfile?.roles?.name.includes(ROLE_TYPE_ENUM.ADMIN)) {
        router.push(`/admin/product`);
      } else if (myProfile?.roles?.name.includes(ROLE_TYPE_ENUM.AUTHOR)) {
        router.push(`/`);
      }
      // Add authUser prop to all child elements.
      const childrenWithProps = recursiveMap(children, (child) =>
        React.cloneElement(child, { myProfile })
      );
      return <>{childrenWithProps}</>;
    }

    return <>This page is authenticated you will be now redirected</>;
  }
};

Auth.defaultProps = {
  children: null,
};

export default Auth;