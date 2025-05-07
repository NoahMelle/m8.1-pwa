import Logo from "@/components/Logo";
import BackgroundDecorations from "@/components/reusable/BackgroundDecorations";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      <BackgroundDecorations className="opacity-60" />

      <main className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="grid grid-cols-2">
          <Logo width={150} height={150} />
          <div className="flex flex-col justify-center">
            <p className="text-4xl">Festival</p>
            <p className="text-red text-5xl">2025</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center w-full px-4 max-w-[350px] mx-auto">
          <Link
            href={"/info"}
            className="bg-red from-red bg-gradient-to-b to-red-600 text-white rounded-md w-full flex justify-center p-4"
          >
            Over het festival
          </Link>
          <Link
            href={"/timetable"}
            className="border-red border-2 rounded-md w-full flex justify-center p-4"
          >
            Blokkenschema
          </Link>
        </div>
      </main>
    </div>
  );
}
