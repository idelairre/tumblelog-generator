import * as followers from './followers/followerGenerator';
import * as info from './info/blogInfoGenerator';
import * as likes from './likes/likesGenerator';
import * as posts from './posts/postGenerator';

const Blog = {
  followers,
  info,
  likes,
  posts
}

export default Blog;
