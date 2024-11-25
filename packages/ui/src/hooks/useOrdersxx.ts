import { ElementKitContext } from '@/context'
import { ElementSDK, ethers, Network, Order } from 'element-js-sdk'
import { useContext, useEffect, useState } from 'react'

interface Params {
  contractAddress: string
}
export function useOrders(params: Params) {
  const context = useContext(ElementKitContext)

  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (!context?.config?.apiKey) throw new Error('ElementKitContext 未提供')

    const fetchOrders = async () => {
      const signerOrProvider = new ethers.providers.Web3Provider(window.ethereum)
      const sdk = new ElementSDK({
        networkName: Network.ETH,
        isTestnet: false,
        apiKey: context.config.apiKey!,
        signer: signerOrProvider
      })

      const orders = await sdk.queryOrders({
        asset_contract_address: params.contractAddress
      })
      setOrders(orders)
    }

    fetchOrders().catch(console.error)
  }, [context?.config?.apiKey, params.contractAddress])

  return {
    orders
  }
}
