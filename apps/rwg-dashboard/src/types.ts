export type Environment = 'production' | 'preview' | 'development' | 'test';

export type GetArrayElementType<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
