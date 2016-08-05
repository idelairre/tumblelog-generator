import { defaults } from 'lodash';
import { generateApiPost } from '../../../objects/post/postGenerator';
import { generateResponse } from '../../../utils/utils';

export const generateLike = query => {
  const post = generateApiPost(null, query);
  post.liked = true;
  return post;
};

export const generateLikes = query => {
  const likes = [];
  for (let i = 0; i < query.limit; i += 1) {
    likes.push(generateLike(query.type));
  }
  return likes;
};

export const fetch = query => {
  query = defaults(query, { limit: 10 });
  console.log(query);
  const response = {
    posts: generateLikes(query)
  };
  return generateResponse(response);
};
