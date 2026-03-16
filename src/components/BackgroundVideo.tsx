import React from 'react';

interface BackgroundVideoProps {
  src: string;
  poster?: string;
  overlayOpacity?: number;
  blur?: string;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ 
  src, 
  poster, 
  overlayOpacity = 0.4,
  blur = '0px'
}) => {
  return (
    <div className="absolute inset-0 -z-50 overflow-hidden w-full h-full">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        className="object-cover w-full h-full scale-105"
        style={{ filter: `blur(${blur})` }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div 
        className="absolute inset-0 bg-background/30 backdrop-blur-sm"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
    </div>
  );
};
