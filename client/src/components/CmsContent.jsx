import React from 'react';
import CmsMedia, { safeLink } from './CmsMedia';

function inlineText(text) {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    const href = safeLink(link?.[2]);
    return href ? <a key={index} href={href} className="underline">{link[1]}</a> : part;
  });
}

export function Paragraphs({ body }) {
  if (typeof body !== 'string') return null;
  return body.trim().split(/\r?\n\s*\r?\n/).filter(Boolean).map((paragraph, index) => {
    if (paragraph.startsWith('## ')) return <h3 key={index} className="mt-7 text-xl font-bold">{inlineText(paragraph.slice(3))}</h3>;
    const lines = paragraph.split(/\r?\n/);
    if (lines.every((line) => line.startsWith('- '))) {
      return <ul key={index} className="mt-5 list-disc ps-6">{lines.map((line, item) => <li key={item}>{inlineText(line.slice(2))}</li>)}</ul>;
    }
    return <p key={index} className="mt-5 whitespace-pre-line leading-relaxed">{inlineText(paragraph)}</p>;
  });
}

export function ContentBlock({ type, content, lang }) {
  return (
    <section className="section-padding">
      <div className="section-container max-w-4xl">
        {content.title && <h2 className="font-heading text-3xl font-extrabold">{content.title}</h2>}
        {type === 'text' && <Paragraphs body={content.body} />}
        {type === 'image' && safeLink(content.image) && (
          <img className="mt-5 max-w-full rounded-xl" src={safeLink(content.image)} alt={content.alt || ''} loading="lazy" />
        )}
        {type === 'video' && <CmsMedia {...content} buttonLabel={lang === 'ar' ? 'شاهد الفيديو' : 'Watch video'} youtubeLabel={lang === 'ar' ? 'شاهد على يوتيوب' : 'Watch on YouTube'} />}
      </div>
    </section>
  );
}

export function Articles({ article, articles, lang }) {
  const localized = (entry) => Object.fromEntries(Object.entries(entry?.en || {}).map(([key, value]) => [key, entry?.[lang]?.[key] || value]));
  const title = lang === 'ar' ? 'المقالات' : 'Articles';
  if (article) {
    const entry = localized(article);
    return (
      <article className="section-container max-w-4xl pt-32 pb-20">
        <a href="/articles" className="underline">{title}</a>
        <h1 className="font-heading text-5xl font-extrabold mt-6">{entry.title}</h1>
        <p className="mt-3">{entry.category}</p>
        {safeLink(entry.cover) && <img className="mt-6 w-full rounded-xl" src={safeLink(entry.cover)} alt={entry.alt || ''} />}
        <Paragraphs body={entry.body} />
      </article>
    );
  }

  return (
    <section className="section-container max-w-5xl pt-32 pb-20">
      <h1 className="font-heading text-5xl font-extrabold mb-8">{title}</h1>
      {!articles.length && <p>{lang === 'ar' ? 'لا توجد مقالات منشورة بعد.' : 'No articles have been published yet.'}</p>}
      <div className="grid gap-8 md:grid-cols-2">
        {articles.map((item) => {
          const entry = localized(item);
          return (
            <article key={item.slug}>
              <a href={`/articles/${item.slug}`} className="block">
                {safeLink(entry.cover) && <img className="w-full aspect-video object-cover rounded-xl" src={safeLink(entry.cover)} alt={entry.alt || ''} loading="lazy" />}
                <p className="mt-3">{entry.category}</p>
                <h2 className="font-heading text-2xl font-bold underline">{entry.title}</h2>
              </a>
              <p className="mt-2">{entry.summary}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

