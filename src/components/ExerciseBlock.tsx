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
  videos: { src: string; caption: string; horizontal?: boolean }[];
}

interface ExerciseBlockProps {
  exercise: Exercise;
}

export const ExerciseBlock = ({ exercise }: ExerciseBlockProps) => {
  return (
    <section id={exercise.id} className="exercise-card">
      {/* HEADER карточки — горизонтальная строка с flex */}
      <div className="exercise-header-top">
        <span className="exercise-page-label">
          {exercise.number} упражнение
        </span>
        <span className="exercise-page-subtitle">
          {exercise.category}
        </span>
      </div>

      {/* название и подходы – слева */}
      <h2 className="exercise-page-title">{exercise.name}</h2>
      <p className="exercise-page-sets">{exercise.sets}</p>

      {/* ГРУППЫ МЫШЦ */}
      <section className="exercise-section">
        <h3 className="exercise-section-title">Группы мышц</h3>
        <div className="muscle-group-badges">
          {exercise.muscles.map((muscle, index) => (
            <span key={index} className="muscle-badge">
              {muscle}
            </span>
          ))}
        </div>
      </section>

      {/* ИСХОДНОЕ ПОЛОЖЕНИЕ */}
      <section className="exercise-section">
        <h3 className="exercise-section-title">Исходное положение:</h3>
        <ul className="exercise-list">
          {exercise.startingPosition.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </section>

      {/* ТЕХНИКА ВЫПОЛНЕНИЯ */}
      <section className="exercise-section">
        <h3 className="exercise-section-title">Техника выполнения:</h3>
        <ul className="exercise-list">
          {exercise.technique.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </section>

      {/* ВИДЕО БЛОК */}
{exercise.videos.length > 0 && (
  <section
    aria-label="Видео упражнения"
    className="mt-4 grid grid-cols-2 gap-4"
  >
    {exercise.videos.map((video, index) => (
      <div
        key={index}
        className={
          exercise.videos.length === 1
            ? "col-span-2 flex justify-center"   // если одно — центр
            : ""                                 // если два — как раньше
        }
      >
        <VideoPlayer src={video.src} caption={video.caption} horizontal={video.horizontal} />
      </div>
    ))}
  </section>
)}


    </section>
  );
};
