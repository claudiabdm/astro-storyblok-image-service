import { expect, test } from 'vitest';
import service from '.';

const exampleUrl = "https://a.storyblok.com/f/39898/3310x2192/e4ec08624e/demo-image.jpeg";

test('Generates correct Storyblok URL without filters', () => {
    const url = service.getURL({
        src: exampleUrl,
    })
    expect(url).toBe("https://a.storyblok.com/f/39898/3310x2192/e4ec08624e/demo-image.jpeg/m/3310x2192/filters:format(webp)")
});

test('Generates correct Storyblok URL with filters empty', () => {
    const url = service.getURL({
        src: exampleUrl,
        filters: {},
    })
    expect(url).toBe("https://a.storyblok.com/f/39898/3310x2192/e4ec08624e/demo-image.jpeg/m/3310x2192/filters:format(webp)")
});

test('Generates correct Storyblok URL with filters', () => {
    const options = {
        src: exampleUrl,
        filters: {
            blur: 10,
            fill: 'cccccc',
            focal: '300x0:100x200',
            grayscale: true,
            brightness: 10,
            round_corner: "30,255,255,255"
        }
    };
    const url = service.getURL(options)
    expect(url).toBe(`https://a.storyblok.com/f/39898/3310x2192/e4ec08624e/demo-image.jpeg/m/3310x2192/filters:format(webp):blur(${options.filters.blur}):fill(${options.filters.fill}):focal(${options.filters.focal}):grayscale(${options.filters.grayscale}):brightness(${options.filters.brightness}):round_corner(${options.filters.round_corner})`);
});

test('Return right options after validation', () => {
    const optionsInput = {
        src: exampleUrl,
        width: 3310.34,
        height: 2192.21,
        blur: 0,
        fill: 'cccccc',
        focal: '300x0:100x200',
        grayscale: true,
        brightness: 10,
        round_corner: "30,255,255,255"

    };
    const options = service.validateOptions(optionsInput)
    expect(options).toStrictEqual({
        src: exampleUrl,
        width: 3310,
        height: 2192,
        filters: {
            blur: 0,
            fill: 'cccccc',
            focal: '300x0:100x200',
            grayscale: true,
            brightness: 10,
            round_corner: "30,255,255,255"
        }
    })
});

test('Returns HTML attributes', () => {
    const options = {
        src: exampleUrl,
        width: 3310,
        height: 2192,
        lazy: 'eager',
        filters: {
            blur: 10,
            fill: 'cccccc',
            focal: '300x0:100x200',
            grayscale: true,
            brightness: 10,
            round_corner: "30,255,255,255"
        }
    };
    const attributes = service.getHTMLAttributes(options)
    expect(attributes).toStrictEqual({
        width: options.width,
        height: options.height,
        lazy: options.lazy
    })
});