import { MouseEvent, useRef, useState } from 'react'

export const useCheckLongPress = () => {
	const [isLongPress, setIsLongPress] = useState(false)

	const timerRef = useRef<any>(null)
	const longPress = useRef<any>(false)

	const startPressTimer = () => {
		longPress.current = false
		setIsLongPress(false)
		timerRef.current = window.setTimeout(() => {
			longPress.current = true
			setIsLongPress(true)
		}, 500)
	}

	const handleOnClick = (e:MouseEvent) => {
		if (longPress.current) return
	}

	const handleOnMouseDown = () => {
		startPressTimer()
	}

	const handleOnMouseUp = () => {
		if (timerRef.current !== null) {
			clearTimeout(timerRef.current)
		}
	}

	const handleOnTouchStart = () => {
		startPressTimer()
	}

	const handleOnTouchEnd = () => {
		if (longPress.current) return
		if (timerRef.current !== null) {
			clearTimeout(timerRef.current)
		}
	}

	return {
		isLongPress,
		handlers: {
			onClick: handleOnClick,
			onMouseDown: handleOnMouseDown,
			onMouseUp: handleOnMouseUp,
			onTouchStart: handleOnTouchStart,
			onTouchEnd: handleOnTouchEnd,
		}
	} 
}