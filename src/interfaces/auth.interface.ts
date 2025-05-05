interface IUser {
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface IAuth {
  user: IUser;
  isLogin: boolean;
}
