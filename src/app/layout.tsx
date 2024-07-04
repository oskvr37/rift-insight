import type { Metadata, Viewport } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: dark)", color: "#06B6D4" },
		{ media: "(prefers-color-scheme: light)", color: "#0490A5" },
	],
	colorScheme: "dark light",
};

export const metadata: Metadata = {
	title: "Rift Insight",
	description: "Check League of Legends player stats and insights!",
};

const font = Exo_2({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={font.className}>
				<Header />
				{children}
				<footer className="lg:grid grid-cols-2">
					<div>
						<p className="text-sm font-light">&copy; 2024 Rift Insight</p>
						<p className="text-xs font-light dark:text-slate-300">
							Rift Insight is not endorsed by Riot Games and does not reflect
							the views or opinions of Riot Games or anyone officially involved
							in producing or managing League of Legends. League of Legends and
							Riot Games are trademarks or registered trademarks of Riot Games,
							Inc. League of Legends © Riot Games, Inc.
						</p>
					</div>
				</footer>
			</body>
		</html>
	);
}
