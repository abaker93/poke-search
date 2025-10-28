import InputCheck from '@/_components/_form/inputCheck'
import InputNumber from '@/_components/_form/inputNumber'
import InputText from '@/_components/_form/inputText'
import Label from '@/_components/_form/label'
import Select from '@/_components/_form/select'
import Button from '@/_components/button'
import Pokedex from 'pokedex-promise-v2'

const P = new Pokedex()

export default function Home() {
	(async () => {
		try {
			const data = await P.getPokemonsList({ limit: 10, offset: 0 })
			console.log(data)
		} catch (error) {
			console.error(error)
		}
	})()

	const formH2 = "text-xl font-bold text-indigo-800"
	const formH3 = "font-bold text-indigo-800"
	const formSection = "grid grid-cols-4 py-10 border-t border-slate-200"
	const formRow = "flex flex-col mb-2"
	const formChecks = "grid grid-cols-3 md:grid-cols-4"

	return (
		<main>
			<h1 className="text-5xl my-10 mx-5 text-center font-black uppercase tracking-widest">Pokedex Search</h1>
			<form>
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
								<Button size="sm">Any</Button>
								<Button size="sm" variant="outline">Single Type</Button>
								<Button size="sm" variant="outline">Dual Type</Button>
							</div>

							<fieldset className={formChecks}>
								<div className="flex">
									<InputCheck name="unknown" checked disabled />
									<Label htmlFor="unknown" text="Unknown" />
								</div>
								<div className="flex">
									<InputCheck name="bug" checked />
									<Label htmlFor="bug" text="Bug" />
								</div>
								<div className="flex">
									<InputCheck name="dark" checked />
									<Label htmlFor="dark" text="Dark" />
								</div>
								<div className="flex">
									<InputCheck name="dragon" checked />
									<Label htmlFor="dragon" text="Dragon" />
								</div>
								<div className="flex">
									<InputCheck name="electric" checked />
									<Label htmlFor="electric" text="Electric" />
								</div>
								<div className="flex">
									<InputCheck name="fairy" checked />
									<Label htmlFor="fairy" text="Fairy" />
								</div>
								<div className="flex">
									<InputCheck name="fighting" checked />
									<Label htmlFor="fighting" text="Fighting" />
								</div>
								<div className="flex">
									<InputCheck name="fire" checked />
									<Label htmlFor="fire" text="Fire" />
								</div>
								<div className="flex">
									<InputCheck name="flying" checked />
									<Label htmlFor="flying" text="Flying" />
								</div>
								<div className="flex">
									<InputCheck name="ghost" checked />
									<Label htmlFor="ghost" text="Ghost" />
								</div>
								<div className="flex">
									<InputCheck name="grass" checked />
									<Label htmlFor="grass" text="Grass" />
								</div>
								<div className="flex">
									<InputCheck name="ground" checked />
									<Label htmlFor="ground" text="Ground" />
								</div>
								<div className="flex">
									<InputCheck name="ice" checked />
									<Label htmlFor="ice" text="Ice" />
								</div>
								<div className="flex">
									<InputCheck name="normal" checked />
									<Label htmlFor="normal" text="Normal" />
								</div>
								<div className="flex">
									<InputCheck name="poison" checked />
									<Label htmlFor="poison" text="Poison" />
								</div>
								<div className="flex">
									<InputCheck name="psychic" checked />
									<Label htmlFor="psychic" text="Psychic" />
								</div>
								<div className="flex">
									<InputCheck name="rock" checked />
									<Label htmlFor="rock" text="Rock" />
								</div>
								<div className="flex">
									<InputCheck name="shadow" checked disabled />
									<Label htmlFor="shadow" text="Shadow" />
								</div>
								<div className="flex">
									<InputCheck name="steel" checked />
									<Label htmlFor="steel" text="Steel" />
								</div>
								<div className="flex">
									<InputCheck name="water" checked />
									<Label htmlFor="water" text="Water" />
								</div>
							</fieldset>
						</div>

						<div className="flex gap-2 mt-4">
							<Button size="sm">Select All</Button>
							<Button size="sm">Clear All</Button>
						</div>
					</div>
				</div>

				{/* <div className={formSection}>
					<div>
						<h2 className={formH2}>Evolution</h2>
					</div>
					<div className="col-span-3">
						<div className={formRow}>
							<fieldset>
								<div className={formChecks}>
									<div className="flex">
										<InputCheck name="unknown" />
										<Label htmlFor="unknown" text="Unknown" />
									</div>
								</div>
							</fieldset>
						</div>
					</div>
				</div> */}

				<div className={formSection}>
					<div>
						<h2 className={formH2}>Generations</h2>
					</div>
					<div className="col-span-3">
						<div className={formRow}>
							<h3 className={formH3}>Introduced in</h3>
							<fieldset>
								<div className="flex">
									<InputCheck name="gen1" checked />
									<Label htmlFor="gen1" text="I" />
								</div>
								<div className="flex">
									<InputCheck name="gen2" checked />
									<Label htmlFor="gen2" text="II" />
								</div>
								<div className="flex">
									<InputCheck name="gen3" checked />
									<Label htmlFor="gen3" text="III" />
								</div>
								<div className="flex">
									<InputCheck name="gen4" checked />
									<Label htmlFor="gen4" text="IV" />
								</div>
								<div className="flex">
									<InputCheck name="gen5" checked />
									<Label htmlFor="gen5" text="V" />
								</div>
								<div className="flex">
									<InputCheck name="gen6" checked />
									<Label htmlFor="gen6" text="VI" />
								</div>
								<div className="flex">
									<InputCheck name="gen7" checked />
									<Label htmlFor="gen7" text="VII" />
								</div>
								<div className="flex">
									<InputCheck name="gen8" checked />
									<Label htmlFor="gen8" text="VIII" />
								</div>
								<div className="flex">
									<InputCheck name="gen9" checked />
									<Label htmlFor="gen9" text="IX" />
								</div>
								<div className="flex">
									<InputCheck name="gen10" checked disabled />
									<Label htmlFor="gen10" text="X" />
								</div>
							</fieldset>
						</div>

						<div className="flex gap-2 mt-4">
							<Button size="sm">Select All</Button>
							<Button size="sm">Clear All</Button>
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
				</div>

			</form>
		</main>
	);
}
