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

  async update(condition: object, data: object): Promise<UpdateResult> {
    const c: object = { ...condition, deleteAt: null }
    return this.repository.update(c, data)
  }

  async delete(condition: object): Promise<DeleteResult> {
    const c: object = { ...condition, deleteAt: null }
    return this.repository.delete(c)
  }

  async findOne(condition: object): Promise<T | undefined> {
    const c: object = { ...condition, deleteAt: null }
    return this.repository.findOne({ where: c })
  }

  async getList(condition: object | object[]): Promise<T[]> {
    const c: object = { ...condition, deleteAt: null }
    return this.repository.find({ where: c })
  }
}
