import { useEffect, useRef } from "react";

interface VideoPlayerProps {
  src: string;
  caption: string;
  horizontal?: boolean;
}

export const VideoPlayer = ({ src, caption, horizontal }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // === IntersectionObserver для автоплея при появлении в области видимости === //
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play();
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const maxWidth = horizontal ? "max-w-[400px]" : "max-w-[200px]";
  const aspectRatio = horizontal ? "aspect-[16/9]" : "aspect-[9/16]";

  return (
  <div ref={containerRef} className={`w-full ${maxWidth} mx-auto`}>

      {/* Контейнер видео с стандартными контролами */}
      <div className={`relative w-full ${aspectRatio} overflow-hidden rounded-2xl bg-black`}>
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          controls
          className="w-full h-full object-cover"
        />
      </div>

      {/* Подпись под видео — выравнена по центру */}
      <p className="mt-2 text-xs sm:text-sm text-muted-foreground text-center">
        {caption}
      </p>
    </div>
  );
};
