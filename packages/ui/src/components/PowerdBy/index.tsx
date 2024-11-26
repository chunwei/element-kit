import {Lock} from 'lucide-react'
export function PoweredBy(){
    return (
      <div className="text-xs  flex items-center justify-center gap-2 -mb-4">
        <Lock size={8} />
        <span className="text-muted-foreground">Powered by </span>
        <img
          className="w-3 h-3"
          src="https://static.element.bid/resource/images/favicon-180.png"
        />
        <a
          className="hover:text-primary"
          href="https://element.market/"
          target="_blank"
        >
          Element
        </a>
      </div>
    )
}