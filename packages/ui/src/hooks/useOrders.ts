import useSWR from 'swr'
import { ElementKitContext } from '@/context'
import { useContext, useRef } from 'react'
import { Order, OrdersParams, OrdersResponse } from '@/types/order'

interface UseOrdersOptions {
  disabled?: boolean
}

export function useOrders(
  params: OrdersParams,
  options: UseOrdersOptions = {}
) {
  const context = useContext(ElementKitContext)
  const accumulatedOrders = useRef<Order[]>([])

  if (!context) throw new Error('ElementKitContext 未提供')

  const {
    chain = 'eth',
    side = '1',
    limit = 20,
    offset = 0,
    direction = 'asc',
    order_by = 'base_price',
    ...restParams
  } = params

  const queryParams: Record<string, string> = {
    chain,
    side,
    limit: `${limit}`,
    offset: `${offset}`,
    direction,
    order_by,
    ...Object.entries(restParams).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value)
        }
        return acc
      },
      {} as Record<string, string>
    )
  }

  const queryString = new URLSearchParams(queryParams).toString()

  const { /* data, */ error, isLoading, mutate } = useSWR<OrdersResponse>(
    options.disabled
      ? null
      : [`/v1/orders/list?${queryString}`, context.config?.apiKey],
    null,
    {
      onSuccess: (newData) => {
        if (offset === 0) {
          accumulatedOrders.current = newData.data.orders
        } else {
          accumulatedOrders.current = [
            ...accumulatedOrders.current,
            ...newData.data.orders
          ]
        }
      }
    }
  )

  return {
    orders: accumulatedOrders.current,
    isLoading,
    isError: error,
    mutate
  }
}
