import { Expose, plainToClass } from 'class-transformer'

export abstract class BaseDto {
  @Expose()
  id: number

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date

  @Expose()
  deletedAt?: Date
  
  static plainToInstance<T>(this: new(...arg: any[]) => T, obj: T) : T {
    return plainToClass(this, obj, {excludeExtraneousValues: true})
  }
}
