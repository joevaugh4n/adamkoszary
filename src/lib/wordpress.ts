// Post interface

export const siteUrl: string = `adamkoszary.co.uk`;
export const wordpressSite: string = `https://${siteUrl}/wp-json/wp/v2`;

export function logWordpress() {
  console.log(`WP site is: ${wordpressSite}`);
}

export interface PostProps {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  date: string;
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  tags: number[];
}

// Tag interface
export interface TagProps {
  id: number;
  name: string;
}

// Fetch posts
export async function fetchPosts(): Promise<PostProps[]> {
  try {
    const res = await fetch(`${wordpressSite}/posts/`);
    if (!res.ok) throw new Error(`Error fetching posts: ${res.statusText}`);
    return await res.json();
  } catch (err: any) {
    console.error(err.message);
    return [];
  }
}

// Fetch tags
export async function fetchTags(): Promise<TagProps[]> {
  try {
    const res = await fetch(`${wordpressSite}/tags?_fields=id,name`);
    if (!res.ok) throw new Error(`Error fetching tags: ${res.statusText}`);
    return await res.json();
  } catch (err: any) {
    console.error(err.message);
    return [];
  }
}

// Fetch page by slug
export async function fetchPageBySlug(slug: string): Promise<PostProps | null> {
  try {
    const res = await fetch(`${wordpressSite}/pages?slug=${slug}`);
    if (!res.ok) throw new Error(`Error fetching page: ${res.statusText}`);
    const pages = await res.json();
    return pages.length > 0 ? pages[0] : null;
  } catch (err: any) {
    console.error(err.message);
    return null;
  }
}

// Fetch testimonials
export async function fetchTestimonialsPage(): Promise<string | null> {
  try {
    const res = await fetch(`${wordpressSite}/pages?slug=testimonials`);
    if (!res.ok)
      throw new Error(`Error fetching testimonials page: ${res.statusText}`);
    const pages = await res.json();
    return pages.length > 0 ? pages[0].content.rendered : null;
  } catch (err: any) {
    console.error("Error fetching testimonials page:", err);
    return null;
  }
}

// Tags
export function createTagMap(tags: TagProps[]): Map<number, string> {
  return new Map(tags.map((tag) => [tag.id, tag.name]));
}

export function filterActiveTags(
  tags: TagProps[],
  posts: PostProps[]
): TagProps[] {
  return tags.filter((tag) => posts.some((post) => post.tags.includes(tag.id)));
}

export function groupPostsByTag(
  posts: PostProps[],
  tagMap: Map<number, string>
): Map<string, PostProps[]> {
  const postsByTag = new Map<string, PostProps[]>();
  posts.forEach((post) => {
    post.tags.forEach((tagId) => {
      const tagName = tagMap.get(tagId);
      if (tagName) {
        if (!postsByTag.has(tagName)) {
          postsByTag.set(tagName, []);
        }
        postsByTag.get(tagName)?.push(post);
      }
    });
  });
  return postsByTag;
}

export function convertTagName(str: string): string {
  return str.replace(/_/g, " ");
}
