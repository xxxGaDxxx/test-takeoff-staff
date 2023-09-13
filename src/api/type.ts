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
