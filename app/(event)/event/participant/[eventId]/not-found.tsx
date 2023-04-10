import {EmptyPlaceholder} from "@/components/empty-placeholder"

export default function NotFound() {
  return (
    <EmptyPlaceholder className="mx-auto max-w-[800px]">
      <EmptyPlaceholder.Icon name="warning" />
      <EmptyPlaceholder.Title>Oops! Não Encontrado</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        Não foi possível encontrar esse evento. Entre em contato com quem te enviou esse link.
      </EmptyPlaceholder.Description>
    </EmptyPlaceholder>
  )
}
