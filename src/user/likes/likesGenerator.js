import { generateApiPost } from '../../objects/post/postGenerator';
import { generateResponse } from '../../utils/utils';

export const generate = query => {
  query.liked = true;
  const post = generateApiPost(query);
  return post;
}

export const generateMany = query => {
  query = Object.assign({ limit: 10 }, query);
  return new Array(query.limit).fill(generate(query));
};
export const fetch = query => {
  const response = {
    posts: generateMany(query)
  };
  return generateResponse(response);
};
