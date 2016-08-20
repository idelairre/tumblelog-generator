import { generateApiPost } from '../../objects/post/postGenerator';
import * as Utils from '../../utils/utils';

export const generate = query => {
  query.liked = true;
  const post = generateApiPost(query);
  return post;
}

export const generateMany = query => {
  query = Object.assign({ limit: 10 }, query);
  return Utils.populate(new Array(query.limit), generate(query));
};

export const fetch = query => {
  const response = {
    posts: generateMany(query)
  };
  return Utils.generateResponse(response);
};
