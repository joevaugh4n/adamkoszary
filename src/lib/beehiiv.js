import { BeehiivClient } from 'beehiiv'
const client = new BeehiivClient({ token: 'YOUR_TOKEN' })
await client.posts.get(
  'post_00000000-0000-0000-0000-000000000000',
  'pub_00000000-0000-0000-0000-000000000000'
)

console.log(client.posts)
