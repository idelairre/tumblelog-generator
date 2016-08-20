import blog from './blog/blog';
import description from './description/descriptionGenerator';
import name from './name/nameGenerator';
import * as posts from '../objects/post/postGenerator';
import * as tumblelog from '../objects/tumblelog/tumblelogGenerator';
import title from './title/titleGenerator';
import user from './user/user';

const Generator = {
  name,
  blog,
  user,
  description,
  title,
  posts,
  tumblelog
};

// add blog and dashboard generator classes to hold persistant data

export default Generator;
