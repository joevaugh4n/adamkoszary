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

export interface TagProps {
  id: number;
  name: string;
}

// Fetch posts
export async function fetchPosts(): Promise<PostProps[]> {
  return fetchWithRetry(`${wordpressSite}/posts/`);
}

// Fetch tags
export async function fetchTags(): Promise<TagProps[]> {
  return fetchWithRetry(`${wordpressSite}/tags?_fields=id,name`);
}

// Fetch page by slug
export async function fetchPageBySlug(slug: string): Promise<PostProps | null> {
  const pages = await fetchWithRetry(`${wordpressSite}/pages?slug=${slug}`);
  return pages.length > 0 ? pages[0] : null;
}

// Fetch testimonials
export async function fetchTestimonialsPage(): Promise<string | null> {
  const pages = await fetchWithRetry(`${wordpressSite}/pages?slug=testimonials`);
  return pages.length > 0 ? pages[0].content.rendered : null;
}

// General fetch function with retry logic
async function fetchWithRetry(url: string, options = {}, retries = 3, backoff = 300) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`Error fetching: ${res.statusText}`);
      return await res.json();
    } catch (err: any) {
      console.error(`Fetch attempt ${i + 1} failed:`, err.message);
      if (i < retries - 1) {
        console.log(`Retrying in ${backoff}ms...`);
        await new Promise(resolve => setTimeout(resolve, backoff));
        backoff *= 2; // Exponential backoff
      } else {
        console.error('All fetch attempts failed');
        throw err;
      }
    }
  }
}

// Tags
export function createTagMap(tags: TagProps[]): Map<number, string> {
  return new Map(tags.map((tag) => [tag.id, tag.name]));
}

export function filterActiveTags(tags: TagProps[], posts: PostProps[]): TagProps[] {
  return tags.filter((tag) => posts.some((post) => post.tags.includes(tag.id)));
}

export function groupPostsByTag(posts: PostProps[], tagMap: Map<number, string>): Map<string, PostProps[]> {
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
