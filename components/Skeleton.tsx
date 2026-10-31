"use client";

import Image, { type ImageProps } from "next/image";
import { useState, type IframeHTMLAttributes } from "react";

// Image that stays hidden over a shimmering frame until it has loaded, then fades in.
// next/image also fires onLoad for photos that finished before hydration.
export function SkeletonImage({ className = "", ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const done = () => setLoaded(true);
  return <Image quality={85} {...props} className={`skeleton-img${loaded ? " is-loaded" : ""} ${className}`.trim()} onLoad={done} onError={done} />;
}

// Embedded map or video with a shimmer behind it until the frame has loaded.
export function SkeletonFrame({ className = "", ...props }: IframeHTMLAttributes<HTMLIFrameElement>) {
  const [loaded, setLoaded] = useState(false);
  return <iframe {...props} className={`skeleton-frame${loaded ? " is-loaded" : ""} ${className}`.trim()} onLoad={() => setLoaded(true)} />;
}
