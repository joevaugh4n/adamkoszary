// Post interface
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
    const res = await fetch(
      "https://public-api.wordpress.com/wp/v2/sites/test113736.wordpress.com/posts"
    );
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
    const res = await fetch(
      "https://public-api.wordpress.com/wp/v2/sites/test113736.wordpress.com/tags?_fields=id,name"
    );
    if (!res.ok) throw new Error(`Error fetching tags: ${res.statusText}`);
    return await res.json();
  } catch (err: any) {
    console.error(err.message);
    return [];
  }
}
