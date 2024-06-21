import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import EditProfile from "@/components/EditProfile";
import "react-image-crop/dist/ReactCrop.css";

async function EditPage({ params }: { params: { nametag: string } }) {
  const session = await getServerSession(authOptions);
  const { nametag } = params;

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${nametag}`, {
    cache: "no-store",
  });

  const user = await res.json();

  return <EditProfile user={user} />;
}

export default EditPage;
