export interface Product {
	id: string;
	name: string;
	description: string | null;
	price: number;
	inventory: number;
	categoryId: number;
}
