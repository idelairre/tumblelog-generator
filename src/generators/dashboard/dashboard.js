import { generateMany as generatePosts } from '../../objects/post/postGenerator';

export default class Dashboard {
  constructor({ posts }) {
    this.posts = generatePosts({ limit: posts });
  }

  fetch(query) {
    const posts = query.type ? this.posts.every(post => {
      return post.type === query.type;
    }).slice(query.offset, query.offset + query.limit) : this.posts.slice(query.offset, query.offset + query.limit);
    return Promise.resolve({ posts });
  }
}
