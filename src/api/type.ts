export type UserType = {
  email: string;
  id: number;
};

export type AuthResponse = {
  accessToken: string;
  user: UserType;
};

export type AuthArgs = {
  password: string;
  email: string;
};

export type MeArgs = {
  userId: string;
  accessToken: string;
};

export type ContactType = {
  id: number;
  userId: number;
  name: string;
  phone: string;
};

export type GetContactsArgs = {
  userId: number;
  accessToken: string;
};

export type AddedContactArgs = Omit<ContactType, 'id'> & {
  accessToken: string;
};

export type UpdateContactArgs = {
  contactId: number;
  accessToken: string;
  name: string;
  phone: string;
};

export type DeleteContactArgs = {
  contactId: number;
  accessToken: string;
};

export type SearchContactArgs = {
  search: string;
  userId: number;
  accessToken: string;
};
