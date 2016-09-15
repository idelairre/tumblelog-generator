import { number, sample } from '../../utils/utils';
import corpus from '../../corpus/nameCorpus.json';
import prefixes from '../../corpus/prefixes.json';

const flavor = tumblelog => {
  const seperators = ['-', '_', '', '-and-'];
  let modifier = sample(corpus.concat(['girl', 'asexual', 'buddy', 'hoe', 'biddy', 'demonic', 'anarchy', 'left', 'lit', 'succubus', 'soft', 'rude', 'grunge', 'slut', 'blood', 'minus', 'communist', 'loser', 'mermaid', 'fox', 'scorpio', 'queer', 'antifa', '69', 'trans', 'supa', 'slayin', 'words', 'poly']));
  const rand = number({
    min: 0,
    max: 7
  });
  switch (rand) {
    case 0:
      return tumblelog + sample(seperators) + modifier;
    case 1:
      return modifier + sample(seperators) + tumblelog;
    case 3:
      return tumblelog + sample(corpus);
    case 4:
      return tumblelog + sample(corpus) + sample(corpus);
    case 5:
      return tumblelog + sample(corpus) + sample(corpus);
    case 6:
      return sample(prefixes) + sample(seperators) + tumblelog;
    case 7:
      return tumblelog;
    default:
      return sample(prefixes) + tumblelog;
  }
}

const generate = () => {
  return flavor(sample(corpus));
}

export default generate;
