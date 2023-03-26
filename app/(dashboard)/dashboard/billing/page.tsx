import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { stripe } from "@/lib/stripe"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { BillingForm } from "@/components/billing-form"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { Card } from "@/components/ui/card"

export const metadata = {
  title: "Planos",
  description: "Gerencie o seu plano",
}

export default async function BillingPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id)

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false
  if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.stripeSubscriptionId
    )
    isCanceled = stripePlan.cancel_at_period_end
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Planos"
        text="Gerencie o seu plano e assinatura."
      />
      <div className="grid gap-10">
        <BillingForm
          subscriptionPlan={{
            ...subscriptionPlan,
            isCanceled,
          }}
        />
        <Card>
          <Card.Header>
            <Card.Title>Nota</Card.Title>
          </Card.Header>
          <Card.Content className="space-y-4 pb-6 text-sm">
            <p>
              Plan my Event é um app demo usando o ambiente de teste do Stripe.{" "}
              <strong>
                Você pode testar fazer o upgrade de plano e não será cobrado.
              </strong>
            </p>
            <p>
             Você pode achar uma lista de números de cartão para testar na {" "}
              <a
                href="https://stripe.com/docs/testing#cards"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-8"
              >
                documentação do Stripe
              </a>
              .
            </p>
          </Card.Content>
        </Card>
      </div>
    </DashboardShell>
  )
}
