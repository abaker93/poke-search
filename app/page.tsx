'use client'

import InputCheck from '@/_components/_form/inputCheck'
import InputNumber from '@/_components/_form/inputNumber'
import InputText from '@/_components/_form/inputText'
import Label from '@/_components/_form/label'
import Select from '@/_components/_form/select'
import Button from '@/_components/button'
import Table from '@/_components/table'
import { calcHeightInMeters, calcWeightInKilograms } from '@/_util/calc'
import { findGenByVerGroup, findGenFullName, findNameByLanguage } from '@/_util/find'
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

	const [fTypes, setFTypes] = useState({
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
	const [fTypesIndex, setFTypesIndex] = useState(0)
	const [fGen, setFGen] = useState({
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
	const [fHeight, setFHeight] = useState([0, 0])
	const [fHOperator, setFHOperator] = useState('greater')
	const [fHUnit, setFHUnit] = useState('meters')
	const [fWeight, setFWeight] = useState([0, 0])
	const [fWOperator, setFWOperator] = useState('greater')
	const [fWUnit, setFWUnit] = useState('kilograms')

	const handleAllFilterChange = (e: any, action: 'select' | 'clear', filter: 'fTypes' | 'fGen') => {
		e.preventDefault()
		if (action === 'select') {
			const newFilter = Object.fromEntries(
				Object.keys(filter === 'fTypes' ? fTypes : fGen).map(key => [key, true])
			)
			filter === 'fTypes' ? setFTypes(newFilter as typeof fTypes) : setFGen(newFilter as typeof fGen)
		}

		if (action === 'clear') {
			const newFilter = Object.fromEntries(
				Object.keys(filter === 'fTypes' ? fTypes : fGen).map(key => [key, false])
			)
			filter === 'fTypes' ? setFTypes(newFilter as typeof fTypes) : setFGen(newFilter as typeof fGen)
		}
	}

	const handleFilterTypesChange = (e: any) => {
		const type = e.target.name
		if (e.target.checked) {
			setFTypes({...fTypes, [type]: true})
		} else {
			setFTypes({...fTypes, [type]: false})
		}
	}

	const handleFilterTypesIndexChange = (e:any, index: number) => {
		e.preventDefault()
		setFTypesIndex(index)
	}

	const handleFilterGenChange = (e: any) => {
		const gen = e.target.name
		if (e.target.checked) {
			setFGen({...fGen, [gen]: true})
		} else {
			setFGen({...fGen, [gen]: false})
		}
	}

	const handleFHChange = (e:any, index:number) => {
		const newH = e.target.value
		
		const h = fHeight.map((h, i) => {
			if (i === index) {
				return newH
			} else {
				return h
			}
		})

		setFHeight(h)
	}

	const handleFWChange = (e:any, index:number) => {
		const newW = e.target.value
		
		const w = fWeight.map((w, i) => {
			if (i === index) {
				return newW
			} else {
				return w
			}
		})

		setFWeight(w)
	}

	const handleSubmit = () => {
		const filtered = allPokemon.filter(p => {
			const types = p.types
			const selectedTypes = Object.entries(fTypes)
				.filter(([k,v]) => v).map(([k]) => k)
			return selectedTypes.some(t => types.includes(t))
		})
		.filter(p => {
			const gen = p.generation
			const selectedGens = Object.entries(fGen)
				.filter(([k, v]) => v)
				.map(([k]) => Number(k.replace('gen', '')))
			return selectedGens.includes(gen)
		})
		.filter(p => {
			let calcH = 0

			if (fHUnit === 'meters') calcH = calcHeightInMeters(p.height)
			if (fHUnit === 'feet') calcH = p.height //TODO: fix calc to feet

			if (fHOperator === 'greater') return calcH >= fHeight[0]
			if (fHOperator === 'equal') return calcH == fHeight[0]
			if (fHOperator === 'less') return calcH <= fHeight[0]
			if (fHOperator === 'between') {
				const min = Math.min(fHeight[0], fHeight[1])
				const max = Math.max(fHeight[0], fHeight[1])
				return calcH >= min && calcH <= max
			}
		})
		.filter(p => {
			let calcW = 0

			if (fWUnit === 'kilograms') calcW = calcWeightInKilograms(p.weight)
			if (fWUnit === 'pounds') calcW = p.weight //TODO: fix calc to pounds

			if (fWOperator === 'greater') return calcW >= fWeight[0]
			if (fWOperator === 'equal') return calcW == fWeight[0]
			if (fWOperator === 'less') return calcW <= fWeight[0]
			if (fWOperator === 'between') {
				const min = Math.min(fWeight[0], fWeight[1])
				const max = Math.max(fWeight[0], fWeight[1])
				return calcW >= min && calcW <= max
			}
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
								<Button onClick={e => handleFilterTypesIndexChange(e, 0)} size="sm" variant={fTypesIndex === 0 ? "filled" : "outline"}>Any</Button>
								<Button onClick={e => handleFilterTypesIndexChange(e, 1)} size="sm" variant={fTypesIndex === 1 ? "filled" : "outline"}>Single Type</Button>
								<Button onClick={e => handleFilterTypesIndexChange(e, 2)} size="sm" variant={fTypesIndex === 2 ? "filled" : "outline"}>Dual Type</Button>
							</div>

							<fieldset className={formChecks}>
								{Object.entries(fTypes).map(([k, v], i) => (
									<div key={i} className="flex">
										<InputCheck name={k} onChange={handleFilterTypesChange} checked={v} />
										<Label htmlFor={k} text={k.charAt(0).toUpperCase() + k.slice(1)} />
									</div>
								))}
							</fieldset>
						</div>

						<div className="flex gap-2 mt-4">
							<Button size="sm" onClick={e => handleAllFilterChange(e, 'select', 'fTypes')} >Select All</Button>
							<Button size="sm" onClick={e => handleAllFilterChange(e, 'clear', 'fTypes')} >Clear All</Button>
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
								{Object.entries(fGen).map(([k,v], i) => (
									<div key={i} className="flex">
										<InputCheck name={k} onChange={handleFilterGenChange} checked={fGen[k]} />
										<Label htmlFor={k} text={findGenFullName(parseInt(k.slice(3)))} />
									</div>
								))}
							</fieldset>
						</div>

						<div className="flex gap-2 mt-4">
							<Button size="sm" onClick={e => handleAllFilterChange(e, 'select', 'fGen')} >Select All</Button>
							<Button size="sm" onClick={e => handleAllFilterChange(e, 'clear', 'fGen')} >Clear All</Button>
						</div>
					</div>
				</div>

				<div className={formSection}>
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
									value={fHOperator}
									onChange={(e:any) => setFHOperator(e.target.value)}
									options={[
										{ value: 'greater', label: '≥' },
										{ value: 'equal', label: '=' },
										{ value: 'less', label: '≤' },
										{ value: 'between', label: 'between' },
									]}
								/>
								<InputNumber name="heightValue1" min={0} value={fHeight[0]} onChange={(e:any) => handleFHChange(e, 0)} step="0.01" />
								<div className={ fHOperator == 'between' ? 'visible flex items-center' : 'hidden' }>
									<span>&ndash;</span>
									<InputNumber name="heightValue2" min={0} value={fHeight[1]} onChange={(e:any) => handleFHChange(e, 1)} step="0.01" />
								</div>
								<Select
									name="heightUnit"
									value={fHUnit}
									onChange={(e:any) => setFHUnit(e.target.value)}
									options={[
										{ value: 'meters', label: 'm' },
										{ value: 'feet', label: 'ft', disabled: true },
									]}
								/>
							</div>
						</div>

						<div className={formRow}>
							<Label htmlFor="weightValue1" text="Weight:" />
							<div className="flex items-center">
								<Select
									name="weightOperator"
									value={fWOperator}
									onChange={(e:any) => setFWOperator(e.target.value)}
									options={[
										{ value: 'greater', label: '≥' },
										{ value: 'equal', label: '=' },
										{ value: 'less', label: '≤' },
										{ value: 'between', label: 'between' },
									]}
								/>
								<InputNumber name="weightValue1" min={0} value={fWeight[0]} onChange={(e:any) => handleFWChange(e, 0)} step="0.01" />
								<div className={ fWOperator == 'between' ? 'visible flex items-center' : 'hidden' }>
									<span>&ndash;</span>
									<InputNumber name="weightValue2" min={0} value={fWeight[1]} onChange={(e:any) => handleFWChange(e, 1)} step="0.01" />
								</div>
								<Select
									name="weightUnit"
									value={fWUnit}
									onChange={(e:any) => setFWUnit(e.target.value)}
									options={[
										{ value: 'kilograms', label: 'kg' },
										{ value: 'pounds', label: 'lb', disabled: true },
									]}
								/>
							</div>
						</div>
					</div>
				</div>

				<Button size="lg" onClick={handleSubmit} disabled={!pokemonLoaded}>
					{pokemonLoaded ? "Filter & Search" : "Loading"}
				</Button>
			</form>

			{filteredPokemon && <Table filteredPokemon={filteredPokemon} />}
		</main>
	);
}
