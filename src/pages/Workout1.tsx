import { ExerciseBlock } from "@/components/ExerciseBlock";
import { workout1Exercises } from "@/data/exercises";

const Workout1 = () => {
  return (
    <main className="pt-24 pb-16 exercise-page">
      <h1 className="text-4xl font-extrabold text-primary mb-3 text-center">
        Тренировка 1
      </h1>

      <p className="text-muted-foreground text-center mb-8">
        Упражнения для нижней части тела и пресса
      </p>

      <div className="space-y-6">
        {workout1Exercises.map((exercise) => (
          <ExerciseBlock key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </main>
  );
};

export default Workout1;
