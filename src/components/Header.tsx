"use client";

import Link from "next/link";
import {
	StarIcon as StarIconSolid,
	MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import icon from "@/app/icon.svg";

export default function Header() {
	return (
		<header className="z-50">
			<div className="container flex items-center justify-between">
				<Link href="/" className="flex gap-1">
					<img src={icon.src} alt="Rift Insight" className="size-6" />
					<div className="dark:text-slate-300">
						Rift <span className="text-cyan-500">Insight</span>
					</div>
				</Link>
				<section className="flex gap-2">
					<button className="dark:bg-slate-800 p-2 rounded shadow">
						<MagnifyingGlassIcon className="size-6 text-cyan-500" />
					</button>
					<button className="dark:bg-slate-800 p-2 rounded shadow">
						<StarIconSolid className="size-6 text-cyan-500" />
					</button>
				</section>
			</div>
			<aside id="portal" />
		</header>
	);
}
