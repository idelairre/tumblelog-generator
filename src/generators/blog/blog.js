import { generateMany as generateFollowers } from '../../blog/followers/followerGenerator';
import { generateMany as generatePosts } from '../../objects/post/postGenerator';
import { generate as generateBlogInfo } from '../../blog/info/blogInfoGenerator';
import name from '../name/nameGenerator';
import * as Utils from '../../utils/utils';

export default class Blog {
  constructor({ name, followers, posts, likes }) {
    this.posts = generatePosts({
      limit: posts,
      blog_name: name
    });
    this.followers = generateFollowers({
      limit: followers
    });
    this.likes = generatePosts({
      limit: likes
    });
    this.info = generateBlogInfo(name);
  }

  getInfo() {
    return Utils.generateResponse({
      blog: this.info
    });
  }

  getFollowers(query) {
    query = Object.assign({ limit: 10, offset: 0 }, query);
    const followers = this.followers.slice(query.offset, query.offset + query.limit);
    return Utils.generateResponse({
      users: followers,
      total_followers: followers.length
    });
  }

  getLikes(query) {
    query = Object.assign({ limit: 10, offset: 0 }, query);
    const likes = query.type ? this.likes.every(post => {
      return post.type === query.type;
    }).slice(query.offset, query.offset + query.limit) : this.likes.slice(query.offset, query.offset + query.limit);
    return Utils.generateResponse({
      likes
    });
  }

  getPosts(query) {
    query = Object.assign({ limit: 10, offset: 0 }, query);
    const posts = query.type ? this.posts.every(post => {
      return post.type === query.type;
    }).slice(query.offset, query.offset + query.limit) : this.posts.slice(query.offset, query.offset + query.limit);
    return Utils.generateResponse({
      blog: this.info,
      posts,
      total_posts: this.posts.length
     });
  }
}
