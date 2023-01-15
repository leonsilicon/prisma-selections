/**
	Types inlined from type-fest to avoid "not portable" errors
*/

export type UnionToIntersection<Union> = (
	Union extends unknown ? (distributedUnion: Union) => void : never
) extends (mergedIntersection: infer Intersection) => void
	? Intersection
	: never

export type Promisable<T> = T | PromiseLike<T>
