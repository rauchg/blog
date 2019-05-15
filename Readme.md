# blog

This is the blog that powers `rauchg.com`, built on
[next.js](https://zeit.co/blog/next) and
deployed to the cloud via [now](https://zeit.co/now).

## How to run

First, install [Now](https://zeit.co/download).

### Development

```
now dev
```

### Deployment

#### Staging

```bash
now
```

This is the equivalent of submitting a PR with the [GitHub integration](https://zeit.co/github)

#### Production

```bash
now target --production
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
