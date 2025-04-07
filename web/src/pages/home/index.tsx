import { HomeCategories } from "./_components/home-categories";
import { HomeDashboard } from "./_components/home-dashboard";
import { HomeMovements } from "./_components/home-movements";
import { HomeProducts } from "./_components/home-products";

export function Home() {
	return (
		<main className="flex flex-col gap-6 mx-auto p-4 max-w-7xl min-h-screen">
			<HomeDashboard />
			<HomeMovements />
			<HomeCategories />
			<HomeProducts />
		</main>
	);
}
