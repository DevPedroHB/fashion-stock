export enum OrderStatus {
	PENDING = "PENDING",
	PROCESSING = "PROCESSING",
	COMPLETED = "COMPLETED",
	CANCELED = "CANCELED",
}

export interface Order {
	id: string;
	status: OrderStatus;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
}
