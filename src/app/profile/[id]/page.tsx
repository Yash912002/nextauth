export default function page({ params }: any) {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1>Profile page</h1>
			<h2 className="p-4 m-4 bg-fuchsia-700 text-white rounded-lg ">{params.id}</h2>
		</div>
	);
}
