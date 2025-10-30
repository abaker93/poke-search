const InputNumber = ({
	disabled,
	min,
	max,
	name,
	onChange,
	step='any',
	value,
} : {
	disabled?: boolean;
	min?: number;
	max?: number;
	name: string;
	onChange: (e: any) => void;
	step?: string;
	value: number;
}) => {
	return (
		<input
			id={name}
			name={name}
			min={min}
			max={max}
			value={value}
			onChange={onChange}
			step={step}
			type="number"
			className="mx-1 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-800 disabled:text-slate-400"
			{...disabled ? { disabled: true } : {}}
		/>
	)
}

export default InputNumber