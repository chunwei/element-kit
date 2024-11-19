type TokenPrice = {
  token: { symbol: string; icon: string }
  price: number
  priceUsd: number
}
function Price(tokenPrice: TokenPrice) {
  const { token, price, priceUsd } = tokenPrice
  return (
    <div className="flex items-center space-x-1">
      <img className="w-3 h-3" src={token.icon} alt={token.symbol} />
      <span>{price}</span>
      <span className="text-muted-foreground">(${priceUsd})</span>
    </div>
  )
}

export default Price
