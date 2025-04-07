import { navbarLinks } from "@/constants/navbar-links";
import { Shirt, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Navbar() {
	return (
		<header className="bg-card border-b h-16 text-card-foreground">
			<nav className="flex justify-between items-center gap-4 mx-auto px-4 max-w-7xl h-full">
				<div className="flex items-center gap-2 text-primary">
					<Shirt className="fill-primary size-6" />
					<a href="/" className="font-bold text-xl">
						FashionStock
					</a>
				</div>
				<ul className="flex flex-1 justify-center gap-4">
					{navbarLinks.map((link) => {
						return (
							<li key={link.path}>
								<a
									href={link.path}
									className="font-medium hover:text-primary transition-all"
								>
									{link.label}
								</a>
							</li>
						);
					})}
				</ul>
				<div className="flex items-center gap-4">
					<a
						href="/"
						className="flex items-center gap-2 font-medium hover:text-primary transition-all"
					>
						<Avatar className="size-6">
							<AvatarImage
								src="https://github.com/DevAraujo128.png"
								alt="DevAraujo128"
							/>
							<AvatarFallback>
								<User2 className="size-4" />
							</AvatarFallback>
						</Avatar>
						Entrar
					</a>
				</div>
			</nav>
		</header>
	);
}
