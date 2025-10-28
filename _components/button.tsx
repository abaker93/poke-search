const Button = ({ children, color='primary', size='md', variant='filled' }:{ children: React.ReactNode; color?: 'primary', size?: 'sm' | 'md' | 'lg', variant?: 'filled' | 'outline' }) => {
	const colors = {
		'primary': {
			'filled': 'bg-indigo-700 hover:bg-indigo-900 focus:ring-indigo-300 text-white',
			'outline': 'border border-indigo-700 text-indigo-700 hover:bg-indigo-700 hover:text-white focus:ring-indigo-300',
		}
	}

	const sizes = {
		'sm': 'px-2 py-1 text-sm',
		'md': 'px-4 py-2',
		'lg': 'px-6 py-3 text-lg',
	}

	return (
		<button className={`${colors[color][variant]} ${sizes[size]} rounded-full transition`}>
			{children}
		</button>
	)
}

export default Button