# Astro Storyblok Image Service
Integrate [Storyblok image service](https://www.storyblok.com/docs/image-service/) with [Astro image components or getImage()](https://docs.astro.build/en/guides/images/). 

## Getting Started

### Installation

```bash
npm install astro-storyblok-image-service
```

### Usage
To use the Storyblok image service with the Astro Image API you need to configure the `astro.config.mjs` file. 

```ts
import { AstroStoryblokImageService } from 'astro-storyblok-image-service';

export default defineConfig({
    ...
    image: {
        service: 'astro-storyblok-image-service',
    }
    ...
});

```

