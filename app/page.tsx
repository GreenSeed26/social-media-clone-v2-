import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="">
      Hello, {session?.user?.name}
      <p>hello</p>
    </main>
  );
}
