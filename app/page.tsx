'use client'

import FilterForm from '@/_components/_form/filterForm'
import Table from '@/_components/table'
import { findGenByVerGroup, findNameByLanguage } from '@/_util/find'

import { useEffect, useState } from 'react'
import Pokedex from 'pokedex-promise-v2'
import Alert from '@/_components/alert'

const P = new Pokedex()
const version = 1.1

const boldYellow = "font-bold text-yellow-300"

export default function Home() {
	const [isLS, setIsLS] = useState(true)
	const [offset, setOffset] = useState(0)
	const [pokemonLoaded, setPokemonLoaded] = useState(false)
	const [allPokemon, setAllPokemon] = useState<any[]>([])
	const [filteredPokemon, setFilteredPokemon] = useState<any[]>([])

	useEffect(() => {
		const ls:any = localStorage.getItem('pokemon')
		const lsTimeout:any = localStorage.getItem('cache-timeout')
		const lsVersion:any = localStorage.getItem('version')

		if (!ls || !lsTimeout || !lsVersion) setIsLS(false)
		else {
			const poke = JSON.parse(ls)
			const timeout = Date.parse(lsTimeout)
			const isTimeout = lsVersion < version || new Date().getTime() >= timeout

			if (isTimeout) setIsLS(false)
			else {
				setPokemonLoaded(true)
				setAllPokemon(poke)
			}
		}
	}, [])
	
	useEffect(() => {
		!pokemonLoaded && !isLS && getAllPokemon()

		if (pokemonLoaded && offset !== 0) {
			const timeout = new Date()
			timeout.setDate(timeout.getDate() + 6)

			localStorage.setItem('pokemon', JSON.stringify([...allPokemon]))
			localStorage.setItem('cache-timeout', timeout.toString())
			localStorage.setItem('version', version.toString())
		}
	}, [isLS, offset, pokemonLoaded])

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
		const formNames = ['10', '50', 'alola', 'aria', 'baile', 'black', 'bloodmoon', 'complete', 'crowned', 'dawn', 'dusk', 'family', 'fan', 'frost', 'galar', 'gmax', 'heat', 'hero', 'hisui', 'ice', 'incarnate', 'land', 'mega', 'meteor', 'midday', 'midnight', 'mow', 'origin', 'paldea', 'pau', 'pirouette', 'plant', 'pom', 'primal', 'rainy', 'red', 'roaming', 'sandy', 'school', 'segment', 'sensu', 'shadow', 'sky', 'snowy', 'solo', 'stellar', 'sunny', 'terastal', 'therian', 'trash', 'ultra', 'unbound', 'wash', 'white', 'zen', 'zero']

		const skippedForms = ['aquatic', 'ash', 'attack', 'belle', 'blade', 'blue', 'bond', 'busted', 'cap', 'cosplay', 'dada', 'defense', 'drive', 'droopy', 'eternal', 'eternamax', 'female', 'glide', 'gliding', 'gorging', 'green', 'gulping', 'hangry', 'indigo', 'large', 'libre', 'limited', 'low', 'mask', 'orange', 'original', 'own-tempo', 'phd', 'pop-star', 'resolute', 'rock-star', 'small', 'speed', 'sprinting', 'starter', 'stretchy', 'super', 'swimming', 'totem', 'violet', 'white-striped', 'yellow']

		try {
			const poke = await P.getResource(url)
			const species = await P.getResource(poke.species.url)
			const form = poke.forms[0] && await P.getResource(poke.forms[0].url)

			if (!form) { return }
			if (skippedForms.includes(form.form_name) || form.form_name.split('-').some((w:any) => skippedForms.includes(w))) { return }
			if (form.name === 'eiscue-noice' || form.name === 'zygarde-10') { return }

			const generation = findGenByVerGroup(form.version_group.name)
			let name

			if (form.form_name.split('-').some((w:any) =>formNames.includes(w))) {
				name = findNameByLanguage(form.names) || findNameByLanguage(species.names)
			} else {
				name = findNameByLanguage(species.names)
			}

			return {
				dex: species.pokedex_numbers.find((f:any) => f.pokedex.name === 'national').entry_number,
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

	const [pokeAdj, setPokeAdj] = useState({
		gen: [0,0],
		height: [0,0],
		weight: [0,0]
	})

	return (
		<main>
			<h1 className="text-5xl my-10 mx-5 text-center font-black uppercase tracking-widest">Pokedex Search</h1>

			<Alert icon="✨">
				<h2 className="font-bold text-xl text-indigo-400 mb-2">Version 1.2</h2>
				{/* <p><strong>Dark Mode! 🌚 🌝</strong> & toggle</p> */}
				<p><strong>Height & weight</strong> - updated options to <span className={boldYellow}>&gt;</span> / <span className={boldYellow}>&lt;</span> instead of <span className={boldYellow}>≥</span> / <span className={boldYellow}>≤</span></p>
			</Alert>

			<FilterForm
				allPokemon={allPokemon}
				pokemonLoaded={pokemonLoaded}
				onSubmit={setFilteredPokemon}
				pokeAdj={pokeAdj}
			/>

			{filteredPokemon && 
				<Table
					filteredPokemon={filteredPokemon}
					adjustGen={(g, i) => setPokeAdj({...pokeAdj, gen:[g,i]})}
					adjustHeight={(h, i) => setPokeAdj({...pokeAdj, height:[h,i]})}
				/>
			}
		</main>
	);
}
