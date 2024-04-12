import { expect, test } from 'vitest';
import { getSize } from '.';
import type { ImageMetadata } from 'astro';

test('Get width and height from Storyblok image URL', () => {
    const exampleUrl = "https://a.storyblok.com/f/39898/3310x2192/e4ec08624e/demo-image.jpeg";
    const size = getSize({ src: exampleUrl });
    expect(size).toStrictEqual({ width: 3310, height: 2192 })
});

test('Get width from Storyblok image URL', () => {
    const exampleUrl = "https://a.storyblok.com/f/39898/3310x0/e4ec08624e/demo-image.jpeg";
    const size = getSize({ src: exampleUrl });
    expect(size).toStrictEqual({ width: 3310, height: 0 })
});

test('Get height from Storyblok image URL', () => {
    const exampleUrl = "https://a.storyblok.com/f/39898/0x2192/e4ec08624e/demo-image.jpeg";
    const size = getSize({ src: exampleUrl });
    expect(size).toStrictEqual({ width: 0, height: 2192 })
});

test('Get width from options', () => {
    const exampleUrl = "https://a.storyblok.com/f/39898/0x2192/e4ec08624e/demo-image.jpeg";
    const size = getSize({ src: exampleUrl, width: 1000 });
    expect(size).toStrictEqual({ width: 1000, height: 0 })
});

test('Get height from options', () => {
    const exampleUrl = "https://a.storyblok.com/f/39898/0x2192/e4ec08624e/demo-image.jpeg";
    const size = getSize({ src: exampleUrl, height: 1000 });
    expect(size).toStrictEqual({ width: 0, height: 1000 })
});

test('Get width and height from options', () => {
    const exampleUrl = "https://a.storyblok.com/f/39898/0x2192/e4ec08624e/demo-image.jpeg";
    const size = getSize({ src: exampleUrl, width: 2000, height: 1000 });
    expect(size).toStrictEqual({ width: 2000, height: 1000 })
});

test('Get size when src is ImageMetadata', () => {
    const exampleUrl = "https://a.storyblok.com/f/39898/3310x2192/e4ec08624e/demo-image.jpeg";
    const src: ImageMetadata = { src: exampleUrl, width: 3310, height: 2192, format: 'webp' };
    const size = getSize({ src: src });
    expect(size).toStrictEqual({ width: 3310, height: 2192 })
});

test('Overwrite Storyblok URL size', () => {
    const exampleUrl = "https://a.storyblok.com/f/39898/3310x2192/e4ec08624e/demo-image.jpeg";
    const src: ImageMetadata = { src: exampleUrl, width: 3310, height: 2192, format: 'webp' };
    const size = getSize({ src: src, width: 2000, height: 1000 });
    expect(size).toStrictEqual({ width: 2000, height: 1000 })
});

test('Round down size values', () => {
    const exampleUrl = "https://a.storyblok.com/f/39898/3310x2192/e4ec08624e/demo-image.jpeg";
    const src: ImageMetadata = { src: exampleUrl, width: 3310.145, height: 2192.123, format: 'webp' };
    const size = getSize({ src: src });
    expect(size).toStrictEqual({ width: 3310, height: 2192 })
    
    const src1: ImageMetadata = { src: exampleUrl, width: 3310.745, height: 2192.923, format: 'webp' };
    const size1 = getSize({ src: src1 });
    expect(size1).toStrictEqual({ width: 3310, height: 2192 })

    const src2: ImageMetadata = { src: exampleUrl, width: 3310, height: 2192, format: 'webp' };
    const size2 = getSize({ src: src2 });
    expect(size2).toStrictEqual({ width: 3310, height: 2192 })
});
