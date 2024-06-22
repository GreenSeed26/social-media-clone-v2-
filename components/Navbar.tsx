import Link from "next/link";
import ProfileIcon from "./ProfileIcon";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserProps } from "@/types/proptypes";
import { User } from "lucide-react";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const data: UserProps = await getServerSideProps(
    session?.user?.username as string,
  );
  return (
    <header className="flex h-12 items-center justify-between bg-slate-300 p-2">
      <Link href="/">Home</Link>

      {session && (
        <div className="relative">
          <ProfileIcon user={data} />
        </div>
      )}
    </header>
  );
}

export async function getServerSideProps(user: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/user/${user}`, {
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
