import { ReactNode } from 'react'

const Label = ({
	children,
	htmlFor,
	text
}: {
	children?: ReactNode;
	htmlFor:string;
	text?:string
}) => {
	return (
		<label className="mx-1 text-slate-800 font-bold text-sm" htmlFor={htmlFor}>
			{text}
			{children}
		</label>
	)
}

export default Label