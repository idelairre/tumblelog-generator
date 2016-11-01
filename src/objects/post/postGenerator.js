import generateDescription from '../../generators/description/descriptionGenerator';
import generateTitle from '../../generators/title/titleGenerator';
import { generate as generateTumblelog } from '../tumblelog/tumblelogGenerator';
import generateName from '../../generators/name/nameGenerator';
import sentence from '../../generators/sentence/sentence';
import paragraph from '../../generators/paragraph/paragraph';
import words from '../../generators/words/words';
import url from '../../generators/url/url';
import * as Utils from '../../utils/utils';

const contentRating = () => {
  return Utils.sample(['adult', 'nsfw']);
};

const randomType = (api = false) => {
  let types = ['photo', 'photoset', 'quote', 'note', 'video', 'answer', 'link', 'chat'];
  if (api) {
    return Utils.sample(Utils.without(types.concat(['text']), 'photoset', 'note'));
  }
  return Utils.sample(types);
};

const randomFont = () => {
  return Utils.sample(['Helvetica', 'Times New Roman', 'Streetscript']);
};

const randomState = () => {
  return Utils.sample(['published', 'queued', 'draft', 'private']);
};

const randomFormat = () => {
  return Utils.sample(['html', 'markdown']);
};

const generateDialogue = (num = Utils.number({ min: 1, max: 5 })) => {
  const dialogue = [];
  for (let i = 0; i < num; i += 1) {
    const name = generateName();
    dialogue.push({
      label: name,
      name: name,
      phrase: generateDescription() // NOTE: these results are crappy, maybe pull from a corpus of chat logs?
    });
  }
  return dialogue;
}

const generateId = () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let id = '1';
  for (let i = 0; i < 11; i += 1) {
    id += Utils.sample(numbers);
  }
  return parseInt(id);
};

const generateAudioPlayer = () => {
  return `<embed type="application/x-shockwave-flash" src=http://assets.tumblr.com/swf/audio_player.swf?audio_file=http://tumblr.com/audio_file/${Utils.number()}/tumblr_${Utils.uuid(17)}&color=${Utils.color()}&logo=soundcloud" height="27" width="207" quality="best"></embed>`
}

const generateVideoPlayer = () => {
  const sizes = [{ width: 250, height: 169 }, { width: 400, height: 251 }, { width: 500, height: 305 }];
  const player = [];
  sizes.forEach(size => {
    const embed = `<object width="${size.width}" height="${size.height}"><param name="movie" value="http://youtube.com/${Utils.uuid(11)}&rel=0&egm=0&showinfo=0&fs=1"></param><param name="wmode" value="transparent"></param><param name="allowFullScreen" value="true"></param><embed src="http://youtube/v/${Utils.uuid(11)}&rel=0&egm=0&showinfo=0&fs=1" type="application/x-shockwave-flash" width="${size.width}" height="${size.height} allowFullScreen="true" wmode="transparent"></embed></object>`;
    player.push({
      width: size.width,
      embed_code: embed
    });
  });
  return player;
}

const generateStaticAsset = (filetype = 'jpg') => {
  return `https://secure.static.tumblr.com/${Utils.uuid()}/${Utils.uuid()}/${Utils.uuid()}/tumblr_static_${Utils.uuid()}.${filetype}`;
};

const generateMediaAsset = (size, filetype = 'jpg') => {
  return `http://${Utils.number({ min: 20, max: 99 })}.media.tumblr.com/tumblr_${Utils.uuid(19)}_${size}${size === 75 ? 'sq' : ''}.${filetype}`;
};

const generatePostSlug = (title = generateTitle()) => {
  return title.replace(/\W+/g, '-').toLowerCase();
};

const generatePostUrl = (tumblelog = generateName(), id = generateId(), title = generateTitle()) => {
  return `${Utils.tumblrUuid(tumblelog)}/post/${id}/${generatePostSlug(title)}`;
};

const generateTinyUrl = () => {
  const end = Utils.uuid(8);
  return `https://tmblr.co/${end}`;
};

const generatePhotos = (num = Utils.number({ min: 1, max: 5 })) => {
  const photos = [];
  const sizes = [{ width: 1280, height: 722 }, { width: 500, height: 282 }, { width: 400, height: 225 }, { width: 250, height: 141 }, { width: 100, height: 56 }, { width: 75, height: 75 }];
  for (let i = 0; i < num; i += 1) {
    const response = {
      caption: Utils.sample(['', generateTitle()]),
      alt_sizes: []
    };
    for (let j = 0; j < sizes.length; j += 1) {
      const size = Object.assign(sizes[j], {
        url: generateMediaAsset(sizes[j].width)
      });
      response.alt_sizes.push(size);
    }
    photos.push(response);
  }
  return photos;
}

