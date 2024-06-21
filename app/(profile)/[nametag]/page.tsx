import { Metadata } from "next";
import UserProfile from "@/components/UserProfile";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export const generateMetadata = ({
  params,
}: {
  params: { nametag: string };
}): Metadata => {
  return {
    title: `@${params.nametag} | Tinker`,
  };
};

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
