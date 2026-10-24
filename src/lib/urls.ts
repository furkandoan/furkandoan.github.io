// Keep internal links valid for both the custom domain and a subdirectory preview.
export const localUrl = (path = "") => `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
