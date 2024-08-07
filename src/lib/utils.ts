export const capitalise = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const encodeSlug = (slug: string) =>
    slug
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");