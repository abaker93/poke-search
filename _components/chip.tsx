import { findBGByType } from "@/_util/find"

const TypeChip = ({className, type}: {className?: string, type:string}) => {
	return (
		<span className={`${findBGByType(type)} text-white px-2 py-0.5 rounded-4xl text-xs ${className}`}>
			{type.charAt(0).toUpperCase() + type.slice(1)}
		</span>
	)
}

export { TypeChip }