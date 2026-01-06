import { useEffect, useState } from "react"
import Button from "../button"
import { useCheckLongPress } from "@/_util/use"
import InputCheck from "./inputCheck"
import Label from "./label"
import { TypeChip } from "../chip"
import { findGenFullName } from "@/_util/find"
import Select from "./select"
import InputNumber from "./inputNumber"
import { calcHeightInMeters, calcWeightInKilograms } from "@/_util/calc"

const FilterForm = ({
	allPokemon,
	pokeAdj,
	pokemonLoaded,
	onSubmit
}: {
	allPokemon: any[]
	pokeAdj: any
	pokemonLoaded: boolean
	onSubmit: (filtered: any[]) => void
}) => {
	const { isLongPress, handlers } = useCheckLongPress()

	const [fTypes, setFTypes] = useState({
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
		steel: true,
		water: true,
	})
	const [fTypesIndex, setFTypesIndex] = useState(0)
	const [fTypeReq, setFTypeReq] = useState('')
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

	const [isAdj, setIsAdj] = useState(false)

	useEffect(() => {
		if (pokeAdj.gen[0] !== 0) {
			if (pokeAdj.gen[1] == 1) {
				let newFGen = {}
				for (let i=pokeAdj.gen[0]; i<11; i++) {
					newFGen = {...newFGen, ['gen'+i]: false}
				}
				setFGen({...fGen, ...newFGen})
				setIsAdj(true)
			}

			if (pokeAdj.gen[1] == 2) {
				const newFilter = Object.fromEntries(
					Object.keys(fGen).map(key => [key, false])
				)
				setFGen({...fGen, ...newFilter, ['gen'+pokeAdj.gen[0]]: true})
				setIsAdj(true)
			}

			if (pokeAdj.gen[1] == 3) {
				let newFGen = {}
				for (let i=1; i<pokeAdj.gen[0]+1; i++) {
					newFGen = {...newFGen, ['gen'+i]: false}
				}
				setFGen({...fGen, ...newFGen})
				setIsAdj(true)
			}
		}
	}, [pokeAdj])

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
			if (filter === 'fTypes') {
				setFTypes(newFilter as typeof fTypes)
				setFTypeReq('')
			} else setFGen(newFilter as typeof fGen)
		}
	}

	const handleFTypesChange = (e: any) => {
		const t = e.target.name

		if (isLongPress) {
			if (fTypeReq == t) setFTypeReq('')
			else {
				setFTypes({...fTypes, [t]:true})
				setFTypeReq(t)
			}
		} else {
			if (e.target.checked) {
				setFTypes({...fTypes, [t]:true})
			} else {
				setFTypes({...fTypes, [t]:false})
				if (fTypeReq == t) setFTypeReq('')
			}
		}
	}

	const handleFTypesIndexChange = (e:any, index: number) => {
		e.preventDefault()
		setFTypesIndex(index)
	}

	const handleFGenChange = (e:any, g?:string, c?:boolean) => {
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
			const selectedTypes = Object.entries(fTypes)
				.filter(([k,v]) => v).map(([k]) => k)

			switch (fTypesIndex) {
				case 1:
					if (p.types.length === 1) {
						if (fTypeReq !== '') return p.types.some((t:string) => fTypeReq.includes(t))
						return p.types.every((t:string) => selectedTypes.includes(t))
					} else return false
				case 2:
					if (p.types.length === 2) {
						if (selectedTypes.length > 1) {
							if (fTypeReq !== '') {
								const req = p.types.some((t:string) => fTypeReq.includes(t))
								if (req) return p.types.every((t:string) => selectedTypes.includes(t))
								else return
							} else return p.types.every((t:string) => selectedTypes.includes(t))
						} else return selectedTypes.some(t => p.types.includes(t))
					}
					else return false
				default:
					if (p.types.length === 2) {
						if (selectedTypes.length > 1) {
							if (fTypeReq !== '') {
								const req = p.types.some((t:string) => fTypeReq.includes(t))
								if (req) return p.types.every((t:string) => selectedTypes.includes(t))
								else return
							} else return p.types.every((t:string) => selectedTypes.includes(t))
						} else return selectedTypes.some(t => p.types.includes(t))
					} else {
						if (fTypeReq !== '') {
							const req = p.types.some((t:string) => fTypeReq.includes(t))
							if (req) return p.types.every((t:string) => selectedTypes.includes(t))
							else return
						} else return p.types.every((t:string) => selectedTypes.includes(t))
					}
			}
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

			if (fHOperator === 'greater') return calcH > fHeight[0]
			if (fHOperator === 'equal') return calcH == fHeight[0]
			if (fHOperator === 'less') return calcH < fHeight[0]
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

			if (fWOperator === 'greater') return calcW > fWeight[0]
			if (fWOperator === 'equal') return calcW == fWeight[0]
			if (fWOperator === 'less') return calcW < fWeight[0]
			if (fWOperator === 'between') {
				const min = Math.min(fWeight[0], fWeight[1])
				const max = Math.max(fWeight[0], fWeight[1])
				return calcW >= min && calcW <= max
			}
		})

		onSubmit(filtered)
	}
	

	const formH2 = "text-xl font-bold text-indigo-800 mb-3"
	const formH3 = "font-bold text-indigo-800"
	const formSection = "grid grid-cols-5 py-10 border-t border-slate-200"
	const formRow = "flex flex-col mb-2"

	return (
		<form onSubmit={e => e.preventDefault()} className="bg-white p-10 rounded-3xl shadow-lg max-w-4xl mx-auto mb-10">
			{/* Types & Generations */}
			<div className={`${formSection} gap-6`}>
				{/* Types */}
				<div className="col-span-3">
					<div className={formRow}>
						<div>
							<h2 className={formH2}>Types</h2>
						</div>
						<div className="flex gap-2 mb-4 items-center">
							<div className="flex max-md:flex-col gap-1 md:gap-2">
								<Button onClick={e => handleFTypesIndexChange(e, 0)} size="sm" variant={fTypesIndex === 0 ? "filled" : "outline"}>Any</Button>
								<Button onClick={e => handleFTypesIndexChange(e, 1)} size="sm" variant={fTypesIndex === 1 ? "filled" : "outline"}>Single Type</Button>
								<Button onClick={e => handleFTypesIndexChange(e, 2)} size="sm" variant={fTypesIndex === 2 ? "filled" : "outline"}>Dual Type</Button>
							</div>
							<div className="flex flex-col">
								<p className="text-slate-400 text-sm leading-4"><em>Check a type to include it</em></p>
								<p className="text-slate-400 text-sm leading-4"><em>Long press a type to require it</em></p>
							</div>
						</div>

						<fieldset className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
							{Object.entries(fTypes).map(([k, v], i) => (
								<div key={i} className="flex" {...handlers}>
									<InputCheck name={k} checked={v} onChange={handleFTypesChange} />
									<Label htmlFor={k}>
										<TypeChip type={k} className={
											`${v ? '' : 'opacity-30!'}${fTypeReq == k ? ' border-3 border-indigo-700' : ''}`
										} />
									</Label>
								</div>
							))}
						</fieldset>
					</div>

					<div className="flex gap-2 mt-4">
						<Button size="sm" onClick={e => handleAllFilterChange(e, 'select', 'fTypes')} >Select All</Button>
						<Button size="sm" onClick={e => handleAllFilterChange(e, 'clear', 'fTypes')} >Clear All</Button>
					</div>
				</div>

				{/* Generations */}
				<div className="col-span-2">
					<div className={formRow}>
						<div><h2 className={formH2}>Generations</h2></div>
						<h3 className={formH3}>Introduced in</h3>
						<fieldset className="grid grid-cols-1 md:grid-cols-2">
							{Object.entries(fGen).map(([k,v], i) => (
								<div key={i} className="flex">
									<InputCheck name={k} onChange={handleFGenChange} checked={v} />
									<Label htmlFor={k} className={`${v ? '' : ' opacity-30!'}`} text={findGenFullName(parseInt(k.slice(3)))} />
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


			{/* Stats */}
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
									{ value: 'greater', label: '>' },
									{ value: 'equal', label: '=' },
									{ value: 'less', label: '<' },
									{ value: 'between', label: 'between' },
								]}
							/>
							<InputNumber name="heightValue1" min={0} value={fHeight[0]} onChange={(e:any) => handleFHChange(e, 0)} step="0.1" />
							<div className={ fHOperator == 'between' ? 'visible flex items-center' : 'hidden' }>
								<span>&ndash;</span>
								<InputNumber name="heightValue2" min={0} value={fHeight[1]} onChange={(e:any) => handleFHChange(e, 1)} step="0.1" />
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
									{ value: 'greater', label: '>' },
									{ value: 'equal', label: '=' },
									{ value: 'less', label: '<' },
									{ value: 'between', label: 'between' },
								]}
							/>
							<InputNumber name="weightValue1" min={0} value={fWeight[0]} onChange={(e:any) => handleFWChange(e, 0)} step="0.1" />
							<div className={ fWOperator == 'between' ? 'visible flex items-center' : 'hidden' }>
								<span>&ndash;</span>
								<InputNumber name="weightValue2" min={0} value={fWeight[1]} onChange={(e:any) => handleFWChange(e, 1)} step="0.1" />
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


			<div className={`${isAdj ? 'sticky z-50 top-8' : ''}`}>
				<Button size="lg" onClick={handleSubmit} disabled={!pokemonLoaded}>
					{pokemonLoaded ? "Filter & Search" : "Loading"}
				</Button>
			</div>
		</form>
	)
}

export default FilterForm