import { Card } from "@/components/ui/card";
import { CARD_DIRECTION, dashboardCard } from "@/constants/dashboard-card";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUp } from "lucide-react";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<section className="flex flex-col gap-4">
			<h1 className="font-bold text-2xl">Dashboard</h1>
			<div className="gap-4 grid grid-cols-4">
				{dashboardCard.map((card) => {
					const Icon = card.icon;

					return (
						<Card key={card.title} className="gap-4 p-6">
							<div className="flex gap-2">
								<div className="flex-1">
									<p className="text-muted-foreground text-sm">{card.title}</p>
									<h2 className="font-bold text-3xl">{card.value}</h2>
								</div>
								<div className="flex justify-center items-center bg-primary rounded-full size-10 text-primary-foreground">
									<Icon className="size-5" />
								</div>
							</div>
							<div className="flex items-center gap-1 text-primary">
								{card.direction === CARD_DIRECTION.UP ? (
									<ArrowUp className="size-4" />
								) : (
									<ArrowDown className="size-4" />
								)}
								<span>{card.description}</span>
							</div>
						</Card>
					);
				})}
			</div>
		</section>
	);
}
