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
  query = Object.assign({ limit: 10 }, query);
  const response = {
    posts: generateLikes(query)
  };
  return generateResponse(response);
};
