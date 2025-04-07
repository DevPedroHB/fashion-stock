import {
	ArrowLeftRight,
	DollarSign,
	Package,
	TriangleAlert,
} from "lucide-react";

export enum CARD_DIRECTION {
	UP = "up",
	DOWN = "down",
}

export const dashboardCard = [
	{
		title: "Total de Produtos",
		value: "1,247",
		icon: Package,
		description: "12% em relação ao mês anterior",
		direction: CARD_DIRECTION.UP,
	},
	{
		title: "Estoque Baixo",
		value: "28",
		icon: TriangleAlert,
		description: "5 novos itens desde ontem",
		direction: CARD_DIRECTION.UP,
	},
	{
		title: "Valor em Estoque",
		value: "R$ 156.300",
		icon: DollarSign,
		description: "8% em relação ao mês anterior",
		direction: CARD_DIRECTION.UP,
	},
	{
		title: "Movimentações (hoje)",
		value: "42",
		icon: ArrowLeftRight,
		description: "3% em relação a ontem",
		direction: CARD_DIRECTION.DOWN,
	},
] as const;
