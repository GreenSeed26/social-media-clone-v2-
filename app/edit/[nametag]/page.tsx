import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import EditProfile from "@/components/EditProfile";
import "react-image-crop/dist/ReactCrop.css";

export const metadata: Metadata = {
  title: "Edit",
};

async function EditPage({ params }: { params: { nametag: string } }) {
  const { nametag } = params;

  const res = await fetch(`${process.env.API_URL}/api/user/${nametag}`, {
    cache: "no-store",
  });

  const user = await res.json();

  return <EditProfile user={user} />;
}

export default EditPage;
