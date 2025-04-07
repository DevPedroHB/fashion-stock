import {
	type UpsertCategorySchema,
	upsertCategorySchema,
} from "@/types/schemas/upsert-category";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";
import { Textarea } from "./ui/textarea";

interface ICategoryForm extends ComponentProps<typeof SheetTrigger> {}

export function CategoryForm(props: ICategoryForm) {
	const form = useForm<UpsertCategorySchema>({
		resolver: zodResolver(upsertCategorySchema),
	});

	function handleUpsertCategory(data: UpsertCategorySchema) {
		console.log(data);
	}

	return (
		<Sheet>
			<SheetTrigger {...props} />
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Criar categoria</SheetTitle>
					<SheetDescription>
						Crie uma nova categoria para organizar seus produtos.
					</SheetDescription>
				</SheetHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleUpsertCategory)}
						className="flex flex-col gap-4 px-4"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input placeholder="Insira o nome" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descrição</FormLabel>
									<FormControl>
										<Textarea placeholder="Insira a descrição" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Criar</Button>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}
