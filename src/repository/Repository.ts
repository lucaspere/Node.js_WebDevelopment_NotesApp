export interface Repository<T> {
    create(payload: T): T;
    find(id: string): T | undefined;
    list(): T[];
    update(id: string, payload: T): T | undefined;
    delete(id: string): T | undefined;
}
