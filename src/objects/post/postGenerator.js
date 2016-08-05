import Faker from 'faker';
import { sample, truncate, kebabCase, without } from 'lodash';
import { generateTitleByTemplate, generateTitleByMarkovChain } from '../../generators/title/titleGenerator';
import generateTumblelogName from '../../generators/name/nameGenerator';
import { generateTumblelog } from '../tumblelog/tumblelogGenerator';
import * as Utils from '../../utils/utils';

export const contentRating = () => {
  return sample(['adult', 'nsfw']);
};

export const randomType = (api = false) => {
  let types = ['photo', 'photoset', 'quote', 'note', 'video', 'answer', 'link', 'chat'];
  if (api) {
    return sample(without(types.concat(['text']), 'photoset', 'note'));
  }
  return sample(types);
};

export const randomFont = () => {
  return sample(['Helvetica', 'Times New Roman', 'Streetscript']);
};

export const randomState = () => {
  return sample(['published', 'queued', 'draft', 'private']);
};

export const randomFormat = () => {
  return sample(['html', 'markdown']);
};

export const generateId = () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let id = '1';
  for (let i = 0; i < 11; i += 1) {
    id += sample(numbers);
  }
  return parseInt(id);
};

export const generateAudioPlayer = () => {
  return `<embed type="application/x-shockwave-flash" src=http://assets.tumblr.com/swf/audio_player.swf?audio_file=http://tumblr.com/audio_file/${Utils.number()}/tumblr_${Utils.uuid(17)}&color=${Utils.color()}&logo=soundcloud" height="27" width="207" quality="best"></embed>`
}

