export const findNameByLanguage = (names: any[], language: string = 'en') => {
	const nameObj = names.find(n => n.language.name === language);
	return nameObj ? nameObj.name : null;
}

export const findGenByVerGroup = (vg: string) => {
	const verGroups: Record<string, number> = {
		'red-green-japan': 1,
		'blue-japan': 1,
		'red-blue': 1,
		'yellow': 1,
		'gold-silver': 2,
		'crystal': 2,
		'ruby-sapphire': 3,
		'emerald': 3,
		'firered-leafgreen': 3,
		'diamond-pearl': 4,
		'platinum': 4,
		'heartgold-soulsilver': 4,
		'black-white': 5,
		'colosseum': 5,
		'xd': 5,
		'black-2-white-2': 5,
		'x-y': 6,
		'omega-ruby-alpha-sapphire': 6,
		'sun-moon': 7,
		'ultra-sun-ultra-moon': 7,
		'lets-go-pikachu-lets-go-eevee': 7,
		'sword-shield': 8,
		'the-isle-of-armor': 8,
		'the-crown-tundra': 8,
		'brilliant-diamond-and-shining-pearl': 8,
		'legends-arceus': 8,
		'scarlet-violet': 9,
		'the-teal-mask': 9,
		'the-indigo-disk': 9,
		'legends-za': 10,
	}

	return verGroups[vg]
}

export const findGenFullName = (n: number) => {
	const gens: Record<number, string> = {
		1: 'Generation I',
		2: 'Generation II',
		3: 'Generation III',
		4: 'Generation IV',
		5: 'Generation V',
		6: 'Generation VI',
		7: 'Generation VII',
		8: 'Generation VIII',
		9: 'Generation IX',
		10: 'Generation X',
	}

	return gens[n]
}