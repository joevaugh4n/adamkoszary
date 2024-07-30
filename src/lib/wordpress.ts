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

// Fallback data
const fallbackPosts: PostProps[] = [
  // Add some sample posts here
];

const fallbackTags: TagProps[] = [
  // Add some sample tags here
];

// Fetch posts with fallback
export async function fetchPosts(): Promise<PostProps[]> {
  try {
    return await fetchWithRetry(`${wordpressSite}/posts/`);
  } catch (error) {
    console.error('Failed to fetch posts, using fallback data', error);
    return fallbackPosts;
  }
}

// Fetch tags with fallback
export async function fetchTags(): Promise<TagProps[]> {
  try {
    return await fetchWithRetry(`${wordpressSite}/tags?_fields=id,name`);
  } catch (error) {
    console.error('Failed to fetch tags, using fallback data', error);
    return fallbackTags;
  }
}

// Fetch page by slug with fallback
export async function fetchPageBySlug(slug: string): Promise<PostProps | null> {
  try {
    const pages = await fetchWithRetry(`${wordpressSite}/pages?slug=${slug}`);
    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    console.error(`Failed to fetch page with slug ${slug}, returning null`, error);
    return null;
  }
}

// Fetch testimonials with fallback
export async function fetchTestimonialsPage(): Promise<string | null> {
  try {
    const pages = await fetchWithRetry(`${wordpressSite}/pages?slug=testimonials`);
    return pages.length > 0 ? pages[0].content.rendered : null;
  } catch (error) {
    console.error('Failed to fetch testimonials, returning null', error);
    return null;
  }
}

// General fetch function with retry logic and timeout
async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3, backoff = 300): Promise<any> {
  const timeout = 10000; // 10 seconds timeout

  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);

      if (!res.ok) throw new Error(`Error fetching: ${res.statusText}`);
      const data = await res.json();

      // Check for circular references before returning
      JSON.stringify(data); // This will throw an error if there's a circular reference
      return data;
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
