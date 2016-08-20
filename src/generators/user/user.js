import { generateMany as generatePosts } from '../../objects/post/postGenerator';
import { generateMany as generateFollowing } from '../../user/following/followingGenerator';
import * as Utils from '../../utils/utils';

export default class User {
  constructor({ posts, likes, following }) {
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
    }).slice(query.offset, query.offset + query.limit) : this.posts.slice(query.offset, query.offset + query.limit);
    return Utils.generateResponse({ posts });
  }

  getLikes(query) {
    query = Object.assign({ limit: 10, offset: 0 }, query);
    const likes = query.type ? this.likes.every(post => {
      return post.type === query.type;
    }).slice(query.offset, query.offset + query.limit) : this.likes.slice(query.offset, query.offset + query.limit);
    return Utils.generateResponse({ likes });
  }

  getFollowing(query) {
    query = Object.assign({ limit: 10, offset: 0 }, query);
    const blogs = this.following.slice(query.offset, query.offset + query.limit);
    return Utils.generateResponse({
      total_blogs: blogs.length,
      blogs
    });
  }
}
