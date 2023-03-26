import { SubscriptionPlan } from "types"

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "O plano Free é limitado a apenas 3 eventos. Faça o upgrade pro plano Pro para ter eventos ilimitados.",
  stripePriceId: "",
}

export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description: "O plano Pro tem eventos ilimitados.",
  stripePriceId: process.env.STRIPE_PRO_MONTHLY_PLAN_ID || "",
}
