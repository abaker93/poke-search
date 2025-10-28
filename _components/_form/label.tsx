const Label = ({ htmlFor, text }:{ htmlFor: string; text: string }) => {
	return (
		<label className="mx-1 text-slate-800 font-bold text-sm" htmlFor={htmlFor}>{text}</label>
	)
}

export default Label