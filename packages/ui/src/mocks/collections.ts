import type { Collection } from '../types/collection'

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: '1',
    name: 'Bored Ape Yacht Club',
    slug: 'bored-ape-yacht-club',
    description: 'A collection of 10,000 unique Bored Ape NFTs',
    imageUrl: 'https://example.com/bayc.png',
    featuredImageUrl: 'https://example.com/bayc-featured.png',
    facebookUrl: 'https://facebook.com/boredapeyachtclub',
    contracts: [{
      blockChain: {
        chain: 'eth',
        chainId: '1'
      },
      address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
      alias: 'BAYC',
      category: 'PFP'
    }],
    isVerified: true,
    floorPrice: 30.5,
    volume: 500000,
    itemCount: 10000,
    ownerCount: 6000,
    createdAt: '2021-04-23T00:00:00.000Z',
    updatedAt: '2023-03-15T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Azuki',
    slug: 'azuki',
    description: 'Anime-inspired digital collectibles',
    imageUrl: 'https://example.com/azuki.png',
    featuredImageUrl: 'https://example.com/azuki-featured.png',
    facebookUrl: 'https://facebook.com/azuki',
    contracts: [{
      blockChain: {
        chain: 'eth',
        chainId: '1'
      },
      address: '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
      alias: 'AZUKI',
      category: 'PFP'
    }],
    isVerified: true,
    floorPrice: 15.7,
    volume: 300000,
    itemCount: 10000,
    ownerCount: 4800,
    createdAt: '2022-01-12T00:00:00.000Z',
    updatedAt: '2023-03-15T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'DeGods',
    slug: 'degods',
    description: 'A digital art collection built on multiple chains',
    imageUrl: 'https://example.com/degods.png',
    featuredImageUrl: 'https://example.com/degods-featured.png',
    facebookUrl: 'https://facebook.com/degods',
    contracts: [{
      blockChain: {
        chain: 'eth',
        chainId: '1'
      },
      address: '0x8821BeE2ba0dF28761AffF119D66390D594CD280',
      alias: 'DEGODS',
      category: 'PFP'
    }],
    isVerified: true,
    floorPrice: 35.8,
    volume: 520000,
    itemCount: 10000,
    ownerCount: 4800,
    createdAt: '2022-10-01T00:00:00.000Z',
    updatedAt: '2023-03-15T00:00:00.000Z'
  },
  {
    id: '4',
    name: 'Pudgy Penguins',
    slug: 'pudgy-penguins',
    description: 'A collection of 8,888 Pudgy Penguin NFTs',
    imageUrl: 'https://example.com/pudgy.png',
    featuredImageUrl: 'https://example.com/pudgy-featured.png',
    facebookUrl: 'https://facebook.com/pudgypenguins',
    contracts: [{
      blockChain: {
        chain: 'eth',
        chainId: '1'
      },
      address: '0xBd3531dA5CF5857e7CfAA92426877b022e612cf8',
      alias: 'PPG',
      category: 'PFP'
    }],
    isVerified: true,
    floorPrice: 6.9,
    volume: 120000,
    itemCount: 8888,
    ownerCount: 4500,
    createdAt: '2021-07-22T00:00:00.000Z',
    updatedAt: '2023-03-15T00:00:00.000Z'
  },
  {
    id: '5',
    name: 'Art Blocks',
    slug: 'art-blocks',
    description: 'Generative art on the blockchain',
    imageUrl: 'https://example.com/artblocks.png',
    featuredImageUrl: 'https://example.com/artblocks-featured.png',
    facebookUrl: 'https://facebook.com/artblocks',
    contracts: [{
      blockChain: {
        chain: 'eth',
        chainId: '1'
      },
      address: '0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270',
      alias: 'BLOCKS',
      category: 'Art'
    }],
    isVerified: true,
    floorPrice: 0.88,
    volume: 220000,
    itemCount: 15000,
    ownerCount: 8800,
    createdAt: '2021-01-21T00:00:00.000Z',
    updatedAt: '2023-03-15T00:00:00.000Z'
  }
] 