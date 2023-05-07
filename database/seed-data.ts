import bcrypt from "bcryptjs";

export interface SeedProduct {
  description: string;
  images: string[];
  slug: string;
  price: number;
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
  };
  author: {
    id: string;
    name: string;
    origin: string;
    birthday: string;
  };
  sold: true;
  startDate: string;
  endDate: string;
}

interface SeedUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "client";
  _id: string;
}

type ValidSizes = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
type ValidTypes = "shirts" | "pants" | "hoodies" | "hats";

interface SeedData {
  users: SeedUser[];
  products: SeedProduct[];
  homeProducts?: SeedProduct[];
}

export const initialData: SeedData = {
  users: [
    {
      name: "Jose Estrada",
      email: "jose@gmail.com",
      password: bcrypt.hashSync("123456"),
      role: "admin",
      _id: "1",
    },
    {
      name: "Jaime Altosano",
      email: "jaimealt@gmail.com",
      password: bcrypt.hashSync("123456"),
      role: "client",
      _id: "1",
    },
  ],
  products: [
    {
      description:
        "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
      images: ["1740176-00-A_0_2000.jpg", "1740176-00-A_1.jpg"],
      price: 75,
      slug: "mens_chill_crew_neck_sweatshirt",
      id: "acd170db-bfed-4382-bb5b-cc95fd145653",
      name: "Tranh tĩnh vật",
      category: {
        id: "acd170db-bfed-4382-bb5b-cc95fd145653",
        name: "Tranh tĩnh vật",
      },
      author: {
        id: "616ee240-8e0d-4e4e-8bcc-bd1cf2927000",
        name: "Van Gogh",
        origin: "Netherlands",
        birthday: "30/5/1853",
      },
      sold: true,
      startDate: "2023-05-06T09:37:53.191930Z",
      endDate: "2023-05-07T06:35:01.233671Z",
    },
    {
        description:
          "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
        images: ["1740176-00-A_0_2000.jpg", "1740176-00-A_1.jpg"],
        price: 75,
        slug: "mens_chill_crew_neck_sweatshirt",
        id: "acd170db-bfed-4382-bb5b-cc95fd145653",
        name: "Tranh tĩnh vật",
        category: {
          id: "acd170db-bfed-4382-bb5b-cc95fd145653",
          name: "Tranh tĩnh vật",
        },
        author: {
          id: "616ee240-8e0d-4e4e-8bcc-bd1cf2927000",
          name: "Van Gogh",
          origin: "Netherlands",
          birthday: "30/5/1853",
        },
        sold: true,
        startDate: "2023-05-06T09:37:53.191930Z",
        endDate: "2023-05-07T06:35:01.233671Z",
      },
      {
        description:
          "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
        images: ["1740176-00-A_0_2000.jpg", "1740176-00-A_1.jpg"],
        price: 75,
        slug: "mens_chill_crew_neck_sweatshirt",
        id: "acd170db-bfed-4382-bb5b-cc95fd145653",
        name: "Tranh tĩnh vật",
        category: {
          id: "acd170db-bfed-4382-bb5b-cc95fd145653",
          name: "Tranh tĩnh vật",
        },
        author: {
          id: "616ee240-8e0d-4e4e-8bcc-bd1cf2927000",
          name: "Van Gogh",
          origin: "Netherlands",
          birthday: "30/5/1853",
        },
        sold: true,
        startDate: "2023-05-06T09:37:53.191930Z",
        endDate: "2023-05-07T06:35:01.233671Z",
      },
      {
        description:
          "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
        images: ["1740176-00-A_0_2000.jpg", "1740176-00-A_1.jpg"],
        price: 75,
        slug: "mens_chill_crew_neck_sweatshirt",
        id: "acd170db-bfed-4382-bb5b-cc95fd145653",
        name: "Tranh tĩnh vật",
        category: {
          id: "acd170db-bfed-4382-bb5b-cc95fd145653",
          name: "Tranh tĩnh vật",
        },
        author: {
          id: "616ee240-8e0d-4e4e-8bcc-bd1cf2927000",
          name: "Van Gogh",
          origin: "Netherlands",
          birthday: "30/5/1853",
        },
        sold: true,
        startDate: "2023-05-06T09:37:53.191930Z",
        endDate: "2023-05-07T06:35:01.233671Z",
      },
      {
        description:
          "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
        images: ["1740176-00-A_0_2000.jpg", "1740176-00-A_1.jpg"],
        price: 75,
        slug: "mens_chill_crew_neck_sweatshirt",
        id: "acd170db-bfed-4382-bb5b-cc95fd145653",
        name: "Tranh tĩnh vật",
        category: {
          id: "acd170db-bfed-4382-bb5b-cc95fd145653",
          name: "Tranh tĩnh vật",
        },
        author: {
          id: "616ee240-8e0d-4e4e-8bcc-bd1cf2927000",
          name: "Van Gogh",
          origin: "Netherlands",
          birthday: "30/5/1853",
        },
        sold: true,
        startDate: "2023-05-06T09:37:53.191930Z",
        endDate: "2023-05-07T06:35:01.233671Z",
      },
  ],
  homeProducts: [
    {
        description:
          "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
        images: ["1740176-00-A_0_2000.jpg", "1740176-00-A_1.jpg"],
        price: 75,
        slug: "mens_chill_crew_neck_sweatshirt",
        id: "acd170db-bfed-4382-bb5b-cc95fd145653",
        name: "Tranh tĩnh vật",
        category: {
          id: "acd170db-bfed-4382-bb5b-cc95fd145653",
          name: "Tranh tĩnh vật",
        },
        author: {
          id: "616ee240-8e0d-4e4e-8bcc-bd1cf2927000",
          name: "Van Gogh",
          origin: "Netherlands",
          birthday: "30/5/1853",
        },
        sold: true,
        startDate: "2023-05-06T09:37:53.191930Z",
        endDate: "2023-05-07T06:35:01.233671Z",
      },{
        description:
          "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
        images: ["1740176-00-A_0_2000.jpg", "1740176-00-A_1.jpg"],
        price: 75,
        slug: "mens_chill_crew_neck_sweatshirt",
        id: "acd170db-bfed-4382-bb5b-cc95fd145653",
        name: "Tranh tĩnh vật",
        category: {
          id: "acd170db-bfed-4382-bb5b-cc95fd145653",
          name: "Tranh tĩnh vật",
        },
        author: {
          id: "616ee240-8e0d-4e4e-8bcc-bd1cf2927000",
          name: "Van Gogh",
          origin: "Netherlands",
          birthday: "30/5/1853",
        },
        sold: true,
        startDate: "2023-05-06T09:37:53.191930Z",
        endDate: "2023-05-07T06:35:01.233671Z",
      },{
        description:
          "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
        images: ["1740176-00-A_0_2000.jpg", "1740176-00-A_1.jpg"],
        price: 75,
        slug: "mens_chill_crew_neck_sweatshirt",
        id: "acd170db-bfed-4382-bb5b-cc95fd145653",
        name: "Tranh tĩnh vật",
        category: {
          id: "acd170db-bfed-4382-bb5b-cc95fd145653",
          name: "Tranh tĩnh vật",
        },
        author: {
          id: "616ee240-8e0d-4e4e-8bcc-bd1cf2927000",
          name: "Van Gogh",
          origin: "Netherlands",
          birthday: "30/5/1853",
        },
        sold: true,
        startDate: "2023-05-06T09:37:53.191930Z",
        endDate: "2023-05-07T06:35:01.233671Z",
      },
  ],
};
