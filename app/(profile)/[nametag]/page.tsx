import UserProfile from "@/components/UserProfile";
import { authOptions } from "@/lib/auth";
import { UserProps } from "@/types/proptypes";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export async function getProfile(nametag: string) {
  try {
    const res = await fetch(`/api/user/${nametag}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const users = await res.json();
      return users;
    }
  } catch (error) {
    console.log(error);
  }
}

async function ProfilePage({ params }: { params: { nametag: string } }) {
  const session = await getServerSession(authOptions);

  const { nametag } = params;
  const nexturl = process.env.NEXTAUTH_URL;

  const res = await fetch(`${nexturl}/api/user/${nametag}`, {
    cache: "no-store",
  });

  const users = await res.json();
  if (!session) redirect("/");

  return <UserProfile user={users} />;
}

export default ProfilePage;