const generateTrail = (num = Utils.number({ min: 0, max: 2 })) => {
  const trail = [];
  for (let i = 0; i < num; i += 1) {
    const response = {
      blog: {
        name: generateName(),
        active: Utils.boolean(),
        theme: {
          avatar_shape: Utils.sample(['circle', 'square']),
          background_color: Utils.color(),
          body_font: randomFont(),
          header_bounds: Utils.sample([0, `${Utils.number({ max: 2000 })}, ${Utils.number({ max: 2000 })}, ${Utils.number({ max: 2000 })}, ${Utils.number({ max: 2000 })}`]),
          header_image: generateStaticAsset(),
          header_image_focused: generateStaticAsset(),
          header_image_scaled: generateStaticAsset(),
          header_stretch: Utils.boolean(),
          link_color: Utils.color(),
          show_avatar: Utils.boolean(),
          show_description: Utils.boolean(),
          show_header_image: Utils.boolean(),
          show_title: Utils.boolean(),
          title_color: Utils.color(),
          title_font: randomFont(),
          title_font_weight: Utils.sample(['bold', 'regular'])
        },
        share_likes: Utils.boolean(),
        share_following: Utils.boolean()
      },
      post: {
        id: generateId()
      },
      content_raw: '',
      content: ''
    };
    if (Utils.boolean()) {
      Object.assign(response.blog.theme, {
        header_full_width: Utils.number({ min: 500, max: 750 }),
        header_full_height: Utils.number({ min: 300, max: 400 }),
        header_focus_width: Utils.number({ min: 400, max: 500 }),
        header_focus_height: Utils.number({ min: 250, max: 300 })
      });
    }
    trail.push(response);
  }
  return trail;
};

const flavor = tumblelog => {
  const modifier = Utils.sample(['anarchy', 'slut', 'blood', 'communist', 'mermaid', 'fox', 'scorpio', 'queer', 'antifa', '69', 'trans', 'supa', 'slayin', 'words', 'poly']);
  if (Utils.boolean()) {
    return `${tumblelog}${Utils.sample('-', '_', '', '-and-') + modifier}`;
  }
  return modifier + tumblelog;
};

export const generateClientPost = ({
  tumblelog = generateName(),
  type = randomType()
} = {}) => {
  const id = generateId();
  const post = {
    'accepts-answers': Utils.boolean(),
    'blog_name': tumblelog,
    'direct-video': '',
    'id': id,
    'is-animated': Utils.boolean(),
    'is-pinned': false,
    'is_mine': false,
    'is_reblog': Utils.boolean(),
    'is_recommended': false,
    'liked': Utils.boolean(),
    'log-index': Utils.number({ min: 0, max: 2 }),
    'note_count': Utils.number(),
    'placement_id': null,
    'post-id': id.toString(),
    'premium-tracked': null,
    'pt': Utils.uuid(),
    'recommendation-reason': null,
    'root_id': id,
    'serve-id': Utils.uuid(),
    'share_popover_data': {
      'abuse_url': 'https://www.tumblr.com/abuse',
      'embed_did': Utils.uuid(),
      'embed_key': Utils.uuid(),
      'has_facebook': Utils.boolean(),
      'has_user': Utils.boolean(),
      'is_private': Utils.sample([0, 1]),
      'permalink_label': 'Permalink',
      'pinterest_share_window': {},
      'post_id': id,
      'post_tiny_url': generateTinyUrl(),
      'post_url': generatePostUrl(), // tumblruid
      'root_id': id.toString(),
      'show_flagging': Utils.boolean(),
      'show_pinterest': Utils.boolean(),
      'show_reddit': Utils.boolean(),
      'show_reporting_links': false,
      'tumblelog_name': tumblelog,
      'twitter_username': `@${generateName()}`
    },
    'sponsered': '',
    'tags': words(),
    'tumblelog': tumblelog,
    'tumblelog-data': generateTumblelog(tumblelog),
    'tumblelog-content-rating': contentRating(),
    'tumblelog-key': Utils.uuid(8),
    'tumblelog-name': tumblelog,
    'type': type
  };

  if (Utils.boolean()) {
    post['tumblelog-parent-data'] = generateTumblelog();
  } else {
    post['tumblelog-parent-data'] = false;
  }

  if (Utils.boolean() && post['tumblelog-parent-data']) {
    post['tumblelog-root-data'] = generateTumblelog();
  } else {
    post['tumblelog-root-data'] = false;
  }

  if (Utils.boolean()) {
    delete post['tumblelog-content-rating'];
  }

  return post;
};

