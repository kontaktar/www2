import { UserData } from "types";

export const editHowDataIsDisplayed = (users: UserData[]): UserData[] => {
  if (!users) return [];
  const allUsers = [...users];

  return allUsers.map(
    ({
      // website,
      // postalCode,
      // streetName,
      // city,
      // country,
      ...keepAttributes
    }) => keepAttributes
  );
};

export const tableColumns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Notendanafn",
    accessor: "userName",
  },
  {
    Header: "Fornafn",
    accessor: "firstName",
  },
  {
    Header: "Eftirnafn",
    accessor: "lastName",
  },
  {
    Header: "Email",
    accessor: "email",
  },

  {
    Header: "Símanúmer",
    accessor: "phoneNumber",
  },
  {
    Header: "Kennitala",
    accessor: "ssn",
  },
  {
    Header: "createdAt",
    accessor: "createdAt",
  },
  {
    Header: "lastLogin",
    accessor: "lastLogin",
  },
  {
    Header: "Vefsíða",
    accessor: "website",
  },
  {
    Header: "Póstnúmer",
    accessor: "postalCode",
  },
  {
    Header: "Gata",
    accessor: "streetName",
  },
  {
    Header: "Borg",
    accessor: "city",
  },
  {
    Header: "Land",
    accessor: "country",
  },
];
