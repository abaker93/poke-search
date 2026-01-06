


const Alert = ({
	children,
	icon,
	...props
}:{
	children: React.ReactNode;
	icon: string;
}) => {
	return (
		<div className="bg-indigo-900 flex gap-3 items-center p-7 text-indigo-100 rounded-3xl shadow-lg max-w-4xl mx-auto mb-10">
			<div className="text-3xl">{icon}</div>
			<div>{children}</div>
		</div>
	)
}

export default Alert