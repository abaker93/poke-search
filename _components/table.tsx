import { calcHeightInMeters, calcWeightInKilograms } from "@/_util/calc"
import { findGenFullName } from "@/_util/find"
import Image from "next/image"

import Pokedex from 'pokedex-promise-v2'
import Button from "./button"
import { ReactNode, useState } from "react"
import { ArrowDown, ArrowUp } from "@/_util/_icons/arrows"

const P = new Pokedex()

const Table = ({ filteredPokemon }: { filteredPokemon: any[] }) => {
	const [sortIndex, setSortIndex] = useState(1)

	if (filteredPokemon.length === 0) {
		return (
			<SearchResults>
				No Pokémon found
			</SearchResults>
		)
	}

	return (
		<>
			<SearchResults>
				{filteredPokemon.length} Pokémon found
			</SearchResults>

			<table className="w-full">
				<thead>
					<tr className="*:bg-indigo-700/75 *:text-white *:py-3 *:sticky *:top-[68px] *:backdrop-blur-xs *:border-b-2 *:border-indigo-700">
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

const SearchResults = ({ children }: { children: ReactNode | string }) => {
	return (
		<div className="flex justify-between bg-slate-100 mb-5 p-5 text-lg font-bold text-indigo-800 sticky top-0">
			<div>
				{children}
			</div>
			<div className="gap-2 flex">
				<Button color="muted" size="sm" variant="outline">
					<div className="flex items-center gap-0.5">
						Name
						<ArrowDown className="size-3" />
					</div>
				</Button>
				<Button color="muted" size="sm" variant="outline">
					<div className="flex items-center gap-0.5">
						Num
						<ArrowDown className="size-3" />
					</div>
				</Button>
				{/* <Button color="muted" size="sm" variant="outline">
					<div className="flex items-center gap-0.5">
						Type
						<ArrowDown className="size-3" />
					</div>
				</Button> */}
				<Button color="muted" size="sm" variant="outline">
					<div className="flex items-center gap-0.5">
						Gen
						<ArrowDown className="size-3" /></div>
				</Button>
				<Button color="muted" size="sm" variant="outline">
					<div className="flex items-center gap-0.5">
						Height
						<ArrowDown className="size-3" /></div>
				</Button>
				<Button color="muted" size="sm" variant="outline">
					<div className="flex items-center gap-0.5">
						Weight
						<ArrowDown className="size-3" /></div>
				</Button>
			</div>
		</div>
	)
}

const TableRow = ({ p }: { p: any }) => {
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