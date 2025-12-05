import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Найти упражнение…" }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (open && rootRef.current && !rootRef.current.contains(t)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const submitSearch = () => {
    const q = query.trim();
    if (!q) return;
    onSearch(q);
    setOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submitSearch();
  };

  return (
    <div
      ref={rootRef}
      className={`pointer-events-auto relative flex items-center transition-all duration-300 ${
        open
          ? "px-4 w-[75vw] sm:w-[480px] h-11 rounded-full bg-white/85 shadow-lg border border-gray-100"
          : "w-11 h-11 rounded-full bg-white/85 shadow-md"
      }`}
      onClick={() => !open && setOpen(true)}
      style={{ transformOrigin: "left center" }}
    >
      {/* Search icon (hidden when open) */}
      {!open && <Search className="h-5 w-5 text-gray-800 mx-auto" />}

      {/* Input shown when open */}
      {open && (
        <>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none border-none ml-2 text-sm text-gray-900 placeholder:text-gray-400"
            aria-label="Поиск упражнения"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Close button centered vertically on the right side */}
          <button
            type="button"
            aria-label="Закрыть поиск"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="ml-2 flex items-center justify-center w-8 h-8 text-gray-700 hover:text-gray-900"
          >
            <X className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );
};

export default SearchBar;
