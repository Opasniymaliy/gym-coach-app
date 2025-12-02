import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-foreground">
              Тренировки
            </h1>
            <nav className="hidden md:flex space-x-6">
              <NavLink
                to="/workout-1"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                activeClassName="text-primary"
              >
                Тренировка 1
              </NavLink>
              <NavLink
                to="/workout-2"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                activeClassName="text-primary"
              >
                Тренировка 2
              </NavLink>
              <NavLink
                to="/optional"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                activeClassName="text-primary"
              >
                Опциональный день
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {!isSearchOpen ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="hover:bg-secondary"
              >
                <Search className="h-5 w-5" />
              </Button>
            ) : (
              <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Найти упражнение..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                >
                  <X className="h-5 w-5" />
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex space-x-4 pb-3 overflow-x-auto">
          <NavLink
            to="/workout-1"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
            activeClassName="text-primary"
          >
            Тренировка 1
          </NavLink>
          <NavLink
            to="/workout-2"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
            activeClassName="text-primary"
          >
            Тренировка 2
          </NavLink>
          <NavLink
            to="/optional"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
            activeClassName="text-primary"
          >
            Опциональный день
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
