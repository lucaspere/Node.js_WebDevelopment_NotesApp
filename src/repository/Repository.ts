export abstract class Repository<T> {
    abstract create(payload: T): void
    abstract find(id: string): T
    abstract list(): T[]
    abstract update(id: string, payload: T): void
    abstract delete(id: string): void
}