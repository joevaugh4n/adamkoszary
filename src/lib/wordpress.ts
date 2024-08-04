export const siteUrl: string = `adamkoszary.co.uk`;
export const wordpressSite: string = `https://${siteUrl}/wp-json/wp/v2`;

// Page content


/** 
query GetPostContent {
  posts {
    nodes {
      featuredImage {
        node {
          mediaItemUrl
          altText
        }
      }
      content(format: RENDERED)
      author {
        node {
          name
        }
      }
    }
  }
}

query GetPostExcerpts {
  posts {
    nodes {
      title
      date
      excerpt
      featuredImage {
        node {
          mediaItemUrl
          altText
        }
      }
    }
  }
}
*/

interface WPGraphQLParams {
  query: string;
  variables?: object;
}

export async function wpquery({ query, variables = {} }: WPGraphQLParams) {

  const res = await fetch('https://adamkoszary.co.uk/graphql', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      { query, variables })
  });

  if (!res.ok) {
    console.error(res);
    return {}
  }


  const { data } = await res.json();

  return data;
}