type NotKeyOf<T, K extends PropertyKey> = K extends keyof T ? never : K;

type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false;

type ExactKeys<T, K extends readonly PropertyKey[]> =
  Equal<keyof T, K[number]> extends true ? K : never;

type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

type IsAny<T> = 0 extends 1 & T ? true : false;

type ExactRequiredKeys<T, K extends readonly PropertyKey[]> =
  Equal<RequiredKeys<T>, K[number]> extends true ? K : never;

type ExactOptionalKeys<T, K extends readonly PropertyKey[]> =
  Equal<OptionalKeys<T>, K[number]> extends true ? K : never;

interface Thisval {
  is: {
    /** Is of type `T` */
    type: <T>(value: T) => void;
    /** Is of type `T` or `undefined` */
    maybe: <T>(value: T | undefined) => void;
    /** Items of list are of type `T` */
    array: <T>(value: T[]) => void;
    /** Values of `Record` are of type `T` */
    record: <T>(value: Record<any, T>) => void;
    /** Values of `Set` are of type `T` */
    set: <T>(value: Set<T>) => void;
    /** Values of `Map` are of type `T` */
    map: <T>(value: Map<any, T>) => void;
    /** Value of `Promise` is of type `T` */
    promise: <T>(value: Promise<T>) => void;
    /** Is not `any` */
    notAny: <T>(value: IsAny<T> extends true ? never : T) => void;
    /** Is not `undefined` or `null` */
    required: <T>(value: undefined extends T ? never : NonNullable<T>) => void;
    /** Can be `undefined` */
    optional: <T>(value: undefined extends T ? T : never) => void;
    /** Can be `null` */
    nullable: <T>(value: null extends T ? T : never) => void;
  };

  are: {
    /** Are of type `T` */
    type: <T>(...values: T[]) => void;
    /** Are of type `T` or `undefined` */
    maybe: <T>(...values: (T | undefined)[]) => void;
  };

  fn: {
    /** Function returns type `T` */
    returns: <T>(value: (...args: any[]) => T | Promise<T>) => void;
  };

  has: {
    /** Key exists in value */
    key: <T, N extends NonNullable<T>, K extends keyof N>(
      value: T,
      key: K,
    ) => void;
    /** Key exists in value and is required */
    requiredKey: <T, N extends NonNullable<T>, const K extends RequiredKeys<N>>(
      value: T,
      key: K,
    ) => void;
    /** Key exists in value and is optional */
    optionalKey: <T, N extends NonNullable<T>, const K extends OptionalKeys<N>>(
      value: T,
      key: K,
    ) => void;

    /** Key does not exist in value */
    notKey: <T, N extends NonNullable<T>, K extends PropertyKey>(
      value: T,
      key: NotKeyOf<N, K>,
    ) => void;
    /** Keys do not exist in value */
    notKeys: <
      T,
      N extends NonNullable<T>,
      const K extends readonly PropertyKey[],
    >(
      value: T,
      ...keys: { [P in keyof K]: NotKeyOf<N, K[P]> }
    ) => void;

    /** Keys exists in value */
    keys: <T, N extends NonNullable<T>, const K extends readonly (keyof N)[]>(
      value: T,
      ...keys: K
    ) => void;
    /** Keys exists in value and are required */
    requiredKeys: <
      T,
      N extends NonNullable<T>,
      const K extends readonly RequiredKeys<N>[],
    >(
      value: T,
      ...keys: K
    ) => void;
    /** Keys exists in value and are optional */
    optionalKeys: <
      T,
      N extends NonNullable<T>,
      const K extends readonly OptionalKeys<N>[],
    >(
      value: T,
      ...keys: K
    ) => void;

    /** Only these keys exists in value */
    exactKeys: <
      T,
      N extends NonNullable<T>,
      const K extends readonly (keyof N)[],
    >(
      value: T,
      ...keys: ExactKeys<N, K>
    ) => void;
    /** Only these required keys exists in value */
    exactRequiredKeys: <
      T,
      N extends NonNullable<T>,
      const K extends readonly RequiredKeys<N>[],
    >(
      value: T,
      ...keys: ExactRequiredKeys<N, K>
    ) => void;
    /** Only these optional keys exists in value */
    exactOptionalKeys: <
      T,
      N extends NonNullable<T>,
      const K extends readonly OptionalKeys<N>[],
    >(
      value: T,
      ...keys: ExactOptionalKeys<N, K>
    ) => void;
  };
}

export default {} as Thisval;
