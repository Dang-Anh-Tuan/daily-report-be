export interface UserGoogle {
  id: string,
  email: string,
  verified_email: boolean,
  picture: string,
  hd: string
}

export interface IJwtPayload {
  userId: number;
  email: string;
}
