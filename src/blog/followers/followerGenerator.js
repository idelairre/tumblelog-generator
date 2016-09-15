import nameGenerator from '../../generators/name/nameGenerator';
import { generateResponse, number, populate, timestamp, tumblrUrl } from '../../utils/utils';

export const generate = (name = nameGenerator()) => {
  const follower = {
    name,
    following: true,
    url: tumblrUrl(name),
    updated: timestamp()
  };
  return follower;
};

export const generateMany = (num = 10) => {
  return populate(new Array(num), generate());
};

export const fetch = query => {
  query = Object.assign({ limit: 10 }, query);
  const response = {
    total_followers: number(),
    users: generateMany(query.limit)
  };
  return generateResponse(response);
};
