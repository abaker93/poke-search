'use client'

import InputCheck from '@/_components/_form/inputCheck'
import InputNumber from '@/_components/_form/inputNumber'
import InputText from '@/_components/_form/inputText'
import Label from '@/_components/_form/label'
import Select from '@/_components/_form/select'
import Button from '@/_components/button'
import Table from '@/_components/table'
import { findGenByVerGroup, findNameByLanguage } from '@/_util/find'
import Pokedex from 'pokedex-promise-v2'
import { useEffect, useState } from 'react'

const P = new Pokedex()

export default function Home() {
	const [offset, setOffset] = useState(0)
	const [pokemonLoaded, setPokemonLoaded] = useState(false)
	const [allPokemon, setAllPokemon] = useState<any[]>([])
	const [filteredPokemon, setFilteredPokemon] = useState<any[]>([])
	
	useEffect(() => {
		getAllPokemon()
	}, [offset])

	useEffect(() => {
		const sorted = filteredPokemon.sort((a, b) => a.id - b.id)
		setFilteredPokemon(sorted)
	}, [filteredPokemon])
	

	const getAllPokemon = async () => {
		try {
			const data = await P.getPokemonsList({ limit: 100, offset: offset })
			const pokeData = await Promise.all(data.results.map((x: any) => getPokemon(x.url)))
			const filter = pokeData.filter((f:any) => f !== undefined)
			setAllPokemon(prev => [...prev, ...filter])
			data.next && (setOffset(offset + 100))
			!data.next && setPokemonLoaded(true)
		} catch (error) {
			console.error(error)
		}
	}

	const getPokemon = async (url: string) => {
		try {
			const poke = await P.getResource(url)
			const species = await P.getResource(poke.species.url)
			const form = poke.forms[0] && await P.getResource(poke.forms[0].url)

			if (!form) { return }

			const generation = findGenByVerGroup(form.version_group.name)
			const name = findNameByLanguage(species.names)

			return {
				generation: generation,
				height: poke.height,
				id: poke.id,
				name: name,
				order: poke.order,
				sprite: poke.sprites.front_default,
				types: poke.types.map((t: any) => t.type.name),
				weight: poke.weight,
			}
		} catch (e) {
			console.error(e)
		}
	}

	const [filterTypes, setFilterTypes] = useState({
		unknown: true,
		bug: true,
		dark: true,
		dragon: true,
		electric: true,
		fairy: true,
		fighting: true,
		fire: true,
		flying: true,
		ghost: true,
		grass: true,
		ground: true,
		ice: true,
		normal: true,
		poison: true,
		psychic: true,
		rock: true,
		shadow: true,
		steel: true,
		water: true,
	})
	const [filterTypesIndex, setFilterTypesIndex] = useState(0)
	const [filterGen, setFilterGen] = useState({
		gen1: true,
		gen2: true,
		gen3: true,
		gen4: true,
		gen5: true,
		gen6: true,
		gen7: true,
		gen8: true,
		gen9: true,
		gen10: true,
	})

	const handleAllFilterChange = (e: any, action: 'select' | 'clear', filter: 'filterTypes' | 'filterGen') => {
		e.preventDefault()
		if (action === 'select') {
			const newFilter = Object.fromEntries(
				Object.keys(filter === 'filterTypes' ? filterTypes : filterGen).map(key => [key, true])
			)
			filter === 'filterTypes' ? setFilterTypes(newFilter as typeof filterTypes) : setFilterGen(newFilter as typeof filterGen)
		}

		if (action === 'clear') {
			const newFilter = Object.fromEntries(
				Object.keys(filter === 'filterTypes' ? filterTypes : filterGen).map(key => [key, false])
			)
			filter === 'filterTypes' ? setFilterTypes(newFilter as typeof filterTypes) : setFilterGen(newFilter as typeof filterGen)
		}
	}

	const handleFilterTypesChange = (e: any) => {
		const type = e.target.name
		if (e.target.checked) {
			setFilterTypes({...filterTypes, [type]: true})
		} else {
			setFilterTypes({...filterTypes, [type]: false})
		}
	}

	const handleFilterTypesIndexChange = (e:any, index: number) => {
		e.preventDefault()
		setFilterTypesIndex(index)
	}

	const handleFilterGenChange = (e: any) => {
		const gen = e.target.name
		if (e.target.checked) {
			setFilterGen({...filterGen, [gen]: true})
		} else {
			setFilterGen({...filterGen, [gen]: false})
		}
	}

	const handleSubmit = () => {
		const filtered = allPokemon.filter(p => {
			const types = p.types
			const selectedTypes = Object.entries(filterTypes)
				.filter(([k,v]) => v).map(([k]) => k)
			return selectedTypes.some(t => types.includes(t))
		})
		.filter(p => {
			const gen = p.generation
			const selectedGens = Object.entries(filterGen)
				.filter(([k, v]) => v)
				.map(([k]) => Number(k.replace('gen', '')))
				console.log(selectedGens)
			return selectedGens.includes(gen)
		})

		setFilteredPokemon(filtered)
	}

	const formH2 = "text-xl font-bold text-indigo-800"
	const formH3 = "font-bold text-indigo-800"
	const formSection = "grid grid-cols-4 py-10 border-t border-slate-200"
	const formRow = "flex flex-col mb-2"
	const formChecks = "grid grid-cols-3 md:grid-cols-4"
	
	return (
		<main>
			<h1 className="text-5xl my-10 mx-5 text-center font-black uppercase tracking-widest">Pokedex Search</h1>
			<form onSubmit={e => e.preventDefault()} className="bg-white p-10 rounded-lg shadow-lg max-w-4xl mx-auto mb-10">
				{/* <div className={formSection}>
					<div>
						<h2 className={formH2}>Basics</h2>
					</div>
					<div className="col-span-3">
						<div className={formRow}>
							<Label htmlFor="name" text="Name:" />
							<InputText name="name" disabled />
						</div>

						<div className={formRow}>
							<Label htmlFor="ability" text="Ability:" />
							<InputText name="ability" disabled />
						</div>

						<div className={formRow}>
							<Label htmlFor="heldItem" text="Held Item:" />
							<InputText name="heldItem" disabled />
						</div>

						<div className={formRow}>
							<Label htmlFor="growthRate" text="Growth Rate:" />
							<Select
								name="growthRate"
								options={[
									{ value: 'blank', label: '' },
									{ value: 'slow', label: 'Slow' },
									{ value: 'medium', label: 'Medium' },
									{ value: 'fast', label: 'Fast' },
									{ value: 'medium-slow', label: 'Medium Slow' },
									{ value: 'slow-then-very-fast', label: 'Slow then Very Fast' },
									{ value: 'fast-then-very-slow', label: 'Fast then Very Slow' },
								]}
								disabled
							/>
						</div>
						
						<div className={formRow}>
							<Label htmlFor="genderOperator" text="Gender:" />
							<div className="flex items-center">
								<Select
									name="genderOperator"
									defaultValue="equal"
									options={[
										{ value: 'never', label: 'never' },
										{ value: 'greater-than', label: '≥' },
										{ value: 'equal', label: '=' },
										{ value: 'less-than', label: '≤' },
									]}
									disabled
								/>
								<InputNumber name="genderValue" min={0} max={100} defaultValue={50} disabled />
								<div className="flex flex-col">
									<span className="ms-1">Female</span>
									<span className="text-slate-400 text-xs ps-1">(50% Male)</span>
								</div>
							</div>
						</div>
						
						<div className={formRow}>
							<Label htmlFor="eggGroup" text="Egg Group:" />
							<div className="flex items-center">
								<Select
									name="eggGroup"
									options={[
										{ value: 'blank', label: '' },
										{ value: 'amorphous', label: 'Amorphous' },
										{ value: 'bug', label: 'Bug' },
										{ value: 'ditto', label: 'Ditto' },
										{ value: 'dragon', label: 'Dragon' },
										{ value: 'flying', label: 'Flying' },
										{ value: 'field', label: 'Field' },
										{ value: 'fairy', label: 'Fairy' },
										{ value: 'grass', label: 'Grass' },
										{ value: 'human-like', label: 'Human-Like' },
										{ value: 'mineral', label: 'Mineral' },
										{ value: 'monster', label: 'Monster' },
										{ value: 'undiscovered', label: 'Undiscovered' },
										{ value: 'water1', label: 'Water 1' },
										{ value: 'water1', label: 'Water 2' },
										{ value: 'water3', label: 'Water 3' },
									]}
									disabled
								/>
								<Select
									name="eggGroupOperator"
									options={[
										{ value: 'or', label: 'or' },
										{ value: 'and', label: 'and' },
									]}
									disabled
								/>
								<Select
									name="eggGroup2"
									options={[
										{ value: 'blank', label: '' },
										{ value: 'amorphous', label: 'Amorphous' },
										{ value: 'bug', label: 'Bug' },
										{ value: 'ditto', label: 'Ditto' },
										{ value: 'dragon', label: 'Dragon' },
										{ value: 'flying', label: 'Flying' },
										{ value: 'field', label: 'Field' },
										{ value: 'fairy', label: 'Fairy' },
										{ value: 'grass', label: 'Grass' },
										{ value: 'human-like', label: 'Human-Like' },
										{ value: 'mineral', label: 'Mineral' },
										{ value: 'monster', label: 'Monster' },
										{ value: 'undiscovered', label: 'Undiscovered' },
										{ value: 'water1', label: 'Water 1' },
										{ value: 'water1', label: 'Water 2' },
										{ value: 'water3', label: 'Water 3' },
									]}
									disabled
								/>
							</div>
						</div>
					</div>
				</div> */}

				{/* <div className={formSection}>
					<div>
						<h2 className={formH2}>Details</h2>
					</div>
					<div className="col-span-3">
						<div className={formRow}>
							<Label htmlFor="species" text="Species:" />
							<InputText name="species" disabled />
						</div>

						<div className={formRow}>
							<Label htmlFor="color" text="Color:" />
							<Select
								name="color"
								options={[
									{ value: 'blank', label: '' },
									{ value: 'black', label: 'Black' },
									{ value: 'blue', label: 'Blue' },
									{ value: 'brown', label: 'Brown' },
									{ value: 'gray', label: 'Gray' },
									{ value: 'green', label: 'Green' },
									{ value: 'pink', label: 'Pink' },
									{ value: 'purple', label: 'Purple' },
									{ value: 'red', label: 'Red' },
									{ value: 'white', label: 'White' },
									{ value: 'yellow', label: 'Yellow' },
								]}
								disabled
							/>
						</div>

						<div className={formRow}>
							<Label htmlFor="habitat" text="Habitat:" />
							<Select
								name="habitat"
								options={[
									{ value: 'blank', label: '' },
									{ value: 'cave', label: 'Cave' },
									{ value: 'forest', label: 'Forest' },
									{ value: 'grassland', label: 'Grassland' },
									{ value: 'mountain', label: 'Mountain' },
									{ value: 'rare', label: 'Rare' },
									{ value: 'rough-terrain', label: 'Rough Terrain' },
									{ value: 'sea', label: 'Sea' },
									{ value: 'urban', label: 'Urban' },
									{ value: 'waters-edge', label: 'Waters Edge' },
								]}
								disabled
							/>
						</div>

						<div className={formRow}>
							<Label htmlFor="shape" text="Shape:" />
							<Select
								name="shape"
								options={[
									{ value: 'blank', label: '' },
									{ value: 'armor', label: '' },
									{ value: 'arms', label: '' },
									{ value: 'ball', label: '' },
									{ value: 'blob', label: '' },
									{ value: 'bug-wings', label: '' },
									{ value: 'fish', label: '' },
									{ value: 'heads', label: '' },
									{ value: 'humanoid', label: '' },
									{ value: 'legs', label: '' },
									{ value: 'quadruped', label: '' },
									{ value: 'squiggle', label: '' },
									{ value: 'tentacles', label: '' },
									{ value: 'upright', label: '' },
									{ value: 'wings', label: '' },
								]}
								disabled
							/>
						</div>
					</div>
				</div> */}

				<div className={formSection}>
					<div>
						<h2 className={formH2}>Types</h2>
					</div>
					<div className="col-span-3">
						<div className={formRow}>
							<div className="flex gap-2 mb-4">
								<Button onClick={e => handleFilterTypesIndexChange(e, 0)} size="sm" variant={filterTypesIndex === 0 ? "filled" : "outline"}>Any</Button>
								<Button onClick={e => handleFilterTypesIndexChange(e, 1)} size="sm" variant={filterTypesIndex === 1 ? "filled" : "outline"}>Single Type</Button>
								<Button onClick={e => handleFilterTypesIndexChange(e, 2)} size="sm" variant={filterTypesIndex === 2 ? "filled" : "outline"}>Dual Type</Button>
							</div>

							<fieldset className={formChecks}>
								{Object.entries(filterTypes).map(([t, v], i) => (
									<div key={i} className="flex">
										<InputCheck name={t} onChange={handleFilterTypesChange} checked={v} />
										<Label htmlFor={t} text={t.charAt(0).toUpperCase() + t.slice(1)} />
									</div>
								))}
							</fieldset>
						</div>

						<div className="flex gap-2 mt-4">
							<Button size="sm" onClick={e => handleAllFilterChange(e, 'select', 'filterTypes')} >Select All</Button>
							<Button size="sm" onClick={e => handleAllFilterChange(e, 'clear', 'filterTypes')} >Clear All</Button>
						</div>
					</div>
				</div>

				<div className={formSection}>
					<div>
						<h2 className={formH2}>Generations</h2>
					</div>
					<div className="col-span-3">
						<div className={formRow}>
							<h3 className={formH3}>Introduced in</h3>
							<fieldset>
								<div className="flex">
									<InputCheck name="gen1" onChange={handleFilterGenChange} checked={filterGen.gen1} />
									<Label htmlFor="gen1" text="Generation I" />
								</div>
								<div className="flex">
									<InputCheck name="gen2" onChange={handleFilterGenChange} checked={filterGen.gen2} />
									<Label htmlFor="gen2" text="Generation II" />
								</div>
								<div className="flex">
									<InputCheck name="gen3" onChange={handleFilterGenChange} checked={filterGen.gen3} />
									<Label htmlFor="gen3" text="Generation III" />
								</div>
								<div className="flex">
									<InputCheck name="gen4" onChange={handleFilterGenChange} checked={filterGen.gen4} />
									<Label htmlFor="gen4" text="Generation IV" />
								</div>
								<div className="flex">
									<InputCheck name="gen5" onChange={handleFilterGenChange} checked={filterGen.gen5} />
									<Label htmlFor="gen5" text="Generation V" />
								</div>
								<div className="flex">
									<InputCheck name="gen6" onChange={handleFilterGenChange} checked={filterGen.gen6} />
									<Label htmlFor="gen6" text="Generation VI" />
								</div>
								<div className="flex">
									<InputCheck name="gen7" onChange={handleFilterGenChange} checked={filterGen.gen7} />
									<Label htmlFor="gen7" text="Generation VII" />
								</div>
								<div className="flex">
									<InputCheck name="gen8" onChange={handleFilterGenChange} checked={filterGen.gen8} />
									<Label htmlFor="gen8" text="Generation VIII" />
								</div>
								<div className="flex">
									<InputCheck name="gen9" onChange={handleFilterGenChange} checked={filterGen.gen9} />
									<Label htmlFor="gen9" text="Generation IX" />
								</div>
								<div className="flex">
									<InputCheck name="gen10" onChange={handleFilterGenChange} checked={filterGen.gen10} />
									<Label htmlFor="gen10" text="Generation X" />
								</div>
							</fieldset>
						</div>

						<div className="flex gap-2 mt-4">
							<Button size="sm" onClick={e => handleAllFilterChange(e, 'select', 'filterGen')} >Select All</Button>
							<Button size="sm" onClick={e => handleAllFilterChange(e, 'clear', 'filterGen')} >Clear All</Button>
						</div>
					</div>
				</div>

				{/* <div className={formSection}>
					<div>
						<h2 className={formH2}>Stats</h2>
					</div>
					<div className="col-span-3">
						<h3 className={formH3}>Size</h3>

						<div className={formRow}>
							<Label htmlFor="heightValue1" text="Height:" />
							<div className="flex items-center">
								<Select
									name="heightOperator"
									defaultValue="greater-than"
									options={[
										{ value: 'greater-than', label: '≥' },
										{ value: 'equal', label: '=' },
										{ value: 'less-than', label: '≤' },
										{ value: 'between', label: 'between' },
									]}
								/>
								<InputNumber name="heightValue1" min={0} defaultValue={0} />
								<span>&amp;</span>
								<InputNumber name="heightValue2" min={0} defaultValue={0} />
								<Select
									name="heightUnit"
									defaultValue="meter"
									options={[
										{ value: 'meters', label: 'm' },
										{ value: 'feet', label: 'ft' },
									]}
								/>
							</div>
						</div>

						<div className={formRow}>
							<Label htmlFor="weightValue1" text="Weight:" />
							<div className="flex items-center">
								<Select
									name="weightOperator"
									defaultValue="greater-than"
									options={[
										{ value: 'greater-than', label: '≥' },
										{ value: 'equal', label: '=' },
										{ value: 'less-than', label: '≤' },
										{ value: 'between', label: 'between' },
									]}
								/>
								<InputNumber name="weightValue1" min={0} defaultValue={0} />
								<span>&amp;</span>
								<InputNumber name="weightValue2" min={0} defaultValue={0} />
								<Select
									name="weightUnit"
									defaultValue="kilograms"
									options={[
										{ value: 'kilograms', label: 'kg' },
										{ value: 'pounds', label: 'lb' },
									]}
								/>
							</div>
						</div>
					</div>
				</div> */}

				<Button size="lg" onClick={handleSubmit} disabled={!pokemonLoaded}>Filter & Search</Button>
			</form>

			{filteredPokemon && <Table filteredPokemon={filteredPokemon} />}
		</main>
	);
}
