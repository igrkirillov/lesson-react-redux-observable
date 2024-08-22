export type Service = {
    id: number,
    name: string,
    price: number,
    content: string
}

export type DetailInfo = {
    id: number,
    name: string
}

type FetchingDataState = {
    loading: boolean,
    error: Error | null,
}

export type ServicesState  = FetchingDataState & {
    services: Service[]
}

export type DetailsState = FetchingDataState & {
    detailInfo: DetailInfo
}