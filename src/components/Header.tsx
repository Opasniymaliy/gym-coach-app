import { useEffect, useState } from "react";
import { Search, X, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  workout1Exercises,
  workout2Exercises,
  optionalExercises,
} from "@/data/exercises";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const allExercises = [
    ...workout1Exercises.map((e) => ({ ...e, page: "/workout-1" })),
    ...workout2Exercises.map((e) => ({ ...e, page: "/workout-2" })),
    ...optionalExercises.map((e) => ({ ...e, page: "/optional" })),
  ];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    // попытка точного совпадения по имени
    const found = allExercises.find((ex) =>
      ex.name.toLowerCase().includes(q)
    );

    if (found) {
      // Перейти на страницу, затем пролистать к блоку
      navigate(found.page);
      setIsSearchOpen(false);
      setSearchQuery("");

      // Дать время странице отрисоваться, затем плавно пролистать
      setTimeout(() => {
        const el = document.getElementById(found.id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);

      if (onSearch) onSearch(found.name);
    } else {
      // если не найдено - попробовать открыть страницу Workout1 и искать там
      // или уведомить пользователя — пока просто закроем поиск
      setIsSearchOpen(true);
    }
  };

  // Закрывать нав-панель по Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsNavOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Search button + animated input */}
          <div className="flex items-center">
            <button
              aria-label="Открыть поиск"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-transform transform-gpu hover:scale-105"
              onClick={() => setIsSearchOpen((s) => !s)}
            >
              <Search className="h-6 w-6 text-foreground" />
            </button>

            <div
              className={`ml-3 transition-all duration-300 ease-out overflow-hidden ${
                isSearchOpen ? "w-80 opacity-100" : "w-0 opacity-0"
              }`}
            >
              <form
                onSubmit={(e) => handleSearchSubmit(e)}
                className="flex items-center space-x-2 bg-transparent"
              >
                <input
                  type="text"
                  placeholder="Найти упражнение..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus={isSearchOpen}
                  className="w-full text-sm placeholder:text-muted-foreground bg-white/6 backdrop-blur-sm border border-white/6 px-3 py-2 rounded-full outline-none text-foreground"
                />
                <button
                  type="submit"
                  className="text-sm px-3 py-1 rounded-full bg-primary/90 text-white hover:bg-primary"
                >
                  Найти
                </button>
                <button
                  type="button"
                  aria-label="Закрыть поиск"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Right: Navigation button */}
          <div className="flex items-center">
            <button
              aria-label="Открыть навигацию"
              onClick={() => setIsNavOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-md bg-white/5 hover:bg-white/10 transition-transform hover:scale-105"
            >
              <Menu className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation panel (popover/drawer) */}
      {isNavOpen && (
        <div className="fixed top-20 right-4 z-60 w-64 bg-card border border-border rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold">Страницы</h4>
            <button
              aria-label="Закрыть"
              onClick={() => setIsNavOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-white/5 hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="flex flex-col gap-2">
            <button
              className="text-left px-3 py-2 rounded-md hover:bg-white/5"
              onClick={() => {
                navigate("/workout-1");
                setIsNavOpen(false);
              }}
            >
              Тренировка 1
            </button>
            <button
              className="text-left px-3 py-2 rounded-md hover:bg-white/5"
              onClick={() => {
                navigate("/workout-2");
                setIsNavOpen(false);
              }}
            >
              Тренировка 2
            </button>
            <button
              className="text-left px-3 py-2 rounded-md hover:bg-white/5"
              onClick={() => {
                navigate("/optional");
                setIsNavOpen(false);
              }}
            >
              Опциональный день
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
