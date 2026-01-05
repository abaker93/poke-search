import { calcHeightInMeters, calcWeightInKilograms } from "@/_util/calc"
import { findGenFullName } from "@/_util/find"
import Image from "next/image"

import Pokedex from 'pokedex-promise-v2'
import Button from "./button"
import { ReactNode, useEffect, useState } from "react"
import { ArrowDown, ArrowUp } from "@/_util/_icons/arrows"
import { TypeChip } from "./chip"

const P = new Pokedex()

const Table = ({ filteredPokemon }: { filteredPokemon: any[] }) => {
	const [sortIndex, setSortIndex] = useState(0)
	const [sortDir, setSortDir] = useState(0)

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

	const sortedPokemon = (a:any, b:any) => {
		switch (sortIndex) {
			case 1:
				if (sortDir === 0) return a.name.localeCompare(b.name)
				else return b.name.localeCompare(a.name)
			case 2:
				if (sortDir === 0) return a.dex - b.dex
				else return b.dex - a.dex
			case 3:
				if (sortDir === 0) return a.generation - b.generation
				else return b.generation - a.generation
			case 4:
				if (sortDir === 0) return a.height - b.height
				else return b.height - a.height
			case 5:
				if (sortDir === 0) return a.weight - b.weight
				else return b.weight - a.weight
			default:
				return a.id - b.id
		}
	}

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
					{filteredPokemon.sort((a,b) => sortedPokemon(a,b)).map((p, i) => (
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
			<td>
				{p.types.map((t: string, i: number) => (
					<TypeChip key={i} type={t} className="not-last:me-1 font-bold" />
				))}
			</td>
			<td>{findGenFullName(p.generation)}</td>
			<td>{calcHeightInMeters(p.height)} m</td>
			<td>{calcWeightInKilograms(p.weight)} kg</td>
		</tr>
	)
}

export default Table