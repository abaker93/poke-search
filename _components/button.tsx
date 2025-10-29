const Button = ({
	children,
	color='primary',
	disabled,
	onClick,
	size='md',
	variant='filled',
	...props
}:{
	children: React.ReactNode;
	color?: 'primary',
	disabled?: boolean,
	onClick?: (e: any) => void,
	size?: 'sm' | 'md' | 'lg',
	variant?: 'filled' | 'outline',
}) => {
	const colors = {
		'primary': {
			'filled': 'border border-indigo-700 bg-indigo-700 hover:bg-indigo-900 hover:border-indigo-900 focus:ring-indigo-300 text-white disabled:bg-indigo-200 disabled:border-indigo-200 disabled:cursor-not-allowed',
			'outline': 'border border-indigo-700 text-indigo-700 hover:bg-indigo-700 hover:border-indigo-700 hover:text-white focus:ring-indigo-300',
		}
	}

	const sizes = {
		'sm': 'px-2 py-1 text-sm',
		'md': 'px-4 py-2',
		'lg': 'px-6 py-3 text-lg',
	}

	return (
		<button className={`${colors[color][variant]} ${sizes[size]} rounded-full transition`} onClick={onClick} disabled={disabled} {...props}>
			{children}
		</button>
	)
}

export default Button