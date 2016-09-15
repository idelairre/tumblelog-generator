import generateDescription from '../../generators/description/descriptionGenerator';
import generateName from '../../generators/name/nameGenerator';
import generateTitle from '../../generators/title/titleGenerator';
import * as Utils from '../../utils/utils';

export const generate = (name = generateName()) => {
  const user = {
    name,
    title: generateTitle(),
    updated: Utils.timestamp(),
    description: generateDescription()
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
