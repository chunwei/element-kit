import { useContext } from 'react'
import { ElementKitContext } from '../context/ElementKitProvider'

export function useElementKit() {
  const context = useContext(ElementKitContext)
  if (!context) {
    throw new Error('useElementKit must be used within an ElementKitProvider')
  }
  return context
}