import type { StaticImageData } from "next/image";
import stridewearImg from "@/assets/projects/stridewear.webp";
import zasImg from "@/assets/projects/zas.webp";
import touch7Img from "@/assets/projects/7touch.webp";
import waxdocImg from "@/assets/projects/waxdoc.webp";
import lumiereImg from "@/assets/projects/lumiere.webp";

export const projectImages = {
  stridewear: stridewearImg,
  zas: zasImg,
  "7touch": touch7Img,
  waxdoc: waxdocImg,
  lumiere: lumiereImg,
} as const satisfies Record<string, StaticImageData>;

export function getProjectImage(key?: string) {
  if (!key) return undefined;
  return projectImages[key as keyof typeof projectImages];
}
