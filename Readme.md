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

There are currently no third-party API keys required. Tweet embeds rely on the
`react-tweet` package, which uses Twitter's public embed endpoints and requires
no credentials.

## Nix + devenv workflow

### Local development (devenv)

```bash
devenv shell
# or
# devenv up
```

The shell uses Node 22 + pnpm and will install dependencies on first entry.

### Build package with Nix

```bash
nix build .#blog
```

> Note: first build may ask you to update the `hash` in `nix/package.nix`
> (`fetchPnpmDeps`) with the value Nix reports.

### Run packaged app

```bash
nix run .#blog
```

The app reads `HOST` and `PORT` (defaults: `127.0.0.1:3000`).

### Build OCI image (Podman)

Build a loadable OCI archive from the flake output:

```bash
nix build .#blog-image
```

Load it into Podman:

```bash
podman load < result
podman run --rm -p 3000:3000 \
  -e REDIS_URL=redis://redis.internal:6379 \
  imrane-blog:latest
```

For authenticated Redis, you can either embed credentials in `REDIS_URL` or
pass them separately:

```bash
# URL style
-e REDIS_URL=redis://app-user:super-secret@redis.internal:6379

# Split env vars (override URL credentials if both are set)
-e REDIS_URL=redis://redis.internal:6379 \
-e REDIS_USERNAME=app-user \
-e REDIS_PASSWORD=super-secret
```

If you do not have Redis locally, run with views/tweet cache disabled:

```bash
podman run --rm -p 3000:3000 \
  -e SKIP_VIEWS=1 \
  -e SKIP_TWEET_FETCH=1 \
  imrane-blog:latest
```

If you prefer streaming directly into your container runtime:

```bash
nix run .#blog-image-stream | podman load
```

### Use OCI output in one machine flake

You can import this flake in your infra flake and let NixOS load the image from
`blog-image` automatically for a single host:

```nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    blog.url = "github:imrane/blog";
  };

  outputs = { nixpkgs, blog, ... }: {
    nixosConfigurations.my-server = nixpkgs.lib.nixosSystem {
      system = "x86_64-linux";
      modules = [
        ({ pkgs, ... }: {
          virtualisation.podman.enable = true;
          virtualisation.oci-containers.backend = "podman";

          virtualisation.oci-containers.containers.blog = {
            image = "imrane-blog:latest";
            imageFile = blog.packages.${pkgs.system}.blog-image;
            ports = [ "3000:3000" ];
            environment = {
              HOST = "0.0.0.0";
              PORT = "3000";
              NODE_ENV = "production";
              REDIS_URL = "redis://redis.internal:6379";
              # Optional for authenticated Redis:
              # REDIS_USERNAME = "app-user";
              # REDIS_PASSWORD = "super-secret";
            };
          };
        })
      ];
    };
  };
}
```

If `REDIS_URL` is not set, the app falls back to its internal default behavior.
`REDIS_USERNAME`/`REDIS_PASSWORD` are optional and can be used with or without
credentials embedded in `REDIS_URL`.
`REDIS_URL` path selects Redis DB (for example `...:6379/1`); default is DB `0`.

> Build-only note: `SKIP_VIEWS=1` and `SKIP_TWEET_FETCH=1` are set in the Nix
> build derivation to keep builds reproducible in sandboxed/offline contexts.
> They are **not** set by default in runtime service config.

### NixOS module (for clan/dotfiles)

This flake exports `nixosModules.blog`.

Example:

```nix
{
  inputs.blog.url = "github:imrane/blog";

  outputs = { self, nixpkgs, blog, ... }: {
    nixosConfigurations.my-host = nixpkgs.lib.nixosSystem {
      system = "x86_64-linux";
      modules = [
        blog.nixosModules.blog
        ({ ... }: {
          services.imrane.blog = {
            enable = true;
            host = "127.0.0.1";
            port = 3000;
            redisUrl = "redis://redis.internal:6379";
            # environmentFile = /run/secrets/blog-env;
          };
        })
      ];
    };
  };
}
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

## Sync with upstream

This repo is a fork of [rauchg/blog](https://github.com/rauchg/blog). To pull in
upstream fixes:

```bash
git fetch upstream
git merge upstream/main        # merge commit only: no rebase, no force-push
```

When resolving conflicts, keep OUR versions of:

- Nix packaging and CI: `flake.nix`, `flake.lock`, `nix/**`, `devenv.nix`,
  `.envrc`, `.github/workflows/ci.yml`, `docker-compose.yml`
- Local Redis instead of Upstash: `app/redis.ts` (RESP over `node:net`,
  `REDIS_URL` with auth/db) and `app/api/view/route.ts`. No `@upstash/redis`
  dependency and no `KV_*` env vars; port upstream's Redis call sites to our
  client.
- `app/api/health/route.ts`
- Personal content and identity: `app/posts.json`, `app/(post)/2026/**`,
  `archive/**`, `app/about/**`, header/footer/logo/layout, and the OG image
  routes. Pages we archived stay archived (e.g. modify/delete conflicts on
  posts that now live under `archive/app-posts/` resolve as deleted).

Take upstream for everything else. After merging, regenerate the lockfile
(`pnpm install`), then update the `hash` in `nix/package.nix` and verify with
`nix build .#blog-image`.

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