export const generateVideoPlayer = () => {
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

export const generateStaticAsset = (filetype = 'jpg') => {
  return `https://secure.static.tumblr.com/${Utils.uuid()}/${Utils.uuid()}/${Utils.uuid()}/tumblr_static_${Utils.uuid()}.${filetype}`;
};

export const generateMediaAsset = (size, filetype = 'jpg') => {
  return `http://${Utils.number({ min: 20, max: 99 })}.media.tumblr.com/tumblr_${Utils.uuid(19)}_${size}${size === 75 ? 'sq' : ''}.${filetype}`;
}

export const generatePostUrl = (tumblelog = generateTumblelogName(), id = generateId(), title = generateTitleByTemplate()) => {
  return `${Utils.generateTumblrUuid(tumblelog)}/post/${id}/${kebabCase(title)}`;
};

export const generateTinyUrl = () => {
  const end = Utils.uuid(8);
  return `https://tmblr.co/${end}`;
};

export const generatePhotos = (num = Utils.number({ min: 1, max: 5 })) => {
  const photos = [];
  const sizes = [{ width: 1280, height: 722 }, { width: 500, height: 282 }, { width: 400, height: 225 }, { width: 250, height: 141 }, { width: 100, height: 56 }, { width: 75, height: 75 }];
  for (let i = 0; i < num; i += 1) {
    const response = {
      caption: sample(['', generateTitleByTemplate()]),
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

export const generateTrail = (num = Utils.number({ min: 0, max: 2 })) => {
  const trail = [];
  for (let i = 0; i < num; i += 1) {
    const response = {
      blog: {
        name: generateTumblelogName(),
        active: Utils.boolean(),
        theme: {
          avatar_shape: sample(['circle', 'square']),
          background_color: Utils.color(),
          body_font: randomFont(),
          header_bounds: sample([0, `${Utils.number({ max: 2000 })}, ${Utils.number({ max: 2000 })}, ${Utils.number({ max: 2000 })}, ${Utils.number({ max: 2000 })}`]),
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
          title_font_weight: sample(['bold', 'regular'])
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

export const flavor = tumblelog => {
  const modifier = sample(['anarchy', 'slut', 'blood', 'communist', 'mermaid', 'fox', 'scorpio', 'queer', 'antifa', '69', 'trans', 'supa', 'slayin', 'words', 'poly']);
  if (Utils.boolean()) {
    return `${tumblelog}${sample('-', '_', '', '-and-') + modifier}`;
  }
  return modifier + tumblelog;
};

export const generateClientPost = (tumblelog = generateTumblelogName()) => {
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
      'is_private': sample([0, 1]),
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
      'twitter_username': `@${generateTumblelogName()}`
    },
    'sponsered': '',
    'tags': Utils.words(),
    'tumblelog': tumblelog,
    'tumblelog-content-rating': contentRating(),
    'tumblelog-key': Utils.uuid(8),
    'tumblelog-name': tumblelog,
    'type': randomType()
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

export const generateApiPost = (tumblelog = generateTumblelogName(), options = { type: false, state: 'published', format: false, followed: false }) => {
  const post = {
    blog_name: tumblelog,
    id: generateId(),
    post_url: Faker.internet.url(),
    type: options.type || randomType(true),
    date: Utils.past(),
    timestamp: Utils.generateTimestamp(),
    state: options.state || randomState(),
    format: options.format || randomFormat(),
    reblog_key: Utils.uuid(8),
    tags: Utils.words(),
    short_url: generateTinyUrl(),
    recommended_source: null,
    recommended_color: null,
    followed: options.followed || Utils.boolean(),
    highlighted: [],
    liked: Utils.boolean(),
    note_count: Utils.number(),
    trail: generateTrail(),
    can_send_in_message: Utils.boolean(),
    can_reply: Utils.boolean()
  };
  if (Utils.boolean()) {
    post.reblog = {
      tree_html: '',
      comment: ''
    };
  }
  return appendTypeAttributes(post);
};

const appendTypeAttributes = post => {
  if (post.type === 'photo' || post.type === 'quote') {
    Object.assign(post, {
      source_url: generatePostUrl(post.blog_name, post.id),
      source_title: generateTumblelogName()
    });
  }
  if (post.type === 'photo') {
    Object.assign(post, {
      image_permalink: '',
      photos: generatePhotos(),
      caption: '',
      summary: ''
    });
  } else if (post.type === 'text') {
    Object.assign(post, {
      title: Faker.lorem.sentence(),
      body: Faker.lorem.paragraph()
    });
  } else if (post.type === 'quote') {
    const source = generateTumblelogName();
    Object.assign(post, {
      text: Faker.lorem.sentence(),
      source: `<a href="${Faker.internet.url()}" target="_blank">${source}</a>`
    });
    if (Utils.boolean()) {
      const source2 = generateTumblelogName();
      post.source += `(via <a href="${Faker.internet.url()}" target="_blank">${source2}</a>`;
    }
  } else if (post.type === 'link') {
    Object.assign(post, {
      url: Faker.internet.url(),
      author: generateTumblelogName(),
      excerpt: generateTitleByTemplate(),
      publisher: Faker.internet.url(),
      photos: generatePhotos(),
      description: Faker.lorem.sentence()
    }); // TODO: write function that wraps text in blockquotes and p tags
  } else if (post.type === 'chat') {
    Object.assign(post, {
      body: '',
      dialogue: [] // TODO: implement function to create fake dialogue
    });
  } else if (post.type === 'audio') {
    const player = generateAudioPlayer();
    Object.assign(post, {
      caption: Faker.lorem.sentence(),
      embed: player,
      player: player,
      plays: Utils.number(),
      audio_url: Faker.internet.url(), // TODO: look at the way these are generated for soundcloud
      audio_source_url: Faker.internet.url(),
      is_external: Utils.boolean(),
      audio_type: 'soundcloud',
      provider_url: Faker.internet.url()
    });
  } else if (post.type === 'video') {
    Object.assign(post, {
      summary: generateTitleByTemplate(),
      thumbnail_url: Faker.internet.url(),
      video_type: 'youtube',
      html5_capable: true,
      player: generateVideoPlayer(),
      permalink_url: `https://www.youtube.com/watch?v=${Utils.uuid(11)}`,
      thumbnail_width: 480,
      thumbnail_height: 360
    });
  } else if (post.type === 'answer') {
    const asker = generateTumblelogName();
    Object.assign(post, {
      asking_name: asker,
      asking_url: Utils.generateTumblrUrl(asker),
      question: Faker.lorem.sentence(),
      answer: Faker.lorem.sentence() // TODO: wrap this in tags and shit
    });
  }
  return post;
}
