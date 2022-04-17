export interface Repository<T> {
    clear(): Promise<void>;
    create(payload: T): Promise<T>;
    find(id: string): Promise<T | undefined>;
    list(): Promise<T[]>;
    update(id: string, payload: T): Promise<T | undefined>;
    delete(id: string): Promise<T | undefined>;
}
