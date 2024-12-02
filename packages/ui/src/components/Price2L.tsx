type TokenPrice = {
  token: { symbol: string; icon: string }
  price: number | string
  priceUsd: number | string
}
function Price2L(tokenPrice: TokenPrice) {
  const { token, price, priceUsd } = tokenPrice
  return (
    <div className="ek-flex ek-flex-col ek-items-end ek-justify-end ek-space-y-1">
      <div className="ek-flex ek-items-center ek-space-x-1">
        <img className="ek-w-4 ek-h-4" src={token.icon} alt={token.symbol} />
        <span>{price}</span>
      </div>
      <span className="ek-text-muted-foreground ek-text-sm">${priceUsd}</span>
    </div>
  )
}

export default Price2L
