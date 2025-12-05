import { ExerciseBlock } from "@/components/ExerciseBlock";
import { workout2Exercises } from "@/data/exercises";

const Workout2 = () => {
  return (
    <main className="pt-20 pb-16 exercise-page">
      <div className="mx-auto px-1">
        <h1 className="text-3xl font-extrabold text-primary mb-4 text-left">
          Тренировка 2
        </h1>

        <div className="space-y-6">
          {workout2Exercises.map((exercise) => (
            <ExerciseBlock key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Workout2;
