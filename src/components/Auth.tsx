import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container } from "@mui/material";
import authAPI from "../pages/api/auth";
import { ROLE_TYPE_ENUM, User } from "./Type";
import { toast } from "react-toastify";

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
  const adminRoute = ["/admin/product", "/admin/user", "/admin/account"];
  const [myProfile, setMyProfile] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const getProfile = async () => {
    authAPI
      .getMyProfile()
      .then((rs) => {
        setMyProfile(rs);
        setIsLoading(false);
      })
      .catch((rs) => {
        setMyProfile(rs.response?.data?.status);
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

    console.log(router.pathname);

    if (myProfile) {
      if (
        myProfile.role.name !== "admin" &&
        adminRoute.includes(router.pathname)
      ) {
        toast.error("Bạn không có quyền truy cập trang này!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("/");
        return;
      }
      const childrenWithProps = recursiveMap(children, (child) =>
        React.cloneElement(child, { myProfile })
      );
      return <>{childrenWithProps}</>;
    }
    if (isPublic) {
      return <>{children}</>;
    }
  }
};

Auth.defaultProps = {
  children: null,
};

export default Auth;
