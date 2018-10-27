import { Type } from "../utils/type";

export interface Application<T> {
    port: number;
    entryModule: Type<T>;
}
