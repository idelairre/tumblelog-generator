import { defaults } from 'lodash';
import { generateBlogInfo } from '../info/blogInfoGenerator';
import { generateApiPost, randomType } from '../../../objects/post/postGenerator';
import * as Utils from '../../../utils/utils';

export const generateBlogPost = (name, type) => {
  return generateApiPost(name, type);
};

export const generateBlogPosts = (name, query) => {
  const tumblelogs = [];
  for (let i = 0; i < query.limit; i += 1) {
    tumblelogs.push(generateBlogPost(name, query));
  }
  return tumblelogs;
};

export const fetch = (name, { type = randomType(true), limit = 10 } = {}) => { // not too sure about this
  const response = {
    blog: generateBlogInfo(),
    posts: generateBlogPosts(name, { type, limit }),
    total_posts: Utils.number({ min: 1 })
  };
  return Utils.generateResponse(response);
};
