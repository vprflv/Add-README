// components/SearchForm.tsx
'use client';


import { Search, Loader2 } from 'lucide-react';
import { useState } from 'react';
import {useSearch} from "@/lib/hooks/useSearch";

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

    const selectSuggestion = (title: string) => {
        setInputValue(title);
        performSearch(title);
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
                        placeholder="Поиск товаров, статей, пользователей..."
                        className="w-full
                       bg-white
                       text-zinc-950
                       border-2 border-red-500
                       focus:border-red-600 focus:ring-4 focus:ring-red-200
                       rounded-3xl
                       px-6 py-4 pl-14
                       text-lg
                       placeholder:text-zinc-400
                       transition-all duration-200
                       outline-none"
                    />

                    {/* Иконка поиска */}
                    <div
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none">
                        <Search size={26} strokeWidth={2.5}/>
                    </div>

                    {/* Лоадер */}
                    {isLoading && (
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-blue-600">
                            <Loader2 size={24} className="animate-spin"/>
                        </div>
                    )}
                </div>
            </form>

            {/* Выпадающий список подсказок */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute mt-3 w-full bg-white dark:bg-zinc-950
                        border border-zinc-200 dark:border-zinc-700
                        rounded-3xl shadow-2xl overflow-hidden z-50
                        max-h-80 overflow-y-auto">
                    {suggestions.map((item: any) => (
                        <div
                            key={item.id}
                            onMouseDown={() => selectSuggestion(item.title)}
                            className="px-6 py-4 hover:bg-zinc-100 dark:hover:bg-zinc-800
                         cursor-pointer border-b border-zinc-100 dark:border-zinc-800
                         last:border-none text-[17px] text-zinc-900 dark:text-white"
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}