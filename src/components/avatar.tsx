'use client';
import { cn } from '@/lib/utils';
import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

export function Avatar(props: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <figure
      className={cn(
        'relative flex size-9 shrink-0 overflow-hidden rounded-full',
        !loaded && 'bg-muted/50',
        props.className,
      )}
    >
      <Image
        fill
        draggable={false}
        {...props}
        className={cn(
          'aspect-square size-full object-cover duration-300',
          loaded ? 'scale-100 blur-0' : 'scale-125 blur',
          props.className,
        )}
        onLoad={() => setLoaded(true)}
      />
    </figure>
  );
}
