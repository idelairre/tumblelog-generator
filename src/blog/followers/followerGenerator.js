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
  return Utils.populate(new Array(num), generate());
};

export const fetch = query => {
  query = Object.assign({ limit: 10 }, query);
  const response = {
    total_followers: Utils.number(),
    users: generateMany(query.limit)
  };
  return Utils.generateResponse(response);
};
