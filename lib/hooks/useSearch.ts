import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import {useQuery} from "@tanstack/react-query";
import {ListKeysQueries} from "@/shared/keys";
import {fetchSearchResults} from "@/lib/supabase/apiClient";



export function useSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [inputValue, setInputValue] = useState(searchParams.get('q') || '');

    const [debouncedValue] = useDebounce(inputValue, 300);


    const { data: suggestions = [], isLoading } = useQuery({
        queryKey: [ListKeysQueries.searchKey, debouncedValue],
        queryFn: () => fetchSearchResults(debouncedValue),
        enabled: debouncedValue.length > 2, // начинаем искать после 3 символов
    });

    useEffect(() => {
        const currentQuery = searchParams.get('q') || '';
        setInputValue(currentQuery);
    }, [searchParams]);

    const performSearch = (query: string) => {
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        } else {
            router.push('/');
        }
    };

    return {
        inputValue,
        setInputValue,
        suggestions,
        isLoading,
        performSearch,
        debouncedValue,
    };


}






