"use client";

import { UserProps } from "@/types/proptypes";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";
import CropImage from "./CropImage";
import { useToast } from "./ui/use-toast";

function EditProfile({ user }: { user: UserProps }) {
  const [newName, setNewName] = useState(user.fullName);
  const [newUsername, setNewUsername] = useState(user.nametag);
  const [newImage, setNewImage] = useState(user.image);
  const [newBio, setNewBio] = useState(user.bio);
  const [imgFile, setImgFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { edgestore } = useEdgeStore();

  const router = useRouter();

  const getCroppedImg = (data: File) => {
    setImgFile(data);
    setNewImage(URL.createObjectURL(data));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (
      newName === user.fullName &&
      newUsername === user.nametag &&
      newImage === user.image &&
      newBio === user.bio &&
      !imgFile
    ) {
      setLoading(false);
      toast({
        title: "No Changes",
        description: "No changes were made to your profile.",
      });
      router.back();
      return;
    }
    try {
      if (imgFile) {
        const uploadOptions = user.image
          ? { replaceTargetUrl: user.image }
          : {};
        const res = await edgestore.publicFiles.upload({
          file: imgFile,
          options: uploadOptions,
        });

        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/${user.nametag}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image: res.url,
            }),
          },
        );
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${user.nametag}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: newName,
            nametag: newUsername,
            bio: newBio,
          }),
        },
      );

      if (res.ok) {
        toast({
          title: "Success",
          description: "Profile Successfully Updated",
        });
        router.replace(`/${newUsername}`);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto w-[640px] border">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-8">
        <CropImage pfp={newImage} updateProfileUrl={getCroppedImg} />

        <div className="ml-4 flex flex-1 flex-col gap-2">
          <label className="text-sm font-semibold" htmlFor="fullName">
            Name
          </label>
          <input
            onChange={(e) => setNewName(e.target.value)}
            className="h-8 border px-2 text-sm outline-none"
            type="text"
            name="fullName"
            value={newName}
          />
          <label className="text-sm font-semibold" htmlFor="nametag">
            Username
          </label>
          <input
            onChange={(e) => setNewUsername(e.target.value)}
            className="h-8 border px-2 text-sm outline-none"
            type="text"
            name="nametag"
            value={newUsername}
          />
          <label className="text-sm font-semibold" htmlFor="bio">
            Bio
          </label>
          <textarea
            onChange={(e) => setNewBio(e.target.value)}
            value={newBio}
            className="h-24 resize-none border px-2 text-sm outline-none"
          ></textarea>
          <button
            className={`mt-2 h-8 text-sm font-semibold text-white ${loading ? "bg-slate-600" : "bg-slate-800 hover:bg-slate-700"} transition-all`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
