export function validateTradeAmount(amount: number, balance: number): boolean {
  return amount > 0 && amount <= balance;
}

export function validateQuantity(quantity: number): boolean {
  return quantity > 0 && Number.isInteger(quantity);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}