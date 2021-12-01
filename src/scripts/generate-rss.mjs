import { writeFileSync } from 'fs';
import RSS from 'rss';
import { allPosts } from '.contentlayer/data';

async function generate() {
  const feed = new RSS({
    title: 'Douglas Henrique',
    site_url: 'https://www.dougdev.com.br/',
    feed_url: 'https://www.dougdev.com.br/feed.xml'
  });

  allPosts.map((post) => {
    feed.item({
      title: post.title,
      url: `https://www.dougdev.com.br/posts/${post.slug}`,
      date: post.publishedAt,
      description: post.summary
    });
  });

  writeFileSync('./public/feed.xml', feed.xml({ indent: true }));
}

generate();