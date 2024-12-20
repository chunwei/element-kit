export function abbr(address: string) {
  if (!address || address.length < 11) return address
  return address.slice(0, 6) + '...' + address.slice(-4)
}
