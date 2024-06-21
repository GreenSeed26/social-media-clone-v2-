import Image from "next/image";

function ProfileSkeleton() {
  return (
    <main className="mx-auto flex w-[640px] p-4">
      <div className="relative">
        <div className="size-28 animate-pulse rounded-full border bg-gray-300 object-cover"></div>
      </div>
      <div className="ml-2 flex flex-1 items-center">
        <div className="flex flex-col gap-2">
          <span className="h-4 w-20 animate-pulse bg-gray-300"></span>
          <span className="h-4 w-24 animate-pulse bg-gray-300"></span>
          <span className="h-4 w-16 animate-pulse bg-gray-300"></span>
        </div>
        <div className="flex w-full items-center justify-around">
          <div className="flex flex-col gap-2">
            <span className="h-6 w-6 animate-pulse bg-gray-300"></span>
            <span className="h-4 w-12 animate-pulse bg-gray-300"></span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="h-6 w-6 animate-pulse bg-gray-300"></span>
            <span className="h-4 w-20 animate-pulse bg-gray-300"></span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="h-6 w-6 animate-pulse bg-gray-300"></span>
            <span className="h-4 w-20 animate-pulse bg-gray-300"></span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProfileSkeleton;
