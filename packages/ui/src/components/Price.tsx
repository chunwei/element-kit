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
    <div className="flex items-center space-x-1">
      <img className="w-4 h-4" src={token.icon} alt={token.symbol} />
      <span>{price}</span>
      {priceUsd && <span className="text-muted-foreground">(${priceUsd})</span>}
    </div>
  )
}

export default Price
