import generateTitle from '../title/titleGenerator';
import { number, without } from '../../utils/utils';

const words = (length = number(12)) => {
  const words = without(generateTitle().split(' ').slice(0, length), '');
  return words.map(word => word.replace(/\W/g, ''));
};

export default words;
