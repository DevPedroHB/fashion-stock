import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import type { ComponentProps } from "react";

interface IMovementsForm extends ComponentProps<typeof SheetTrigger> {}

export function MovementsForm(props: IMovementsForm) {
	return (
		<Sheet>
			<SheetTrigger {...props} />
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Nova Movimentação</SheetTitle>
					<SheetDescription>
						Adicione uma nova movimentação ao seu sistema.
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
