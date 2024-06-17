import prisma from "@/utils/db";

async function Users() {
	const users = await prisma.user.findMany();

	return (
		<section className="space-y-4">
			<h2 className="text-xl">Users</h2>
			<ul>
				{users.map((user) => (
					<li key={user.id}>
						{user.email} {user.name}
					</li>
				))}
			</ul>
		</section>
	);
}

export default async function Page() {
	return (
		<main className="space-y-8">
			<section className="space-y-4">
				<h1 className="text-2xl">Check out your stats and insights!</h1>
				<p className="max-w-96">
					Welcome to{" "}
					<span className="text-cyan-500 font-bold">Rift Insight!</span> You can
					check out your League of Legends progress and learn more about your
					playstyle.
				</p>
			</section>
			<Users />
		</main>
	);
}
