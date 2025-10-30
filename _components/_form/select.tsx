const Select = ({
	disabled,
	name,
	onChange,
	options,
	value
} : {
	disabled?: boolean;
	name: string;
	onChange: (e: any) => void;
	options: { disabled?: boolean; label: string; value: string; }[];
	value: string;
}) => {
	return (
		<select
			id={name}
			name={name}
			value={value}
			onChange={onChange}
			className="mx-1 border border-slate-200 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-800 disabled:text-slate-400"
			disabled={disabled}
		>
			{options.map((o, i) => (
				<option key={i} value={o.value} disabled={o.disabled}>{o.label}</option>
			))}
		</select>
	)
}

export default Select