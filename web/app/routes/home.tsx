import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
	return [{ title: "Início | Fashion Stock" }];
}

export default function Home() {
	return (
		<main>
			<h1>Fashion Stock</h1>
		</main>
	);
}
