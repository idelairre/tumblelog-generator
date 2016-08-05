import { defaults } from 'lodash';
import { generateBlogInfo } from '../info/blogInfoGenerator';
import { generateApiPost, randomType } from '../../../objects/post/postGenerator';
import * as Utils from '../../../utils/utils';

export const generateBlogPosts = (name, query) => {
  const tumblelogs = [];
  for (let i = 0; i < query.limit; i += 1) {
    tumblelogs.push(generateApiPost(name, query));
  }
  return tumblelogs;
};

export const fetch = (name, query) => {
  query = defaults(query, { limit: 10 });
  const response = {
    blog: generateBlogInfo(),
    posts: generateBlogPosts(name, query),
    total_posts: Utils.number({ min: 1 })
  };
  return Utils.generateResponse(response);
};
