export const sortedPokemon = ({a, b, index=0, direction=0}: {a:any, b:any, index?:Number, direction?:Number}) => {
	switch (index) {
		case 1:
			if (direction === 0) return a.name.localeCompare(b.name)
			else return b.name.localeCompare(a.name)
		case 2:
			if (direction === 0) return a.dex - b.dex
			else return b.dex - a.dex
		case 3:
			if (direction === 0) return a.generation - b.generation
			else return b.generation - a.generation
		case 4:
			if (direction === 0) return a.height - b.height
			else return b.height - a.height
		case 5:
			if (direction === 0) return a.weight - b.weight
			else return b.weight - a.weight
		default:
			return a.id - b.id
	}
}