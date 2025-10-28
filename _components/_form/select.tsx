const Select = ({
	defaultValue,
	disabled,
	name,
	options
} : {
	defaultValue?: string;
	disabled?: boolean;
	name: string;
	options: { value: string; label: string }[];
}) => {
	return (
		<select
			id={name}
			name={name}
			{...defaultValue ? { defaultValue: defaultValue } : {}}
			className="mx-1 border border-slate-200 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-800 disabled:text-slate-400"
			{...disabled ? { disabled: true } : {}}
		>
			{options.map((o, i) => (
				<option key={i} value={o.value}>{o.label}</option>
			))}
		</select>
	)
}

export default Select