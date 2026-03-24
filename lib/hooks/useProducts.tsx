import {Products, SafeUser} from "@/shared/types";
import {createSupabaseBrowserClient} from "@/lib/supabase/client";
import {useQuery} from "@tanstack/react-query";
import {ListKeysQueries} from "@/shared/keys";

async function fetchProducts(): Promise<Products[] | null> {
    const supabase = createSupabaseBrowserClient()


    const {data: products, error} = await supabase
        .from('products')
        .select('id, name, photo, oem, price, applicability')
        .order('created_at', {ascending: false});
    //делает сортировку результатов запроса по дате создания в убывающем порядке (от самых новых к самым старым).

    if (error) {
        console.error('Ошибка загрузки товаров:', error);
        // Для отладки можно вывести больше деталей
        console.error('Details:', error.details);
        console.error('Hint:', error.hint);
        return null;
    }
    return products ?? [];

}

export function useProducts() {
    return useQuery({
        queryKey: ListKeysQueries.products,
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 10, // 10 минут
    })
}