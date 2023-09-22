import React from 'react';

interface YoutubePlayerProps {
  videoId: string;
}

export const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ videoId }) => {
  return (
    <div className="aspect-video">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?noref=true`}
      />
    </div>
  );
};
