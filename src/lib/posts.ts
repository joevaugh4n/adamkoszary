import { wpquery } from "./wordpress";

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

export async function fetchBlogPosts(): Promise<DataProps> {
  try {
    const response = await wpquery({
      query: `
        query GetPostExcerptsAndAllTags {
          posts {
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
      return response as DataProps;
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
      return response.posts.nodes[0];
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
