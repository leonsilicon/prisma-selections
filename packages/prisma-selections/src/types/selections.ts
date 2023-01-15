import type { PrismaClient } from '@prisma/client'
import type { UnionToIntersection } from 'type-fest'

export interface SelectionDefinition<
	_PrismaSelect,
	_SelectionMappings extends Record<`$${string}`, unknown>
> extends Record<`$${string}`, unknown> {}

export type InferSelectionDefinition<
	SelectionDefinitionGetter extends (...args: any) => any
> = Awaited<ReturnType<SelectionDefinitionGetter>>

export type ExpandMapping<SelectionMappings, Options> = {
	[OptionKey in keyof Options]: OptionKey extends keyof SelectionMappings
		? ExpandMapping<SelectionMappings, SelectionMappings[OptionKey]>
		: Record<OptionKey, Options[OptionKey]>
}[keyof Options]

export interface GetPayload<
	Definition extends SelectionDefinition<any, any>,
	Options
> {
	select: Definition extends SelectionDefinition<
		any,
		infer SelectionMappings
	>
		? UnionToIntersection<ExpandMapping<SelectionMappings, Options>>
		: never
}

export type WithOptions<
	Definition extends SelectionDefinition<any, any>,
	Select
> = Definition extends SelectionDefinition<
	any,
	infer SelectionMappings
>
	? Select & {
			[Key in keyof SelectionMappings]?: boolean
	  }
	: never

type Selections<SelectionMappingObject> = keyof {
	[K in keyof SelectionMappingObject as K extends `$${string}`
		? K
		: never]: true
}

export type RecursivelyExpandSelection<
	SelectionMapping,
	SelectionMappingObject
> = Omit<SelectionMappingObject, `$${string}`> &
	(Selections<SelectionMappingObject> extends never
		? // eslint-disable-next-line @typescript-eslint/ban-types
		  {}
		: {
				[K in Selections<SelectionMappingObject>]: K extends keyof SelectionMapping
					? SelectionMapping[K]
					: never
		  }[Selections<SelectionMappingObject>])

export interface SelectionContext {
	prisma: PrismaClient
}
