import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function HomeCategories() {
	return (
		<section className="flex flex-col gap-4">
			<div className="flex justify-between items-center gap-4">
				<h1 className="font-bold text-2xl">Categorias</h1>
				<Button type="button">
					<Plus className="size-5" />
					Nova Categoria
				</Button>
			</div>
			<div className="gap-4 grid grid-cols-4">Tabela</div>
		</section>
	);
}
