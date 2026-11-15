const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Prefix an absolute site path with the Astro base path. */
export function url(path = "/"): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `${base}/`;
  return `${base}${normalized}`;
}

/** Strip the base path for comparing the current route. */
export function route(pathname: string): string {
  const stripped = pathname.replace(base, "") || "/";
  return stripped.endsWith("/") ? stripped : `${stripped}/`;
}
