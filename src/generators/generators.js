import * as name from './name/nameGenerator';
import * as description from './description/descriptionGenerator';
import * as posts from '../objects/post/postGenerator';
import * as tumblelog from '../objects/tumblelog/tumblelogGenerator';
import * as title from './title/titleGenerator';

const Generator = {
  name,
  description,
  title,
  posts,
  tumblelog
};

export default Generator;
