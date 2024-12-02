import useSWR from 'swr'
import { EncodeParams, EncodeResponse } from '@/types/encode'
import { useElementKit } from './useElementKit'

interface UseEncodeOptions {
  disabled?: boolean
}
/**
 * Encode order by order id(s)
 * Usage example:
 * ```typescript
 * const { encodeData, isLoading, isError, mutate } = useEncode({
      chain: 'eth',
      taker: '0x1234...', 
      orderIdList: [{
        orderId: '123',
        takeCount: 1,
        tokenId: '456' // optional
      }]
    });
```
 */
export function useEncode(
  params: EncodeParams,
  options: UseEncodeOptions = {}
) {
  const context = useElementKit()

  if (!context) throw new Error('ElementKitContext not provided')

  const { chain, taker, orderIdList } = params

  // Prepare the request body
  const requestBody = {
    chain,
    taker,
    orderIdList: orderIdList.map((order) => ({
      orderId: order.orderId,
      takeCount: order.takeCount,
      ...(order.tokenId && { tokenId: order.tokenId })
    }))
  }

  // Create a cache key based on the parameters
  const cacheKey = options.disabled
    ? null
    : {
        apiKey: context.config?.apiKey,
        url: '/v1/orders/encodeTradeDataByOrderId',
        method: 'POST',
        data: requestBody
      }

  const { data, error, isLoading, mutate } = useSWR<EncodeResponse>(
    cacheKey,
    null,
    {
      revalidateOnFocus: false, // Don't revalidate on window focus since encode data is time-sensitive
      dedupingInterval: 3600000 // 1 hour, matching the oracle signature validity period
    }
  )

  return {
    encodeData: data?.data,
    isLoading,
    isError: error,
    mutate
  }
}
