"use client";
import prisma from "@/lib/db";
import { useSession } from "next-auth/react";
import { useState } from "react";

async function Like() {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = () => {
    setIsLiked((curr) => !curr);
    setLikeCount((count) => (isLiked ? count - 1 : count + 1)); // Update like count based on previous isLiked state
    console.log(isLiked); // Log previous isLiked state
    console.log(likeCount); // Log previous likeCount state
  };

  const { data: session } = useSession();

  const user = await prisma.user.findFirst({
    where: {
      nametag: session?.user.username as string,
    },
  });

  return (
    <main>
      <button
        className={`w-16 px-2 py-1 text-sm ${
          isLiked
            ? "rounded border border-black bg-white text-black"
            : "rounded border border-slate-800 bg-slate-800 font-semibold text-white"
        } transition-all`}
        onClick={handleLike}
      >
        {isLiked ? "Liked" : "Like"}
      </button>
      <span>{likeCount}</span>
    </main>
  );
}

export default Like;
