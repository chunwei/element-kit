import { Button, BuyModal, useCollections } from '@element-kit/ui'
import { useState } from 'react'

function Collections() {
  const [limit, setLimit] = useState(5)
  const [sortBy, setSortBy] = useState<
    'floorPrice' | 'volumeTraded' | 'createdAt'
  >('floorPrice')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const { collections, isLoading, error, totalCount, refresh } = useCollections(
    {
      limit,
      sortBy,
      sortDirection
    }
  )

  //   if (isLoading) return <div>Loading collections...</div>
  //   if (isEmpty) return <div>No collections found</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h2>NFT Collections ({totalCount} total)</h2>

      {/* 工具栏 */}
      <div
        className="border rounded-md"
        style={{
          // border: 'solid 1px #f5f5f5',
          // borderRadius: '8px',
          margin: '20px',
          display: 'flex',
          gap: '20px',
          padding: '8px 20px',
          alignItems: 'center'
        }}
      >
        <div>
          <label>每页显示：</label>
          <input
            type="number"
            value={limit}
            min={1}
            max={totalCount}
            onChange={(e) => setLimit(Number(e.target.value))}
            style={{ width: '60px', marginLeft: '8px' }}
          />
        </div>

        <div>
          <label>排序：</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            style={{ marginLeft: '8px' }}
          >
            <option value="floorPrice">地板价</option>
            <option value="volumeTraded">交易量</option>
            <option value="createdAt">创建时间</option>
          </select>
        </div>

        <div>
          <label>排序方向：</label>
          <select
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value as 'asc' | 'desc')}
            style={{ marginLeft: '8px' }}
          >
            <option value="desc">降序</option>
            <option value="asc">升序</option>
          </select>
        </div>

        <Button variant={'secondary'} onClick={refresh}>
          刷新
        </Button>
      </div>

      {/* 集合列表 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '20px',
          padding: '20px'
        }}
      >
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="border rounded-md"
                style={{
                  // border: '1px solid #eee',
                  // borderRadius: '8px',
                  padding: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div>Refresh collections from server</div>
                <div>Loading ...</div>
              </div>
            ))
          : collections.map((collection) => (
              <div
                key={collection.id}
                className="border rounded-md"
                style={{
                  // border: '1px solid #eee',
                  // borderRadius: '8px',
                  padding: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <h3 style={{ margin: 0 }}>{collection.name}</h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    color: '#666',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {collection.description}
                </p>
                <div style={{ fontSize: '14px' }}>
                  <strong>Floor:</strong> {collection.floorPrice} ETH
                </div>
                <div style={{ fontSize: '14px' }}>
                  <strong>Volume:</strong> {collection.volumeTraded} ETH
                </div>
                <div style={{ fontSize: '14px' }}>
                  <strong>Items:</strong> {collection.itemCount}
                </div>
                <div style={{ fontSize: '14px' }}>
                  <strong>Owners:</strong> {collection.ownerCount}
                </div>
                <BuyModal trigger={<Button>Buy Now</Button>} />
              </div>
            ))}
      </div>
    </div>
  )
}

export default Collections
