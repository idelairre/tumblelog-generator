import { number, sample } from '../../utils/utils';
import pos from '../../corpus/pos.json';
import corpus from '../../corpus/nameCorpus.json';
import prefixes from '../../corpus/prefixes.json';

const replaceUs = tumblelog => {
  return tumblelog.replace(/uU/g, 'v');
}

const tumblrMod = () => {
  const modifiers = corpus.concat(pos.NN, ['meme', 'girl', 'asexual', 'buddy', 'hoe', 'biddy', 'demonic', 'anarchy', 'left', 'lit', 'succubus', 'soft', 'rude', 'grunge', 'slut', 'blood', 'minus', 'communist', 'loser', 'mermaid', 'fox', 'scorpio', 'queer', 'antifa', '69', 'trans', 'supa', 'slayin', 'words', 'poly']);
  return sample(modifiers).toLowerCase();
}

const prefix = () => {
  return sample(prefixes);
}

const seperator = () => {
  const seperators = ['-', '_', '-and-', '-was-'];
  return sample(seperators);
}

const aestheticize = tumblelog => {
  switch (number({ min: 0, max: 1 })) {
    case 0:
      return replaceUs(tumblelog).toLowerCase();
    case 1:
      return replaceUs(tumblelog).toUpperCase();
  }
}

const afrofutureMod = () => {
  const modifiers = ['bantu', 'paranoid', 'static', 'voodoo', 'funk', 'african', 'afro', 'ebon', 'vegro', 'onfleek', 'future', 'queen', 'space', 'black', 'galactica', 'afryllic', 'negra'];
  return sample(modifiers);
}

const flavor = tumblelog => {
  let word = sample(pos.NNS);
  switch (number({ min: 0, max: 21 })) {
    case 0:
      return tumblelog.toLowerCase() + seperator() + tumblrMod();
    case 1:
      return tumblrMod() + seperator() + tumblelog;
    case 3:
      return tumblelog + sample(corpus);
    case 4:
      return tumblelog + sample(corpus) + sample(corpus);
    case 5:
      return tumblelog + sample(corpus) + sample(corpus);
    case 6:
      return prefix() + seperator() + tumblelog;
    case 7:
      return `${word}-${word}`;
    case 8:
      return aestheticize(tumblelog + seperator() + tumblrMod());
    case 9:
      return aestheticize(tumblrMod() + seperator() + tumblelog);
    case 10:
      return aestheticize(tumblelog + sample(corpus));
    case 11:
      return aestheticize(tumblelog + sample(corpus) + sample(corpus));
    case 12:
      return aestheticize(tumblelog + sample(corpus) + sample(corpus));
    case 13:
      return aestheticize(prefix() + seperator() + tumblelog);
    case 14:
      return afrofutureMod() + tumblelog;
    case 15:
      return tumblelog + afrofutureMod();
    case 16:
      return afrofutureMod() + seperator() + tumblelog;
    case 17:
      return tumblelog + seperator() + afrofutureMod();
    case 18:
      return aestheticize(prefix() + tumblelog + afrofutureMod());
    case 19:
      return aestheticize(afrofutureMod() + seperator() + tumblelog);
    case 20:
      return `${tumblelog.toLowerCase()}-${sample(pos.IN).toLowerCase()}-${sample(pos.PRP).toLowerCase()}`;
    default:
      return prefix() + tumblelog;
  }
}

const generate = () => {
  return flavor(sample(corpus).trim()).toLowerCase();
}

export default generate;
