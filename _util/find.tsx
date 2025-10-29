export const findNameByLanguage = (names: any[], language: string) => {
	const nameObj = names.find(n => n.language.name === language);
	return nameObj ? nameObj.name : null;
}