import { abbr } from '@/lib/address'
import KeyValueLine from './KeyValueLine'

type Props = {
  contractAddress: string
  items: number
  owners: number
  royalty: number
}

function CollectionStatsBase({
  contractAddress,
  items,
  owners,
  royalty
}: Props) {
  return (
    <div className="flex flex-col space-y-2  my-4">
      <KeyValueLine
        k="Contract Address"
        v={abbr(contractAddress)}
      ></KeyValueLine>
      <KeyValueLine k="Items" v={items}></KeyValueLine>
      <KeyValueLine k="Owners" v={owners}></KeyValueLine>
      <KeyValueLine k="Royalty" v={royalty}></KeyValueLine>
    </div>
  )
}

export default CollectionStatsBase
