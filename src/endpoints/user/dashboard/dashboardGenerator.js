import { generateApiPost } from '../../../objects/post/postGenerator';
import { generateResponse } from '../../../utils/utils';

export const generateDashboardPosts = (name, num = 10) => {
  const posts = [];
  for (let i = 0; i < num; i += 1) {
    posts.push(generateApiPost());
  }
  return posts;
};

export const fetch = (name, query = { limit: 10, offset: 0 }) => {
  const response = {
    posts: generateDashboardPosts(name, query.limit)
  };
  return generateResponse(response);
};
