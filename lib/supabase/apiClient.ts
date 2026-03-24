import {createSupabaseBrowserClient} from "@/lib/supabase/client";
import {Products, SearchResult} from "@/shared/types";



export async function fetchSearchResults(query: string): Promise<SearchResult[]> {
    if (!query.trim()) return [];

    const supabase = createSupabaseBrowserClient();

    const { data, error } = await supabase
        .from('products')
        .select('id, name')
        .textSearch('name', query, {
            type: 'websearch',      // удобный режим поиска (поддерживает "слово1 слово2")
            config: 'russian',      // если у тебя русские названия товаров — очень важно!
        })
        .or(`name.ilike.%${query}%,oem.ilike.%${query}%`)
        .limit(10)                // ограничиваем подсказки
        .order('name');           // сортируем по алфавиту

    if (error) {
        console.error('Ошибка поиска товаров:', error);
        return [];
    }

    // Преобразуем в нужный формат
    return (data || []).map((product) => ({
        id: product.id,
        title: product.name || '',
        name: product.name,
    }));
}

export async function fetchFilteredProducts(query: string): Promise<Products[]> {
    if (!query.trim()) return [];

    const supabase = createSupabaseBrowserClient();

    const { data, error } = await supabase
        .from('products')
        .select('id, name, photo, oem, price, applicability')
        .or(`name.ilike.%${query}%,oem.ilike.%${query}%`)   // ← тот же поиск по двум полям
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Ошибка фильтрации товаров:', error);
        return [];
    }

    return data ?? [];
}