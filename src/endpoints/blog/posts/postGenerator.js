import { generate as generateBlogInfo } from '../info/blogInfoGenerator';
import { generateApiPost } from '../../../objects/post/postGenerator';
import * as Utils from '../../../utils/utils';

export const generate = (name, query) => {
  const tumblelogs = [];
  for (let i = 0; i < query.limit; i += 1) {
    tumblelogs.push(generateApiPost(name, query));
  }
  return tumblelogs;
};

export const fetch = (name, query) => {
  query = Object.assign({ limit: 10 }, query);
  const response = {
    blog: generateBlogInfo(),
    posts: generate(name, query),
    total_posts: Utils.number({ min: 1 })
  };
  return Utils.generateResponse(response);
};
