export interface Handler<T> {
    handle(objectToHandle: T): void;
}