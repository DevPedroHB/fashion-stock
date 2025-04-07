import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MovementsForm } from "./movements-form";

export function HomeMovements() {
	return (
		<section className="flex flex-col gap-4">
			<div className="flex justify-between items-center gap-4">
				<h1 className="font-bold text-2xl">Movimentações Recentes</h1>
				<MovementsForm asChild>
					<Button type="button">
						<Plus className="size-5" />
						Nova Movimentação
					</Button>
				</MovementsForm>
			</div>
			<div className="gap-4 grid grid-cols-4">
				Tabela Movimentações Recentes
			</div>
		</section>
	);
}
