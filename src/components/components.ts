import { Image as AstroImage, Picture as AstroPicture } from "astro:assets";
import type { ImageProps, PictureProps } from '../types';

export const Image: (props: ImageProps) => void = AstroImage;
export const Picture: (props: PictureProps) => void = AstroPicture;