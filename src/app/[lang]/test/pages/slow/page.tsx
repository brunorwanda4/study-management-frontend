export const dynamic = "force-dynamic";

export default async function Slow() {
  // Simulate slow server render
  await new Promise((res) => setTimeout(res, 3000));

  return <div className="p-10 text-xl">Loaded after 3 seconds</div>;
}
