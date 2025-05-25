import { decode } from "html-entities";

/** Types **/

interface WPGraphQLParams {
  query: string;
  variables?: Record<string, any>;
}

interface WPGraphQLResponse {
  data?: Record<string, any>;
  errors?: Array<{ message: string }>;
}

interface Tag {
  name: string;
  slug: string;
  count: number;
}

export interface PostProps {
  dateGmt: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  tags: { nodes: Tag[] };
  featuredImage?: {
    node: {
      mediaItemUrl: string;
      altText: string;
    };
  } | null;
}

interface PageNode {
  date: string;
  title: string;
  content: string;
  slug: string;
}

interface DataProps {
  posts: {
    nodes: PostProps[];
  };
}

interface PageDataProps {
  pages: {
    nodes: PageNode[];
  };
}

/** Core GraphQL Fetch **/

export async function wpquery({
  query,
  variables = {},
}: WPGraphQLParams): Promise<Record<string, any>> {
  try {
    const res = await fetch("https://admin.adamkoszary.co.uk/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) {
      throw new Error(`Network error: ${res.statusText}`);
    }

    const result: WPGraphQLResponse = await res.json();

    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      throw new Error("GraphQL query failed");
    }

    return result.data ?? {};
  } catch (error) {
    console.error("wpquery failed:", error);
    return {};
  }
}

/** Sanitization Helpers **/

function sanitizeExcerpt(input: string): string {
  const noHtml = input.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML
  const decoded = decode(noHtml);
  return decoded.trim().replace(/\n/g, "");
}

function sanitizeContent(input: string): string {
  return decode(input).trim(); // Add full HTML sanitization if needed
}

/** Blog Post Fetching **/

export async function fetchBlogPosts(): Promise<DataProps> {
  try {
    const response = await wpquery({
      query: `
        query GetPostExcerpts {
          posts(first:1000) {
            nodes {
              title
              dateGmt
              slug
              excerpt
              content
              tags {
                nodes {
                  name
                  slug
                  count
                }
              }
              featuredImage {
                node {
                  mediaItemUrl
                  altText
                }
              }
            }
          }
        }
      `,
    });

    if (response.posts?.nodes) {
      const sanitizedPosts = response.posts.nodes.map((post: PostProps) => ({
        ...post,
        excerpt: sanitizeExcerpt(post.excerpt),
        content: sanitizeContent(post.content || ""),
      }));
      return { posts: { nodes: sanitizedPosts } };
    } else {
      return { posts: { nodes: [] } };
    }
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
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
              content
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
        content: sanitizeContent(latestPost.content || ""),
      };
    } else {
      return {
        dateGmt: "",
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        tags: { nodes: [] },
      };
    }
  } catch (error) {
    console.error("Failed to fetch latest post:", error);
    return {
      dateGmt: "",
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      tags: { nodes: [] },
    };
  }
}

/** Page Fetching **/

export const fetchPageContent = async (
  slug: string
): Promise<{ title: string; content: string }> => {
  try {
    const response = await wpquery({
      query: `
        query GetPageContent {
          pages {
            nodes {
              title
              content
              slug
            }
          }
        }
      `,
    });

    const page = response.pages?.nodes?.find((p: PageNode) => p.slug === slug);

    return page
      ? {
          title: page.title,
          content: sanitizeContent(page.content),
        }
      : {
          title: "Title not found",
          content: "Content not found",
        };
  } catch (error) {
    console.error("Failed to fetch page content:", error);
    return {
      title: "Error loading page",
      content: "There was a problem loading this content.",
    };
  }
};

/** Tags Deduplication **/

export function getUniqueTags(posts: PostProps[]): Tag[] {
  const tagMap = new Map<string, Tag>();
  for (const post of posts) {
    for (const tag of post.tags.nodes) {
      tagMap.set(tag.slug, tag);
    }
  }
  return Array.from(tagMap.values());
}
