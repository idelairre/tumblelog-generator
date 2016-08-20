import { generate as generateBlogInfo } from '../info/blogInfoGenerator';
import { generateApiPost } from '../../objects/post/postGenerator';
import * as Utils from '../../utils/utils';

export const generate = generateApiPost;

export const generateMany = query => {
  return Utils.populate(new Array(query.limit), generate(query));
};

export const fetch = (name, query) => {
  query = Object.assign({ limit: 10, blog_name: name }, query);
  const response = {
    blog: generateBlogInfo(name),
    posts: generateMany(query),
    total_posts: Utils.number({ min: 1 })
  };
  return Utils.generateResponse(response);
};
