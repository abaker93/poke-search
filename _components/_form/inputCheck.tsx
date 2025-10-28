const InputCheck = ({ checked, disabled, name }:{ checked?: boolean; disabled?: boolean;name: string }) => {
	return (
		<input
			id={name}
			name={name}
			type="checkbox"
			className="mx-1 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-800 disabled:text-slate-400"
			{...checked	? { defaultChecked: true } : {}}
			{...disabled ? { disabled: true } : {}}
		/>
	)
}

export default InputCheck