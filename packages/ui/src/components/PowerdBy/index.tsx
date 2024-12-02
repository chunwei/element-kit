import { useElementKit } from '@/hooks/useElementKit'

// import {Lock} from 'lucide-react'
export function PoweredBy() {
  const { config } = useElementKit()
  const { hiddenPoweredByElement } = config ?? {}
  return hiddenPoweredByElement ? null : (
    <div className="ek-text-xs ek-flex ek-items-center ek-justify-center ek-gap-2 ek--mb-4">
      {/* <Lock size={8} /> */}
      <span className="ek-text-muted-foreground">Powered by </span>
      <img
        className="ek-w-3 ek-h-3"
        src="https://static.element.bid/resource/images/favicon-180.png"
      />
      <a
        className="hover:ek-text-primary"
        href="https://element.market/"
        target="_blank"
      >
        Element
      </a>
    </div>
  )
}
