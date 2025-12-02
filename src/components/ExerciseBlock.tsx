import { VideoPlayer } from "./VideoPlayer";

export interface Exercise {
  id: string;
  number: number;
  category: string;
  name: string;
  sets: string;
  muscles: string[];
  startingPosition: string[];
  technique: string[];
  videos: { src: string; caption: string }[];
}

interface ExerciseBlockProps {
  exercise: Exercise;
}

export const ExerciseBlock = ({ exercise }: ExerciseBlockProps) => {
  return (
    <div
      id={exercise.id}
      className="scroll-mt-24 bg-card rounded-2xl p-6 md:p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <span className="text-sm font-bold text-primary uppercase tracking-wider">
            {exercise.number} упражнение
          </span>
          <span className="text-sm font-medium text-exercise-category uppercase tracking-wide">
            {exercise.category}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          {exercise.name}
        </h2>
        <p className="text-lg text-muted-foreground font-medium">
          {exercise.sets}
        </p>
      </div>

      {/* Muscle Groups */}
      <div className="mb-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Группы мышц
        </h3>
        <div className="flex flex-wrap gap-2">
          {exercise.muscles.map((muscle, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-secondary rounded-full text-sm font-medium text-foreground"
            >
              {muscle}
            </span>
          ))}
        </div>
      </div>

      {/* Starting Position */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-foreground mb-4 uppercase tracking-wide">
          Исходное положение
        </h3>
        <ul className="exercise-list text-foreground leading-relaxed">
          {exercise.startingPosition.map((step, index) => (
            <li key={index} className="mb-2">
              {step}
            </li>
          ))}
        </ul>
      </div>

      {/* Technique */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-foreground mb-4 uppercase tracking-wide">
          Техника выполнения
        </h3>
        <ul className="exercise-list text-foreground leading-relaxed">
          {exercise.technique.map((step, index) => (
            <li key={index} className="mb-2">
              {step}
            </li>
          ))}
        </ul>
      </div>

      {/* Videos */}
      {exercise.videos.length > 0 && (
        <div
          className={`grid gap-6 ${
            exercise.videos.length === 1
              ? "grid-cols-1 max-w-2xl"
              : exercise.videos.length === 2
              ? "grid-cols-1 md:grid-cols-2"
              : exercise.videos.length === 3
              ? "grid-cols-1 md:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {exercise.videos.map((video, index) => (
            <VideoPlayer key={index} src={video.src} caption={video.caption} />
          ))}
        </div>
      )}
    </div>
  );
};
