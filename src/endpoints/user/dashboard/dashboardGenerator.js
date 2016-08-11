import { generateApiPost, randomType } from '../../../objects/post/postGenerator';
import * as Utils from '../../../utils/utils';

export const generateDashboardPosts = query => {
  query = Object.assign({ limit: 10 }, query);
  const posts = [];
  for (let i = 0; i < query.limit; i += 1) {
    posts.push(generateApiPost(null, query));
  }
  return posts;
};

export const fetch = query => {
  const response = {
    posts: generateDashboardPosts(query)
  };
  return Utils.generateResponse(response);
};
