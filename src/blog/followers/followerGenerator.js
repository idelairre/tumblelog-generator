import Generator from '../../generators/generators';
import * as Utils from '../../utils/utils';

export const generate = (name = Generator.name()) => {
  const follower = {
    name,
    following: true,
    url: Utils.tumblrUrl(name),
    updated: Utils.timestamp()
  };
  return follower;
};

export const generateMany = (num = 10) => {
  return new Array(num).fill(generate());
};

export const fetch = query => {
  const response = {
    total_followers: Utils.number(),
    users: generateMany(query.limit)
  };
  return Utils.generateResponse(response);
};
