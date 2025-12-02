import { useEffect, useRef, useState } from "react";
import { Maximize2, Pause, Play } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  caption: string;
}

export const VideoPlayer = ({ src, caption }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isInView]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div ref={containerRef} className="group relative">
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-video-overlay/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
          <button
            onClick={togglePlay}
            className="p-3 bg-card/90 rounded-full hover:bg-card transition-colors"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-3 bg-card/90 rounded-full hover:bg-card transition-colors"
          >
            <Maximize2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <p className="mt-2 text-sm text-muted-foreground text-center font-medium">
        {caption}
      </p>
    </div>
  );
};
