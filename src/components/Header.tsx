import { useEffect, useState, useRef } from "react";
import { Menu } from "lucide-react";
import SearchBar from "./SearchBar";
import { useNavigate, useLocation } from "react-router-dom";
import {
  workout1Exercises,
  workout2Exercises,
  optionalExercises,
} from "@/data/exercises";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
  // search is handled by the dedicated SearchBar component
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  const allExercises = [
    ...workout1Exercises.map((e) => ({ ...e, page: "/workout-1" })),
    ...workout2Exercises.map((e) => ({ ...e, page: "/workout-2" })),
    ...optionalExercises.map((e) => ({ ...e, page: "/optional" })),
  ];

  const getCurrentPage = () => {
    if (location.pathname.includes("workout-1")) return "/workout-1";
    if (location.pathname.includes("workout-2")) return "/workout-2";
    if (location.pathname.includes("optional")) return "/optional";
    return "/workout-1";
  };

  const searchAndNavigate = (qRaw: string) => {
    const q = qRaw.trim().toLowerCase();
    if (!q) return;

    const found = allExercises.find((ex) => ex.name.toLowerCase().includes(q));
    if (!found) return;

    navigate(found.page);

    setTimeout(() => {
      const el = document.getElementById(found.id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);

    onSearch?.(found.name);
  };

  // Esc закрывает меню
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsNavOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Закрытие при клике вне панелей
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (navContainerRef.current && !navContainerRef.current.contains(target)) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl bg-white/40 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between pt-2 h-20">
          {/* === ПАНЕЛЬ ПОИСКА (слева) === */}
          <div ref={searchContainerRef} className="pointer-events-auto">
            <SearchBar onSearch={searchAndNavigate} />
          </div>

          {/* Спейсер для центра */}
          <div className="flex-1" />

          {/* === ПАНЕЛЬ НАВИГАЦИИ (справа) === */}
          <div ref={navContainerRef} className="relative pointer-events-auto">
            {/* Кнопка бургер-меню */}
            <button
              onClick={() => setIsNavOpen((v) => !v)}
              aria-label="Открыть меню"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white/85 backdrop-blur-sm shadow-md shadow-black/15 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-black/20 active:scale-95"
            >
              <Menu className="h-5 w-5 text-gray-800" />
            </button>

            {/* Выпадающее меню */}
            {isNavOpen && (
              <div
                className="
                  animate-[slideInRight_0.3s_ease-out]
                  absolute top-14 right-0
                  w-64
                  rounded-3xl
                  bg-white shadow-lg shadow-black/20
                  border border-gray-100
                  p-4 space-y-3
                "
              >
                {/* Пункт 1 */}
                <button
                  onClick={() => {
                    navigate("/workout-1");
                    setIsNavOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-3 rounded-2xl
                    transition-all duration-150
                    text-sm font-bold uppercase tracking-wide
                    ${
                      getCurrentPage() === "/workout-1"
                        ? "bg-primary/20 text-primary"
                        : "text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  Тренировка 1
                </button>

                {/* Пункт 2 */}
                <button
                  onClick={() => {
                    navigate("/workout-2");
                    setIsNavOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-3 rounded-2xl
                    transition-all duration-150
                    text-sm font-bold uppercase tracking-wide
                    ${
                      getCurrentPage() === "/workout-2"
                        ? "bg-primary/20 text-primary"
                        : "text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  Тренировка 2
                </button>

                {/* Пункт 3 */}
                <button
                  onClick={() => {
                    navigate("/optional");
                    setIsNavOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-3 rounded-2xl
                    transition-all duration-150
                    text-sm font-bold uppercase tracking-wide
                    ${
                      getCurrentPage() === "/optional"
                        ? "bg-primary/20 text-primary"
                        : "text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  Опциональный день
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Анимации (глобальный стиль) */}
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateY(-10px) translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
    </header>
  );
};
