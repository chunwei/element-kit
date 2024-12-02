type TokenPrice = {
  token?: { symbol: string; icon: string }
  price: number | string
  priceUsd?: number | string
}
function Price(tokenPrice: TokenPrice) {
  const {
    token = {
      symbol: 'ETH',
      icon: 'https://s.nfte.so/icon/currency/eth.svg'
    },
    price,
    priceUsd
  } = tokenPrice
  return (
    <div className="ek-flex ek-items-center ek-space-x-1">
      <img className="ek-w-4 ek-h-4" src={token.icon} alt={token.symbol} />
      <span>{price}</span>
      {priceUsd && <span className="ek-text-muted-foreground">(${priceUsd})</span>}
    </div>
  )
}

export default Price
