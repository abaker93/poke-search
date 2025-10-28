const InputText = ({ disabled, name }:{ disabled?: boolean;name: string }) => {
	return (
		<input
			id={name}
			name={name}
			type="text"
			className="mx-1 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-800 disabled:text-slate-400"
			{...disabled ? { disabled: true } : {}}
		/>
	)
}

export default InputText