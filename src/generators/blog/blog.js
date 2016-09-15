import generate from '../name/nameGenerator';
import { generateMany as generateFollowers } from '../../blog/followers/followerGenerator';
import { generateMany as generatePosts } from '../../objects/post/postGenerator';
import { generate as generateBlogInfo } from '../../blog/info/blogInfoGenerator';
import generateName from '../name/nameGenerator';
import { generateResponse } from '../../utils/utils';

export default class Blog {
  constructor({ name = generateName(), followers = 25, posts = 40, likes = 50 } = {}) {
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
    return generateResponse({
      blog: this.info
    });
  }

  getFollowers(query) {
    query = Object.assign({ limit: 10, offset: 0 }, query);
    const followers = this.followers.slice(query.offset, query.offset + query.limit);
    return generateResponse({
      users: followers,
      total_followers: followers.length
    });
  }

  getLikes(query) {
    query = Object.assign({ limit: 10, offset: 0}, query);
    const likes = query.type ? this.likes.every(post => {
      return post.type === query.type;
    }) : this.likes;
    return generateResponse({
      likes: likes.slice(query.offset, query.offset + query.limit)
    });
  }

  getPosts(query) {
    query = Object.assign({ limit: 10, offset: 0 }, query);
    const posts = query.type ? this.posts.every(post => {
      return post.type === query.type;
    }) : this.posts;
    if (!posts) {
      throw new Error('Posts undefined');
    }
    return generateResponse({
      blog: this.info,
      posts: posts.slice(query.offset, query.offset + query.limit),
      total_posts: this.posts.length
    });
  }
}
