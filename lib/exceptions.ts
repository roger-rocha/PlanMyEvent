export class RequiresProPlanError extends Error {
  constructor(message = "Essa ação requer o plano Pro, pois já atingiu o limite de 3 eventos") {
    super(message)
  }
}
