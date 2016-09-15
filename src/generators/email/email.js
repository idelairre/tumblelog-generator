import generateName from '../name/nameGenerator';
import { sample } from '../../utils/utils';

const email = (name = generateName()) => {
  const provider = sample(['gmail', 'hotmail', 'aol', 'yahoo']);
  return `${name}@${provider}.com`;
};

export default email;
