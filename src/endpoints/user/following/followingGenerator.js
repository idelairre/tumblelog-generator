import Generator from '../../../generators/generators';
import * as Utils from '../../../utils/utils';

export const generateFollowing = (name = Generator.name()) => {
  const user = {
    name,
    title: Generator.title(),
    updated: Utils.timestamp(),
    description: Generator.description()
  };
  return user;
};

export const generateFollowings = num => {
  const following = [];
  for (let i = 0; i < num; i += 1) {
    following.push(generateFollowing());
  }
  return following;
};

export const fetch = query => {
  query = Object.assign({ limit: 10 }, query);
  const blogs = generateFollowing(query.limit);
  return Utils.generateResponse(blogs);
};
