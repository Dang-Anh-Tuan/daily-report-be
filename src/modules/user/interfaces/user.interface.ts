export interface IUserCreate {
  email: string,
  avatar?: string
  employeeId?: string,
  department?: string,
  refreshToken?: string
}

export interface IUser{
  id: number,
  email: string,
  avatar?: string
  employeeId?: string,
  department?: string,
  refreshToken?: string,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date
}