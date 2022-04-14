export interface Repository<T> {
    create(payload: T): void;
    find(id: string): T | undefined;
    list(): T[];
    update(id: string, payload: T): void;
    delete(id: string): void;
}
