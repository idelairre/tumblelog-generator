import generateName from '../name/nameGenerator';
import { sample } from '../../utils/utils';

const url = () => {
  const domainSuffix = sample(['.com', '.org']);
  const protocol = sample(['https://', 'http://']);
  const domain = generateName();
  return `${protocol}${domain}${domainSuffix}`;
};

export default url;
