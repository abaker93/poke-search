import { calcHeightInMeters, calcWeightInKilograms } from "@/_util/calc"
import { findGenFullName, findNameByLanguage } from "@/_util/find"
import Image from "next/image"
import { useEffect, useState } from "react"

import Pokedex from 'pokedex-promise-v2'

const P = new Pokedex()

const Table = ({ filteredPokemon }: { filteredPokemon: any[] }) => {
	// console.log('filteredPokemon')

	if (filteredPokemon.length === 0) {
		return (
			<div className="bg-slate-100 mb-5 p-5 text-lg font-bold text-indigo-800">
				No Pokémon found
			</div>
		)
	}

	return (
		<>
			<div className="bg-slate-100 mb-5 p-5 text-lg font-bold text-indigo-800">
				{filteredPokemon.length} Pokémon found
			</div>

			<table className="w-full text-center">
				<thead>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Generation</th>
						<th>Height</th>
						<th>Weight</th>
					</tr>
				</thead>
				<tbody>
					{filteredPokemon.map((p, i) => (
						<TableRow key={i} p={p} />
					))}
				</tbody>
			</table>
		</>
	)
}

const TableRow = ({ p }: { p: any }) => {
	// console.log(p)

	// const [gen, setGen] = useState('')

	// const getGenerationByURL = async (url: string) => {
	// 	try {
	// 		const data = await P.getResource(url);
	// 		return findNameByLanguage(data.names, 'en')
	// 	} catch (e) {
	// 		console.error(e)
	// 	}
	// }

	// useEffect(() => {
	// 	const fetchGen = async () => {
	// 		const genName = await getGenerationByURL(p.generation.url)
	// 		setGen(genName)
	// 	}
	// 	fetchGen()
	// }, [p.generation.url])

	return (
		<tr className="hover:bg-slate-100">
			<td>
				<div className="flex items-center gap-3">
					{p.sprite ? (
						<Image
							src={p.sprite}
							alt={p.name}
							width={50}
							height={50}
							className="w-14 h-auto"
						/>
					) : (
						<div className="w-14 h-14"></div>
					)}
					<p className="font-bold">{p.name}</p>
				</div>
			</td>
			<td>{p.types.map((t: any) => t).join(', ')}</td>
			<td>{findGenFullName(p.generation)}</td>
			<td>{calcHeightInMeters(p.height)} m</td>
			<td>{calcWeightInKilograms(p.weight)} kg</td>
		</tr>
	)
}

export default Table