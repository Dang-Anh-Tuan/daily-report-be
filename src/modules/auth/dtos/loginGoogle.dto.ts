import { BaseDto } from '@share/utils/base.dto'
import { Expose } from 'class-transformer'
import { IsString, IsNotEmpty } from 'class-validator'
export class LoginGoogleDto {
  @IsString()
  @IsNotEmpty()
  token: string
}

export class UserRespDto extends BaseDto {
  @Expose()
  email: string

  @Expose()
  avatar?: string

  @Expose()
  employeeId?: string

  @Expose()
  department?: string
}

export class LoginResponseDto {
  accessToken: string
  refreshToken?: string
}
