import { wpquery } from "./wordpress";
import { decode } from "html-entities";

interface Tag {
  name: string;
  slug: string;
  count: number;
}

interface PostProps {
  dateGmt: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: { nodes: Tag[] };
}

interface DataProps {
  posts: {
    nodes: PostProps[];
  };
}

function sanitizeExcerpt(input: string): string {
  const noHtml = input.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
  const decoded = decode(noHtml); // Decode HTML entities
  return decoded.trim().replace(/\n/g, ""); // Remove newlines and trim
}

export async function fetchBlogPosts(): Promise<DataProps> {
  try {
    const response = await wpquery({
      query: `
        query GetPostExcerptsAndAllTags {
          posts(first:1000) {
            nodes {
              title
              dateGmt
              excerpt
              slug
              featuredImage {
                node {
                  mediaItemUrl
                  altText
                }
              }
              tags {
                nodes {
                  name
                  slug
                  count
                }
              }
            }
          }
        }
      `,
    });

    if (response.posts?.nodes) {
      const sanitizedPosts = response.posts.nodes.map((post:PostProps) => ({
        ...post,
        excerpt: sanitizeExcerpt(post.excerpt),
      }));
      return { posts: { nodes: sanitizedPosts } };
    } else {
      return { posts: { nodes: [] } };
    }
  } catch (error) {
    return { posts: { nodes: [] } };
  }
}

export async function fetchLatestPost(): Promise<PostProps> {
  try {
    const response = await wpquery({
      query: `
        query GetLatestPost {
          posts(first: 1) {
            nodes {
              title
              dateGmt
              slug
              excerpt
              tags {
                nodes {
                  name
                  slug
                  count
                }
              }
            }
          }
        }
      `,
    });

    if (response.posts?.nodes?.[0]) {
      const latestPost = response.posts.nodes[0];
      return {
        ...latestPost,
        excerpt: sanitizeExcerpt(latestPost.excerpt),
      };
    } else {
      return {
        dateGmt: '',
        title: '',
        slug: '',
        excerpt: '',
        tags: { nodes: [] },
      };
    }
  } catch (error) {
    return {
      dateGmt: '',
      title: '',
      slug: '',
      excerpt: '',
      tags: { nodes: [] },
    };
  }
}


export function getUniqueTags(posts: PostProps[]): Tag[] {
  const tagsSet = new Set();
  posts.forEach((post) => {
    post.tags.nodes.forEach((tag) => tagsSet.add(JSON.stringify(tag)));
  });
  return Array.from(tagsSet).map((tag: any) => JSON.parse(tag));
}
