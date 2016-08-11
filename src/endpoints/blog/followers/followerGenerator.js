import Generator from '../../../generators/generators';
import * as Utils from '../../../utils/utils';

export const generateFollower = (name = Generator.name()) => {
  const follower = {
    name,
    following: true,
    url: Utils.tumblrUrl(name),
    updated: Utils.timestamp()
  };
  return follower;
};

export const generateFollowers = (num = 10) => {
  const tumblelogs = [];
  for (let i = 0; i < num; i += 1) {
    tumblelogs.push(generateFollower());
  }
  return tumblelogs;
};

export const fetch = (query = { limit: 10 }) => {
  const response = {
    total_followers: Utils.number(),
    users: generateFollowers(query.limit)
  };
  return Utils.generateResponse(response);
};
