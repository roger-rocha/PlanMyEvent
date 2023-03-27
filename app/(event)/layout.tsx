interface EventProps {
  children?: React.ReactNode
}

export default function EventLayout({ children }: EventProps) {
  return (
    <div className="container mx-auto grid items-start gap-10 py-8">
      {children}
    </div>
  )
}
