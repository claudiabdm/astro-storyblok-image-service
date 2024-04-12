import type { ComponentProps } from "astro/types";
import type { ImageTransform } from "astro";
import { type Image, type Picture } from "astro:assets";


export interface StoryblokImageTransform extends ImageTransform {
    // TODO
    // smart?: boolean, // https://www.storyblok.com/docs/image-service#facial-detection-and-smart-cropping
    // 'fit-in'?: boolean, // https://www.storyblok.com/docs/image-service#fit-in
    quality?: number | string, // 0-100 https://www.storyblok.com/docs/image-service#quality-optimization
    fill?: string, // #hexadecimal RGB expression (without the # character)
    focal?: string, // https://www.storyblok.com/docs/image-service#custom-focal-point,
    grayscale?: boolean, // https://www.storyblok.com/docs/image-service#grayscale
    blur?: number, // https://www.storyblok.com/docs/image-service#blur
    rotate?: number, // https://www.storyblok.com/docs/image-service#rotation
    brightness?: number, // https://www.storyblok.com/docs/image-service#brightness
    'round_corner'?: string, // https://www.storyblok.com/docs/image-service#rounded-corners
};

export type ImageProps = ComponentProps<typeof Image> & StoryblokImageTransform;
export type PictureProps = ComponentProps<typeof Picture> & StoryblokImageTransform;