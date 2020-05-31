# blog

This is the blog that powers `rauchg.com`, built on
[next.js](https://nextjs.org/) and
deployed to the cloud via [Vercel](https://vercel.com).

## How to run

First, install [Vercel CLI](https://vercel.com/download).

### Development

```
vc dev
```

### Deployment

#### Staging

```bash
vc
```

This is the equivalent of submitting a PR with the [GitHub integration](https://vercel.com/github)

#### Production

```bash
vc --prod
```

This is the equivalent of `git push` to `master` (or merging a PR to master)

## Architecture

### Pure components

Every stateless pure component is found under `./components`.

Every component that has to do with styling the post's markup
is found under `./components/post/`

These components make up the _style guide_ of the application.

### Blog posts

Every blog post is a static page hosted under `pages/$year/`.

This allows every post to load arbitrary modules, have custom layouts
and take advantage of automatic code splitting and lazy loading.

This means that the bloat of a single post doesn't "rub off on" the
rest of the site.

An index of all posts is maintained in JSON format as `./posts.json`
for practical reasons.
