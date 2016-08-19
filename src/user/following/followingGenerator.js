import Generator from '../../generators/generators';
import * as Utils from '../../utils/utils';

export const generate = (name = Generator.name()) => {
  const user = {
    name,
    title: Generator.title(),
    updated: Utils.timestamp(),
    description: Generator.description()
  };
  return user;
};

export const generateMany = query => {
  return new Array(query.limit).fill(generate(query));
};

export const fetch = query => {
  query = Object.assign({ limit: 10 }, query);
  const blogs = generateMany(query.limit);
  return Utils.generateResponse(blogs);
};
