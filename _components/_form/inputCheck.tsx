const InputCheck = ({
	checked,
	name,
	onChange,
}:{
	checked: boolean;
	name: string;
	onChange: (e: any) => void;
}) => {
	return (
		<div className="group grid grid-cols-1">
			<input
				id={name}
				name={name}
				type="checkbox"
				onChange={onChange}
				className="col-start-1 row-start-1 self-center justify-self-center appearance-none aspect-square mx-1 border border-slate-200 bg-slate-50 rounded px-2 py-1 checked:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-800 disabled:text-slate-400"
				checked={checked}
			/>
			<svg viewBox="0 0 14 14" fill="none" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-white/25">
				<path d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-checked:opacity-100" />
				<path d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-indeterminate:opacity-100" />
			</svg>
		</div>
	)
}

export default InputCheck