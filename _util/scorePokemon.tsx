import { useEffect, useState } from "react"
import { sortedPokemon } from "./sort"

export const scorePokemon = (filteredPokemon: any[]) => {
	const sortHeight = filteredPokemon.sort((a:any,b:any) => sortedPokemon({a,b,index:4,direction:0}))
	const half = Math.floor(sortHeight.length / 2)
	const medHeight = sortHeight.length % 2 ? sortHeight[half].height : sortHeight[half-1].height

	console.log(medHeight)
}