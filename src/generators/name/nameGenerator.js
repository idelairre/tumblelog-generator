import * as Utils from '../../utils/utils';
import corpus from '../../corpus/nameCorpus.json';
import prefixes from '../../corpus/prefixes.json';

const flavor = tumblelog => {
  const seperators = ['-', '_', '', '-and-'];
  let modifier = Utils.sample(corpus.concat(['girl', 'asexual', 'buddy', 'hoe', 'biddy', 'demonic', 'anarchy', 'left', 'lit', 'succubus', 'soft', 'rude', 'grunge', 'slut', 'blood', 'minus', 'communist', 'loser', 'mermaid', 'fox', 'scorpio', 'queer', 'antifa', '69', 'trans', 'supa', 'slayin', 'words', 'poly']));
  const rand = Utils.number({
    min: 0,
    max: 7
  });
  switch (rand) {
    case 0:
      return tumblelog + Utils.sample(seperators) + modifier;
    case 1:
      return modifier + Utils.sample(seperators) + tumblelog;
    case 3:
      return tumblelog + Utils.sample(corpus);
    case 4:
      return tumblelog + Utils.sample(corpus) + Utils.sample(corpus);
    case 5:
      return tumblelog + Utils.sample(corpus) + Utils.sample(corpus);
    case 6:
      return Utils.sample(prefixes) + Utils.sample(seperators) + tumblelog;
    case 7:
      return tumblelog;
    default:
      return Utils.sample(prefixes) + tumblelog;
  }
}

const generate = () => {
  return flavor(Utils.sample(corpus));
}

export default generate;
