const InputNumber = ({
	defaultValue = 0,
	disabled,
	min,
	max,
	name
} : {
	defaultValue?: number;
	disabled?: boolean;
	min?: number;
	max?: number;
	name: string
}) => {
	return (
		<input
			id={name}
			name={name}
			{...min !== undefined ? { min: min } : {}}
			{...max !== undefined ? { max: max } : {}}
			defaultValue={defaultValue}
			type="number"
			className="mx-1 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-800 disabled:text-slate-400"
			{...disabled ? { disabled: true } : {}}
		/>
	)
}

export default InputNumber