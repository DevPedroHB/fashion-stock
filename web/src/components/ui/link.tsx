import { cn } from "@/functions/cn";
import {
	type LinkComponentProps,
	Link as ReactRouterLink,
} from "@tanstack/react-router";

interface ILink extends LinkComponentProps {}

export function Link({ className, ...props }: ILink) {
	return (
		<ReactRouterLink
			className={cn(
				"font-medium transition-all",
				"hover:text-primary",
				className,
			)}
			{...props}
		/>
	);
}
