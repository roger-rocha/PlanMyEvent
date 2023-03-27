import { FC, ReactNode } from "react"
import clsx from "clsx"

interface SectionHeaderProps {
  className?: string
  children?: ReactNode
}

export const SectionHeader: FC<SectionHeaderProps> = ({
  className,
  children,
}) => {
  const headerClassName = clsx(
    "flex flex-row gap-4 justify-center mb-2 ",
    className
  )
  return <header className={headerClassName}>{children}</header>
}
