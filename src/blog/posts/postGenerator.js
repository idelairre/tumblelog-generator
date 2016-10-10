import { generate as generateBlogInfo } from '../info/blogInfoGenerator';
import { generateApiPost } from '../../objects/post/postGenerator';
import { generateResponse, number, populate } from '../../utils/utils';

export const generate = query => generateApiPost(query);

export const generateMany = query => {
  return populate(new Array(query.limit), generateApiPost.bind(this, query));
};

export const fetch = (name, query) => {
  query = Object.assign({ limit: 10, blog_name: name }, query);
  const response = {
    blog: generateBlogInfo(name),
    posts: generateMany(query),
    total_posts: number({ min: 1 })
  };
  return generateResponse(response);
};
