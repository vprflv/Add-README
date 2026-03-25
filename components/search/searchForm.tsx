// components/SearchForm.tsx
'use client';

import { Search, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useSearch } from '@/lib/hooks/useSearch';

export function SearchForm() {
    const { inputValue, setInputValue, suggestions, isLoading, performSearch } = useSearch();
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            performSearch(inputValue);
        }
        setShowSuggestions(false);
    };

    const selectSuggestion = (suggestion: any) => {
        setInputValue(suggestion.name);
        performSearch(suggestion.name);
        setShowSuggestions(false);
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 mt-12">
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative group">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 250)}
                        placeholder="Поиск по названию или OEM..."
                        className="w-full bg-white text-zinc-950 border-2 border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-200 rounded-3xl px-6 py-4 pl-14 text-lg placeholder:text-zinc-400 transition-all duration-200 outline-none"
                    />

                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                        <Search size={26} strokeWidth={2.5} />
                    </div>

                    {isLoading && (
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-red-600">
                            <Loader2 size={24} className="animate-spin" />
                        </div>
                    )}
                </div>
            </form>




            {/* Подсказки */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute mt-3 w-full bg-white border border-zinc-200 rounded-3xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
                    {suggestions.map((item) => {
                        const isOemMatch = item.matchField === 'oem';

                        return (
                            <div
                                key={item.id}
                                onMouseDown={() => selectSuggestion(item)}
                                className="px-6 py-4 hover:bg-zinc-100 cursor-pointer border-b border-zinc-100 last:border-none flex flex-col"
                            >
                                {/* Название товара */}
                                <div className="text-red-600 font-bold">ТЕСТ КРАСНОГО ЦВЕТА</div>
                                <div className="text-[17px] text-zinc-950 font-medium">
                                    {item.name}
                                </div>

                                {/* OEM */}
                                {item.oem && (
                                    <div className="mt-1 flex items-center gap-2 text-sm">
                                        OEM:
                                        <span
                                            className={`font-medium ${
                                                isOemMatch
                                                    ? 'text-[#dc2626] font-semibold'   // прямой красный цвет
                                                    : 'text-zinc-600'
                                            }`}
                                        >
  {item.oem}
</span>

                                        {isOemMatch && (
                                            <span
                                                className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-medium">
                  по OEM
                </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}