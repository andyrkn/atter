import { Type } from "../utils/type";

export interface Application<T> {
    entryModule: Type<T>;
}