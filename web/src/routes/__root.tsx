import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { queryClient } from "@/libs/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
	component: RootLayout,
	notFoundComponent: NotFound,
});

function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<Navbar />
			<main className="flex flex-col gap-4 mx-auto p-4 max-w-7xl min-h-screen">
				<Outlet />
			</main>
			<Footer />
			<ReactQueryDevtools buttonPosition="bottom-right" />
			<TanStackRouterDevtools position="bottom-left" />
		</QueryClientProvider>
	);
}

function NotFound() {
	return (
		<section className="flex flex-col flex-1 justify-center items-center gap-2">
			<h1 className="font-bold text-primary text-8xl">404</h1>
			<h2 className="font-semibold text-4xl">Página não encontrada</h2>
			<p className="text-muted-foreground text-2xl">
				A página que você está tentando acessar provavelmente foi alterada ou
				removida.
			</p>
			<Button asChild>
				<Link to="/">Retornar ao Início</Link>
			</Button>
		</section>
	);
}
