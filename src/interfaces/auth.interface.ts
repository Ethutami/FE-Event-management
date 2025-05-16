export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  referral_code: string;
  profile_picture: string;
}

export interface IAuth {
  user: IUser;
  isLogin: boolean;
}
