export interface IProduct{
    id: string;
    name: string;
    price: number | null;
    priceReduce: number | null;
    image: string;
    date: Date;
}