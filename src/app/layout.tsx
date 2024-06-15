import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Rift Insight",
	description: "Check League of Legends player stats and insights!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
