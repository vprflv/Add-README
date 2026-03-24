import {useQuery} from "@tanstack/react-query";
import {ListKeysQueries} from "@/shared/keys";
import {fetchFilteredProducts} from "@/lib/supabase/apiClient";

export function useFilteredProducts(searchQuery: string) {
    return useQuery({
        queryKey: [ListKeysQueries.searchKey, ListKeysQueries.filteredKey, searchQuery],
        queryFn: () => fetchFilteredProducts(searchQuery),
        enabled: searchQuery.length > 2,
        staleTime: 1000 * 60 * 5,
    });
}

