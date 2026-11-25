import React, { useState } from 'react';

export function safeLink(value, fallback = undefined) {
  if (typeof value !== 'string' || /[\\\x00-\x20]/.test(value)) return fallback;
  if (/^(?:\/(?!\/)|#)/.test(value)) return value;
  try {
    return new URL(value).protocol === 'https:' ? value : fallback;
  } catch {
    return fallback;
  }
}

export default function CmsMedia({ youtube, mp4, title = 'Video', buttonLabel = 'Watch video', youtubeLabel = 'Watch on YouTube' }) {
  const [playing, setPlaying] = useState(false);
  const youtubeId = typeof youtube === 'string' && youtube.match(/^https:\/\/www\.youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})$/)?.[1];
  const videoUrl = safeLink(mp4);
  if (!youtubeId && !videoUrl) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-4">
      {!playing ? (
        <button type="button" className="btn-primary" onClick={() => setPlaying(true)}>{buttonLabel}</button>
      ) : youtubeId ? (
        <>
          <iframe
            className="w-full aspect-video min-h-[200px] rounded-xl bg-black"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&playsinline=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <a className="mt-2 inline-block underline" href={youtube} target="_blank" rel="noreferrer">{youtubeLabel}</a>
        </>
      ) : (
        <video className="w-full aspect-video rounded-xl bg-black" src={videoUrl} aria-label={title} controls autoPlay playsInline />
      )}
    </div>
  );
}

