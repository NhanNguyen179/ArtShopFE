export enum ROLE_TYPE_ENUM {
  ADMIN = "admin",
  USER = "user",
  AUTHOR = "author",
}

export type User = {
  id: string;
  email: string;
  phone_number: null;
  role: {
    id: string;
    name: string;
  };
};
