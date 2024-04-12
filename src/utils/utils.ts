import type { StoryblokImageTransform } from "../types";

export function getSize(options: Pick<StoryblokImageTransform, 'src' | 'width' | 'height'>) {
    if (options.width == null && options.height) {
        return { width: 0, height: Math.floor(options.height) }
    }
    if (options.height == null && options.width) {
        return { width: Math.floor(options.width), height: 0 }
    }
    if (options.width && options.height) {
        return { width: Math.floor(options.width), height: Math.floor(options.height) }
    }

    const src = getSrc(options);
    const [widthStr, heightStr] = src
        .replace("https://a.storyblok.com/f/", "")
        .split("/")[1]
        .split("x");
    const width = Math.floor(Number(widthStr));
    const height = Math.floor(Number(heightStr));
    return { width, height }
}

function getSrc(options: Pick<StoryblokImageTransform, 'src'>) {
    return typeof options.src === 'string' ? options.src : options.src.src;
}