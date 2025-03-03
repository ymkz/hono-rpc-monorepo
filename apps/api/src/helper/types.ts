/**
 * Branded Typesを作成するためのユーティリティ型
 * TypeScriptではStructural Typingが採用されているため、ブランドを付与することで一意な型を作成する
 */
export type Branded<T, Brand> = T & { readonly _brand: Brand };
