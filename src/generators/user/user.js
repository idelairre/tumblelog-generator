import generateName from '../name/nameGenerator';
import { generateMany as generatePosts } from '../../objects/post/postGenerator';
import { generateMany as generateFollowing } from '../../user/following/followingGenerator';
import { generateResponse } from '../../utils/utils';

export default class User {
  constructor({ user, posts = 50, likes = 25, following = 25 } = {}) {
    this.user = user;
    this.posts = generatePosts({
      limit: posts
    });
    this.likes = generatePosts({
      limit: likes,
      liked: true
    });
    this.following = generateFollowing({
      limit: following
    });
  }

  getDashboard(query) {
    query = Object.assign({ limit: 10, offset: 0 }, query);
    const posts = query.type ? this.posts.every(post => {
      return post.type === query.type;
    }) : this.posts;
    return generateResponse({ posts: this.posts.slice(query.offset, query.offset + query.limit) });
  }

  getLikes(query) {
    query = Object.assign({ limit: 10, offset: 0 }, query);
    const likes = query.type ? this.likes.every(post => {
      return post.type === query.type;
    }).slice(query.offset, query.offset + query.limit) : this.likes.slice(query.offset, query.offset + query.limit);
    return generateResponse({ likes });
  }

  getFollowing(query) {
    query = Object.assign({ limit: 10, offset: 0 }, query);
    const blogs = this.following.slice(query.offset, query.offset + query.limit);
    return generateResponse({
      total_blogs: blogs.length,
      blogs
    });
  }
}
