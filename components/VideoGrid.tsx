"use client";

import { useState } from "react";
import { SkeletonFrame } from "./Skeleton";

export type Video = { id: string; title: string };

// A grid of YouTube videos that shows thumbnails and only loads a player when one is clicked, because
// each embedded player is heavy. Each thumbnail is a real link, so it opens on YouTube before the page
// has hydrated, or when opened in a new tab. Starting a video swaps the previous one back to its thumbnail.
export default function VideoGrid({ videos }: { videos: Video[] }) {
  const [playing, setPlaying] = useState<string | null>(null);

  const play = (e: React.MouseEvent, id: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // let the browser open a new tab or window
    e.preventDefault();
    setPlaying(id);
  };

  return (
    <ul className="grid grid-3 video-grid">
      {videos.map((v) => (
        <li className="reveal" key={v.id}>
          <div className="video">
            {playing === v.id ? (
              <SkeletonFrame
                src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1`}
                title={v.title}
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <a
                className="video-thumb"
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noopener"
                aria-label={`Play video: ${v.title}`}
                onClick={(e) => play(e, v.id)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- served and sized by YouTube */}
                <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" width={480} height={360} loading="lazy" decoding="async" />
                <span className="video-thumb__play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5Z" /></svg>
                </span>
              </a>
            )}
          </div>
          <h3 className="video-grid__title">{v.title}</h3>
        </li>
      ))}
    </ul>
  );
}
