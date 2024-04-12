import type { ExternalImageService } from "astro";
import { baseService } from "astro/assets";
import type { StoryblokImageTransform } from "../types";
import { getSize } from "../utils";


const FILTERS = [
    // TODO
    // 'smart',
    // 'fit-in',
    'quality',
    'fill',
    'focal',
    'grayscale',
    'blur',
    'rotate',
    'brightness',
    'round_corner',
] as const;

type StoryblokFilter = { filter?: Pick<StoryblokImageTransform, typeof FILTERS[number]> };

interface StoryblokImageService extends ExternalImageService {
    validateOptions: (options: StoryblokImageTransform) => ReturnType<Exclude<ExternalImageService['validateOptions'], undefined>> & StoryblokFilter
    getHTMLAttributes: (options: StoryblokImageTransform) => ReturnType<Exclude<ExternalImageService['getHTMLAttributes'], undefined>> & StoryblokFilter
    getURL: (options: StoryblokImageTransform) => string
}
export const service: StoryblokImageService = {
    ...baseService,
    validateOptions(options: StoryblokImageTransform) {
        const { width, height } = getSize(options);
        const filters = FILTERS.reduce((acc, filterKey) => {
            if (filterKey in options) {
                // @ts-ignore
                acc[filterKey] = options[filterKey];
                delete options[filterKey];
            }
            return acc;
        }, {} as Pick<StoryblokImageTransform, typeof FILTERS[number]>);
        return { ...options, width, height, filters };
    },
    getURL(options: StoryblokImageTransform) {
        const format = `format(${options.format ?? 'webp'})`;
        const { width, height } = getSize(options);
        let url = `${options.src}/m/${width}x${height}/filters:${format}`;
        if (options.filters && Object.keys(options.filters).length > 0) {
            const filters = Object.entries(options.filters).reduce((acc, [key, value]) => {
                acc.push(`${key}(${value})`);
                return acc;
            }, [] as string[]).join(':');
            url = url.concat(`:${filters}`);
        }
        return url;
    },
    getHTMLAttributes(options: StoryblokImageTransform) {
        const { src, format, quality, filters, ...attributes } = options;
        return {
            ...attributes,
        };
    }
};
