export type Paths<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}` | `${K}.${Paths<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;

export type PathValue<
  T,
  P extends string
> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends string
      ? PathValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;
