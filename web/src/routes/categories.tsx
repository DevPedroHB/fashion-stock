import { CategoryForm } from "@/components/category-form";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/categories")({
	component: Categories,
});

function Categories() {
	return (
		<section className="flex flex-col gap-4">
			<div className="flex justify-between items-center gap-4">
				<h1 className="font-bold text-2xl">Categorias</h1>
				<CategoryForm asChild>
					<Button type="button">Criar categoria</Button>
				</CategoryForm>
			</div>
			<div>Tabela da categorias</div>
		</section>
	);
}
