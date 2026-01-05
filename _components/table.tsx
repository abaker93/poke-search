import { calcHeightInMeters, calcWeightInKilograms } from "@/_util/calc"
import { findGenFullName } from "@/_util/find"
import Image from "next/image"


import Button from "./button"
import { ReactNode, useEffect, useState } from "react"
import { ArrowDown, ArrowUp } from "@/_util/_icons/arrows"

import Pokedex from 'pokedex-promise-v2'
import { scorePokemon } from "@/_util/scorePokemon"
import { sortedPokemon } from "@/_util/sort"

const P = new Pokedex()

const Table = ({ filteredPokemon }: { filteredPokemon: any[] }) => {
	const [sortIndex, setSortIndex] = useState(0)
	const [sortDir, setSortDir] = useState(0)

	useEffect(() => {
		if (filteredPokemon.length === 0) return
		else scorePokemon(filteredPokemon)
	}, [filteredPokemon])

	const handleSortIndexChange = (e:any, i:number) => {
		e.preventDefault()
		if (sortIndex === i) {
			if (sortDir === 0) setSortDir(1)
			else {
				setSortIndex(0)
				setSortDir(0)
			}
		}
		else {
			setSortIndex(i)
			setSortDir(0)
		}
	}

	//~ No Pokemon Found
	if (filteredPokemon.length === 0) {
		return (
			<SearchResults sortIndex={sortIndex} sortDir={sortDir} onSort={handleSortIndexChange} disabled>
				No Pokémon found
			</SearchResults>
		)
	}

	return (
		<>
			<SearchResults sortIndex={sortIndex} sortDir={sortDir} onSort={handleSortIndexChange}>
				{filteredPokemon.length} Pokémon found
			</SearchResults>

			<table className="w-full">
				<thead>
					<tr className="*:bg-indigo-700/75 *:text-white *:py-3 *:sticky *:top-[68px] *:backdrop-blur-xs *:border-b-2 *:border-indigo-700">
						<th>Name</th>
						<th>Num</th>
						<th>Type</th>
						<th>Generation</th>
						<th>Height</th>
						<th>Weight</th>
					</tr>
				</thead>
				<tbody>
					{filteredPokemon.sort((a,b) => sortedPokemon({a, b, index: sortIndex, direction: sortDir})).map((p, i) => (
						<TableRow key={i} p={p} />
					))}
				</tbody>
			</table>
		</>
	)
}

const SearchResults = ({
	children,
	disabled=false,
	onSort,
	sortDir,
	sortIndex
}: {
	children: ReactNode | string;
	disabled?: boolean;
	onSort: (e: any, i: number) => void;
	sortDir: any;
	sortIndex: any;
}) => {
	const sortOpt = ['Name', 'Num', 'Gen', 'Height', 'Weight']

	return (
		<div className="flex justify-between bg-slate-100 mb-5 p-5 text-lg font-bold text-indigo-800 sticky top-0">
			<div>
				{children}
			</div>
			<div className="gap-2 flex">
				{sortOpt.map((o,i) => (
					<Button key={i} onClick={e => onSort(e, i+1)} color="muted" size="sm" variant={sortIndex === i+1 ? 'filled' : 'outline'} disabled={disabled}>
					<div className="flex items-center gap-0.5">
						{o}
						<div className={sortIndex === i+1 ? 'visible' : 'hidden'}>
							{sortDir === 0
								? <ArrowDown className="size-3" />
								: <ArrowUp className="size-3" />
							}
						</div>
					</div>
				</Button>
				))}
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
			<td>#{p.dex}</td>
			<td>{p.types.map((t: any) => t).join(', ')}</td>
			<td>{findGenFullName(p.generation)}</td>
			<td>{calcHeightInMeters(p.height)} m</td>
			<td>{calcWeightInKilograms(p.weight)} kg</td>
		</tr>
	)
}

export default Table