export const generateApiPost = ({
  format = 'html',
  title = generateTitle(),
  name = generateName(),
  state = randomState(),
  type = randomType(true),
  followed = Utils.boolean()
} = {}) => {
  const id = generateId();
  const post = {
    blog_name: name,
    id,
    post_url: generatePostUrl(name, id, title),
    slug: generatePostSlug(title),
    type: type,
    date: Utils.past(),
    timestamp: Utils.timestamp(),
    state: state,
    format: format,
    reblog_key: Utils.uuid(8),
    tags: words(),
    short_url: generateTinyUrl(),
    summary: generateDescription(),
    recommended_source: null,
    recommended_color: null,
    followed: followed,
    highlighted: [],
    liked: Utils.boolean(),
    note_count: Utils.number(),
    trail: generateTrail(),
    can_send_in_message: Utils.boolean(),
    can_reply: Utils.boolean()
  };
  if (Utils.boolean()) {
    post.reblog = {
      tree_html: '', // figure out what this looks like
      comment: ''
    };
  }
  return appendTypeAttributes(post);
};

const appendTypeAttributes = post => {
  // if (post.type === 'photo' || post.type === 'quote') {
  //   Object.assign(post, {
  //     source_url: generatePostUrl(post.blog_name, post.id),
  //     source_title: generateName()
  //   });
  // }
  if (post.type === 'photo') {
    Object.assign(post, {
      // image_permalink: '', // find a way to generate a realistic one of these
      photos: generatePhotos(),
      caption: Utils.wrap(generateDescription(), 'p')
    });
    if (Utils.boolean()) {
      post.photoset_layout = '111';
    }
  } else if (post.type === 'text') {
    Object.assign(post, {
      title: sentence(),
      body: Utils.wrap(paragraph(), 'p')
    });
  } else if (post.type === 'quote') {
    const source = generateName();
    Object.assign(post, {
      text: sentence(),
      source: `<a href="${url()}" target="_blank">${source}</a>`,
      source_url: generatePostUrl(post.blog_name, post.id),
      source_title: generateName()
    });
    if (Utils.boolean()) {
      const source2 = generateName();
      post.source += `(via <a href="${url()}" target="_blank">${source2}</a>`;
    }
  } else if (post.type === 'link') {
    Object.assign(post, {
      link_author: generateName(),
      link_image: '',
      link_image_dimensions: '',
      title: generateTitle(),
      url: url(),
      excerpt: generateDescription(),
      publisher: url(),
      photos: generatePhotos(),
      description: Utils.wrap(generateDescription(), 'blockquote', 'p') // TODO: write function that wraps text in blockquotes and p tags
    });
  } else if (post.type === 'chat') {
    Object.assign(post, {
      body: generateDescription(),
      dialogue: generateDialogue(),
      title: generateTitle(),
      source_url: generatePostUrl(post.blog_name, post.id),
      source_title: generateName()
    });
  } else if (post.type === 'audio') {
    const player = generateAudioPlayer();
    Object.assign(post, {
      caption: sentence(),
      embed: player,
      player: player,
      plays: Utils.number(),
      audio_url: url(), // TODO: look at the way these are generated for soundcloud
      audio_source_url: url(),
      is_external: Utils.boolean(),
      audio_type: 'soundcloud',
      provider_url: url()
    });
  } else if (post.type === 'video') {
    Object.assign(post, {
      summary: generateTitle(),
      thumbnail_url: url(),
      video_type: 'youtube',
      html5_capable: true,
      player: generateVideoPlayer(),
      permalink_url: `https://www.youtube.com/watch?v=${Utils.uuid(11)}`,
      thumbnail_width: 480,
      thumbnail_height: 360
    });
  } else if (post.type === 'answer') {
    const asker = generateName();
    Object.assign(post, {
      asking_name: asker,
      asking_url: Utils.tumblrUrl(asker),
      question: sentence(),
      answer: Utils.wrap(sentence(), 'p') // TODO: wrap this in tags and shit
    });
  }
  return post;
}

export const generate = (query, api) => {
  if (!api) {
    return generateClientPost(query);
  }
  return generateApiPost(query);
};

export const generateMany = (query, api) => {
  query = Object.assign({ limit: 10 }, query);
  return Utils.populate(new Array(query.limit), generate.bind(this, query, api));
};

export default generateMany;
