import { ExerciseBlock } from "@/components/ExerciseBlock";
import { optionalExercises } from "@/data/exercises";

const Optional = () => {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Опциональный день
            </h1>
            <p className="text-lg text-muted-foreground">
              Кардио, растяжка и восстановление
            </p>
          </div>

          <div className="space-y-8">
            {optionalExercises.map((exercise) => (
              <ExerciseBlock key={exercise.id} exercise={exercise} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Optional;
