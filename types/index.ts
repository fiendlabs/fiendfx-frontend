export type Transaction = {
    id: string
    amount: number
    status: 'pending' | 'success' | 'failed'
    timestamp: number
    address: string
}

export type Deposit = {
    id: string
    asset: string
    amount: number
    value: number
}


export type TokenObject = {
    label: string
    symbol: string
    value: string
}

// Extend TokenObject with an additional fields of engine and address
export type Token = TokenObject & {
    engine: string
    address: string
    state: 'coming soon' | 'active' | 'inactive'
}

// Mint token object should be the same as TokenObject with an additional field of engine
export type MintTokenObject = TokenObject & {
    engine: string
}