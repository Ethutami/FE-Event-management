export interface ICategory {
    id: number;
    category: string;
    path: string;
}

export interface ICategoryState {
    categories: ICategory[]
    loading: boolean
    error: string | null
}