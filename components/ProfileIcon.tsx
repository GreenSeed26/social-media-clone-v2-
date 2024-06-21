"use client";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import defaltIcon from "../public/user-icon.jpg";

import { useEffect, useRef, useState } from "react";
import { UserProps } from "@/types/proptypes";

function ProfileIcon({ user }: { user: UserProps | undefined }) {
  const [drop, setDrop] = useState(false);

  const dropRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const outsideClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDrop(false);
      }
    };

    document.addEventListener("click", outsideClick);

    if (!drop) {
      document.removeEventListener("click", outsideClick);
    }

    return () => document.removeEventListener("click", outsideClick);
  }, [drop]);
  return (
    <>
      <div
        ref={dropRef}
        className={`${drop ? "translate-y-0 opacity-100" : "-translate-y-44 opacity-0"} absolute right-0 top-14 flex w-44 flex-col gap-1 border bg-white p-2 shadow-md transition-all`}
      >
        <span className="text-sm font-semibold">{user?.fullName}</span>
        <Link
          className="text-sm text-muted-foreground hover:underline"
          href={`/${user?.nametag}`}
        >
          @{user?.nametag}
        </Link>
        <button
          className="bg-red-500 px-2 py-1 text-sm font-semibold text-white"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
      <Image
        onClick={() => setDrop(!drop)}
        src={user?.image ? user?.image : defaltIcon}
        alt="user"
        width={50}
        height={50}
        className="size-10 rounded-full object-cover"
      />
    </>
  );
}

export default ProfileIcon;
