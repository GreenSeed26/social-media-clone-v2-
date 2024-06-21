import React from "react";
import defaultIcon from "../public/user-icon.jpg";
import Link from "next/link";
import Image from "next/image";
import { Edit2Icon } from "lucide-react";
import { UserProps } from "@/types/proptypes";

export default function UserProfile({ user }: { user: UserProps }) {
  const followersFormatted = Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(user.followCount);

  return (
    <main className="mx-auto flex w-[640px] flex-col p-4">
      <div className="flex w-full p-4">
        <div className="relative">
          <Link
            className="absolute bottom-0 right-2 rounded-full bg-slate-700 p-1"
            href={`/edit/${user.nametag}`}
          >
            <Edit2Icon size={15} className="text-white" />
          </Link>
          <Image
            src={user.image ? user.image : defaultIcon}
            alt="profile"
            width={250}
            height={250}
            className="size-32 rounded-full border object-cover"
          />
        </div>
        <div className="ml-2 flex flex-1 items-center">
          <div className="flex flex-col">
            <span className="text-xl font-semibold">{user.fullName}</span>
            <span className="text-sm text-gray-400">@{user.nametag}</span>
          </div>
          <div className="flex w-full items-center justify-around">
            <div className="flex flex-col">
              <span className="text-xl font-semibold">0</span>
              <span className="text-lg">Posts</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold">
                {followersFormatted}
              </span>
              <span className="text-lg">Followers</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold">10</span>
              <span className="text-lg">Following</span>
            </div>
          </div>
        </div>
    
      </div>

      <div className="px-4 p-1 text-center">
        <p className="text-sm">{user.bio}</p>
      </div>
    </main>
  );
}
