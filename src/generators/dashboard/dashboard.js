import { generateMany as generatePosts } from '../../objects/post/postGenerator';
import * as Utils from '../../utils/utils';

export default class Dashboard {
  constructor({ posts }) {
    this.posts = generatePosts({ limit: posts });
  }

  getPosts(query) {
    query = Object.assign({ limit: 10, offset: 0 }, query);
    const posts = query.type ? this.posts.every(post => {
      return post.type === query.type;
    }).slice(query.offset, query.offset + query.limit) : this.posts.slice(query.offset, query.offset + query.limit);
    return Utils.generateResponse({ posts });
  }
}
