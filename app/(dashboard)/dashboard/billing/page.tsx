import {redirect} from "next/navigation"

import {authOptions} from "@/lib/auth"
import {getCurrentUser} from "@/lib/session"
import {stripe} from "@/lib/stripe"
import {getUserSubscriptionPlan} from "@/lib/subscription"
import {BillingForm} from "@/components/billing-form"
import {DashboardHeader} from "@/components/header"
import {DashboardShell} from "@/components/shell"

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
      </div>
    </DashboardShell>
  )
}
