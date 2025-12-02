import { ExerciseBlock } from "@/components/ExerciseBlock";
import { workout2Exercises } from "@/data/exercises";

const Workout2 = () => {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Тренировка 2
            </h1>
            <p className="text-lg text-muted-foreground">
              Упражнения для верхней части тела и осанки
            </p>
          </div>

          <div className="space-y-8">
            {workout2Exercises.map((exercise) => (
              <ExerciseBlock key={exercise.id} exercise={exercise} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Workout2;
