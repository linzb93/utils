export interface AnyObject {
  [key: string]: any;
}

export interface NumberOrStringObject {
  [key: string]: number | string;
}
export interface StringObject {
  [key: string]: string;
}
export type BasicType = string | number | boolean;
