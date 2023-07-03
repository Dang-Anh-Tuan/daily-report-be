import { IsEmail, IsNotEmpty, MaxLength, IsString } from 'class-validator'

export class UserCreateDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(128)
  email: string

  @IsString()
  avatar: string
}
