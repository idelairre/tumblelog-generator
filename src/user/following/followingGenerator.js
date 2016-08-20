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

export const generateMany = (num = 10) => {
  return Utils.populate(new Array(num), generate());
};

export const fetch = query => {
  query = Object.assign({ limit: 10 }, query);
  const blogs = generateMany(query.limit);
  const response = {
    total_blogs: Utils.number({ min: 0, max: 2000 }),
    blogs
  };
  return Utils.generateResponse(response);
};
