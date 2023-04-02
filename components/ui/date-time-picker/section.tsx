import { FC, ReactNode } from "react"
import clsx from "clsx"

interface SectionProps {
  className?: string
  children?: ReactNode
}

export const Section: FC<SectionProps> = ({ className, children }) => {
  const sectionClassName = clsx("w-58", className)
  return <section className={sectionClassName}>{children}</section>
}
