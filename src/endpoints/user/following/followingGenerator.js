import Generator from '../../../generators/generators';
import * as Utils from '../../../utils/utils';

export const generateFollowing = (name = Generator.name.tumblelog()) => {
  const user = {
    name,
    title: Generator.title.template(),
    updated: Utils.timestamp(),
    description: Generator.description.template()
  };
  return user;
}

export const generateFollowings = num => {
  const following = [];
  for (let i = 0; i < num; i += 1) {
    tumblelogs.push(generateFollowing());
  }
  return following;
}

export const fetch = query => {
  query = Object.assign({ limit: 10 }, query);
  const blogs = generateFollowing(query.limit);
  return Utils.generateResponse(blogs);
}
