import {FC, ReactNode} from "react"
import clsx from "clsx"

interface ButtonProps {
  className?: string
  children: ReactNode
}

export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  const buttonClassName = clsx(
    "h-8 flex justify-center items-center hover:bg-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed",
    className
  )
  return (
    <button type="button" className={buttonClassName} {...props}>
      {children}
    </button>
  )
}
