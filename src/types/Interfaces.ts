export interface IEmail {
  email: string;
  setEmail: (email: string) => void;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  otp: string;
}
