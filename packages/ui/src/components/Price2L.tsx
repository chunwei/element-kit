type TokenPrice = {
  token: { symbol: string; icon: string }
  price: number | string
  priceUsd: number | string
}
function Price2L(tokenPrice: TokenPrice) {
  const { token, price, priceUsd } = tokenPrice
  return (
    <div className="flex flex-col items-end justify-end space-y-1">
      <div className="flex items-center space-x-1">
        <img className="w-4 h-4" src={token.icon} alt={token.symbol} />
        <span>{price}</span>
      </div>
      <span className="text-muted-foreground text-sm">${priceUsd}</span>
    </div>
  )
}

export default Price2L
