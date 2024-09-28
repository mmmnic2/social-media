import React, { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  suggestions: React.ReactNode[];
  onSuggestionClick: (suggestion: any) => void;
  debounceTime?: number;
  placeholder?: string;
  disabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  suggestions,
  onSuggestionClick,
  debounceTime = 300,
  placeholder = "Search...",
  disabled = false,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (searchTerm.length > 0) {
      const timeoutId = setTimeout(() => {
        onSearch(searchTerm);
      }, debounceTime);

      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-text-primary focus:border-primary"
        placeholder={placeholder}
        disabled={disabled}
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;