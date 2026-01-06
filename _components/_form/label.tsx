import { ReactNode } from 'react'

const Label = ({
	children,
	className,
	htmlFor,
	text,
	...props
}: {
	children?: ReactNode;
	className?: any;
	htmlFor:string;
	text?:string
}) => {
	return (
		<label className={`mx-1 text-slate-800 font-bold text-sm${className}`} htmlFor={htmlFor} {...props}>
			{text}
			{children}
		</label>
	)
}

export default Label