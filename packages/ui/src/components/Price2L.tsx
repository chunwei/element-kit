type TokenPrice = {
  token: { symbol: string; icon: string }
  price: number
  priceUsd: number
}
function Price2L(tokenPrice: TokenPrice) {
  const { token, price, priceUsd } = tokenPrice
  return (
    <div className="flex flex-col items-end justify-end space-y-1">
      <div className="flex items-center space-x-1">
        <img className="w-3 h-3" src={token.icon} alt={token.symbol} />
        <span>{price}</span>
      </div>
      <span className="text-muted-foreground text-sm">${priceUsd}</span>
    </div>
  )
}

export default Price2L
