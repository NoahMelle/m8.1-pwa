import Homepage from "@/components/homepage/Homepage";
import Logo from "@/components/Logo";

export default async function Home() {
  return (
    <div className="w-full h-full flex flex-col justify-center grow">
      <main className="flex flex-col items-center justify-center gap-4">
        <div className="grid grid-cols-2">
          <Logo width={150} height={150} />
          <div className="flex flex-col justify-center">
            <p className="text-4xl font-semibold">Festival</p>
            <p className="text-red text-7xl font-handwritten leading-[70%]">
              2025
            </p>
          </div>
        </div>

        <Homepage />
      </main>
    </div>
  );
}
