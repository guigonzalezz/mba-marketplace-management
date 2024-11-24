export function priceToCents(price: string): number {
  const formattedPrice = price.replace(/\./g, "").replace(",", ".");
  return parseFloat(formattedPrice) * 100;
}

export function centsToPrice(cents: number): string {
  return (cents / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
  });
}
