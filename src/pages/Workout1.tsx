import { ExerciseBlock } from "@/components/ExerciseBlock";
import { workout1Exercises } from "@/data/exercises";

const Workout1 = () => {
  return (
    <main className="pt-20 pb-16 exercise-page">
      <div className="mx-auto px-1">
        <h1 className="text-3xl font-extrabold text-primary mb-1 text-left">
          Тренировка 1
        </h1>

        <p
          className="mb-6 text-xl text-primary/90"
          style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive" }}
        >
          For the sweetest Marie Savelyeva ;)
        </p>

        <div className="space-y-6">
          {workout1Exercises.map((exercise) => (
            <ExerciseBlock key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Workout1;
