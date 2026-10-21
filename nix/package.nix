{
  lib,
  stdenv,
  nodejs_22,
  pnpm_10,
  pnpmConfigHook,
  fetchPnpmDeps,
  bash,
  ...
}:
stdenv.mkDerivation (finalAttrs: {
  pname = "imrane-blog";
  version = "0.1.0";

  src = lib.cleanSource ../.;

  pnpmDeps = fetchPnpmDeps {
    inherit (finalAttrs) pname version src;
    pnpm = pnpm_10;
    fetcherVersion = 3;
    hash = "sha256-GhTyfOKy+Ayl8TuzU2XoYlphlKy+I+VMJQZD6LRgLi0=";
  };

  nativeBuildInputs = [
    nodejs_22
    pnpm_10
    pnpmConfigHook
  ];

  env = {
    SKIP_VIEWS = "1";
    SKIP_TWEET_FETCH = "1";
    NEXT_TELEMETRY_DISABLED = "1";
  };

  pnpmInstallFlags = [ "--prod=false" ];

  buildPhase = ''
    runHook preBuild
    node ./fonts/init.mjs
    pnpm run build
    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall

    mkdir -p $out/share/blog
    cp -r .next/standalone $out/share/blog/standalone
    cp -r .next/static $out/share/blog/static
    cp -r public $out/share/blog/public
    cp -r fonts $out/share/blog/standalone/fonts

    # Prepare standalone tree while it's writable during build.
    mkdir -p $out/share/blog/standalone/.next
    ln -sfn "$out/share/blog/static" $out/share/blog/standalone/.next/static
    ln -sfn "$out/share/blog/public" $out/share/blog/standalone/public

    mkdir -p $out/bin
    cat > $out/bin/blog <<EOF
    #!${bash}/bin/bash
    set -euo pipefail

    export HOST="''${HOST:-127.0.0.1}"
    export PORT="''${PORT:-3000}"

    cd "$out/share/blog/standalone"

    exec ${nodejs_22}/bin/node server.js
    EOF
    chmod +x $out/bin/blog

    runHook postInstall
  '';

  meta = {
    description = "Next.js blog packaged with Nix";
    mainProgram = "blog";
    platforms = lib.platforms.linux;
  };
})
