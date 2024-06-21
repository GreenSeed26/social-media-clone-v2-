"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
  type Crop,
} from "react-image-crop";
import NextImage from "next/image";
import { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import setCanvasPreview from "@/lib/setCanvasPreview";
import defaultIcon from "@/public/user-icon.jpg";
// import { Button } from "./ui/button";

const MIN_DIM = 150;
const ASPECT_RATIO = 1;

function ChangeProfilePic({
  updateProfileUrl,
  pfp,
}: {
  updateProfileUrl: (data: File) => void;
  pfp: string;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const prevCanvasRef = useRef<HTMLCanvasElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [imgUrl, setImgUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const selectedImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imgElem = new Image();
      const picUrl = reader.result?.toString() || "";

      imgElem.src = picUrl;

      imgElem.addEventListener("load", (e: Event) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } =
          e.currentTarget as HTMLImageElement;

        if (naturalHeight < MIN_DIM || naturalWidth < MIN_DIM) {
          setError(`Image must be at least ${MIN_DIM} by ${MIN_DIM}`);
          setImgUrl("");
          return;
        }
      });

      setImgUrl(picUrl);
    };
    reader.readAsDataURL(file);
  };

  const onImgLoad = (e: ChangeEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIM / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height,
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const handleCropImage = () => {
    if (!crop || !imgRef.current || !prevCanvasRef.current) {
      setError("Something went wrong. Please try cropping the image again.");
      return;
    }

    setCanvasPreview(
      imgRef.current,
      prevCanvasRef.current,
      convertToPixelCrop(crop, imgRef.current?.width, imgRef.current?.height),
    );
    const dataUrl = prevCanvasRef.current.toBlob((blob) => {
      const file = new File([blob as Blob], "image", { type: blob?.type });

      updateProfileUrl(file);
    });

    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <div className="group relative h-36 cursor-pointer ">
          <div className="absolute bottom-5 right-3.5 z-50 rounded border bg-white/70 px-2 py-1 text-sm font-semibold opacity-0 transition-all group-hover:-bottom-9 group-hover:opacity-100">
            Change Avatar
          </div>
          <NextImage
            onClick={() => setOpen(true)}
            src={pfp ? pfp : defaultIcon}
            alt="profile"
            width={144}
            height={144}
            className="size-36 rounded-full border object-cover"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0">
        <DialogTitle className="py-1 text-base">
          Change Profile Picture
        </DialogTitle>
        <label
          htmlFor="pfp"
          className="my-1 w-fit rounded bg-primary p-1 text-sm text-white"
        >
          Select Profile Picture
        </label>
        <section className="flex gap-4">
          <input
            onChange={selectedImage}
            type="file"
            accept="image/*"
            id="pfp"
            hidden
          />
          {error && <div className="text-xs text-red-500">{error}</div>}
          {imgUrl && (
            <div className="flex w-full flex-col items-center">
              <ReactCrop
                onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                crop={crop}
                circularCrop
                keepSelection
                aspect={ASPECT_RATIO}
                minHeight={90}
              >
                <NextImage
                  ref={imgRef}
                  src={imgUrl}
                  alt=""
                  width={350}
                  height={350}
                  onLoad={onImgLoad}
                  className="h-80 w-auto"
                />
              </ReactCrop>
            </div>
          )}

          {crop && (
            <canvas
              ref={prevCanvasRef}
              className="mt-4"
              style={{
                display: "none",
                border: "1px solid black",
                objectFit: "contain",
                width: 150,
                height: 150,
              }}
            ></canvas>
          )}
        </section>

        <div className="flex justify-end gap-2">
          <button
            className="mt-3 h-8 w-fit rounded bg-primary px-1 text-sm font-semibold text-white"
            onClick={handleCropImage}
          >
            Crop Image
          </button>
          <button
            className="mt-3 h-8 w-fit rounded bg-primary px-1 text-sm font-semibold text-white"
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ChangeProfilePic;
