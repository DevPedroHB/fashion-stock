import { Link } from "./ui/link";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="flex justify-center items-center bg-card border-t h-16 text-card-foreground">
			<h2>
				&copy; {currentYear} <Link to="/">FashionStock</Link> - Todos os
				direitos reservados
			</h2>
		</footer>
	);
}
