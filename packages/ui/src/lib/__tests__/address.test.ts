import { describe, it, expect } from 'vitest'
import { abbr } from '../address'

describe('address abbr', () => {
  it('应该正确缩写以太坊地址', () => {
    const address = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
    expect(abbr(address)).toBe('0x742d...f44e')
  })

  it('处理空地址应该返回空字符串', () => {
    expect(abbr('')).toBe('')
  })

  it('处理 null 或 undefined 应该返回原值', () => {
    expect(abbr(null as any)).toBe(null)
    expect(abbr(undefined as any)).toBe(undefined)
  })

  it('处理短地址应该返回原地址', () => {
    const shortAddress = '0x1234'
    expect(abbr(shortAddress)).toBe(shortAddress)
  })

  it('处理正好 10 个字符的地址应该返回原地址', () => {
    const address = '0x12345678'
    expect(abbr(address)).toBe(address)
  })

  it('应该正确处理不同长度的有效以太坊地址', () => {
    const addresses = [
      '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // vitalik.eth
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
      '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D' // Uniswap V2 Router
    ]

    addresses.forEach((address) => {
      const abbreviated = abbr(address)
      expect(abbreviated).toMatch(/^0x[a-fA-F0-9]{4}\.{3}[a-fA-F0-9]{4}$/)
      expect(abbreviated.length).toBe(13) // 0x + 4 + ... + 4 = 13
    })
  })
}) 