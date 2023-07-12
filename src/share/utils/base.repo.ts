import {
  BaseEntity,
  DeepPartial,
  DeleteResult,
  Repository,
  UpdateResult
} from 'typeorm'

export default class BaseRepo<T extends BaseEntity> {
  protected readonly repository: Repository<T>

  constructor(protected repo: Repository<T>) {
    this.repository = repo
  }

  async create(data: DeepPartial<T>): Promise<T> {
    return this.repository.save(data)
  }

  async createMany(data: DeepPartial<T>[]): Promise<T[]> {
    return this.repository.save(data)
  }

  async update(condition: object, data: object): Promise<UpdateResult> {
    const c: object = { deletedAt: null, ...condition }
    return this.repository.update(c, data)
  }

  async delete(condition: object): Promise<DeleteResult> {
    const c: object = { ...condition }
    return this.repository.delete(c)
  }

  async findOne(
    condition: object,
    withDeleted: boolean = false
  ): Promise<T | undefined> {
    const c: object = { deletedAt: null, ...condition }
    return this.repository.findOne({ where: c, withDeleted: withDeleted })
  }

  async getList(
    condition: object | object[],
    withDeleted: boolean = false
  ): Promise<T[]> {
    const c: object = { deletedAt: null, ...condition }
    return this.repository.find({ where: c, withDeleted: withDeleted })
  }
}
