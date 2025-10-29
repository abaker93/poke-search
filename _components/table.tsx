import { calcHeightInMeters, calcWeightInKilograms } from "@/_util/calc"
import { findNameByLanguage } from "@/_util/find"
import Image from "next/image"
import { useEffect, useState } from "react"

import Pokedex from 'pokedex-promise-v2'

const P = new Pokedex()

const Table = ({ filteredPokemon }: { filteredPokemon: any[] }) => {
	// console.log(filteredPokemon)

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
	// console.log(p.generation.name)

	const [gen, setGen] = useState('')

	const getGenerationByURL = async (url: string) => {
		try {
			const data = await P.getResource(url);
			setGen(findNameByLanguage(data.names, 'en'));
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		if (gen === '') {
			getGenerationByURL(p.generation.url)
		}
	}, [gen, p.generation.url])

	return (
		<tr className="hover:bg-slate-100">
			<td>
				<div className="flex items-center gap-3">
					<Image
						src={p.sprites.front_default || null}
						alt={p.name}
						width={50}
						height={50}
					/>
					<p className="font-bold">{findNameByLanguage(p.names, 'en')}</p>
				</div>
			</td>
			<td>{p.types.map((t: any) => t.type.name).join(', ')}</td>
			<td>{gen}</td>
			<td>{calcHeightInMeters(p.height)} m</td>
			<td>{calcWeightInKilograms(p.weight)} kg</td>
		</tr>
	)
}

export default Table