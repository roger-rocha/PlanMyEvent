"use client"

import * as React from "react"
import {toast} from "@/hooks/use-toast"

import {UserSubscriptionPlan} from "types"
import {cn, formatDate} from "@/lib/utils"
import {Icons} from "@/components/icons"
import {buttonVariants} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan & {
    isCanceled: boolean
  }
}

export function BillingForm({
  subscriptionPlan,
  className,
  ...props
}: BillingFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(!isLoading)

    // Get a Stripe session URL.
    const response = await fetch("/api/users/stripe")

    if (!response?.ok) {
      return toast({
        title: "Ops aconteceu algum erro.",
        description: "Por favor recarregue a página e tente novamente.",
        variant: "destructive",
      })
    }

    // Redirect to the Stripe session.
    // This could be a checkout page for initial upgrade.
    // Or portal to manage existing subscription.
    const session = await response.json()
    if (session) {
      window.location.href = session.url
    }
  }

  return (
    <form className={cn(className)} onSubmit={onSubmit} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Plan</CardTitle>
          <CardDescription>
            Você está atualmente no plano <strong>{subscriptionPlan.name}</strong>{"."}
          </CardDescription>
        </CardHeader>
        <CardContent>{subscriptionPlan.description}</CardContent>
        <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {subscriptionPlan.isPro ? "Manage Subscription" : "Assinar Pro"}
          </button>
          {subscriptionPlan.isPro ? (
            <p className="rounded-full text-xs font-medium">
              {subscriptionPlan.isCanceled
                ? "Seu plano será cancelado em "
                : "Seu plano renova em "}
              {formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.
            </p>
          ) : null}
        </CardFooter>
      </Card>
    </form>
  )
}
