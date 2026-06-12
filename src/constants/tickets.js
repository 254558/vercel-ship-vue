export const TICKET_ORIGINAL_PRICE = 250
export const TICKET_SALE_PRICE = 125

export function formatPrice(amount, suffix = '') {
  return `$${amount.toFixed(2)}${suffix}`
}
