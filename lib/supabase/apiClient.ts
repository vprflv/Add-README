import {createSupabaseBrowserClient} from "@/lib/supabase/client";
import {Products, SearchResult} from "@/shared/types";



export async function fetchSearchResults(query: string): Promise<SearchResult[]> {
    if (!query.trim()) return [];

    const supabase = createSupabaseBrowserClient();
    const searchTerm = `%${query}%`;
    const { data, error } = await supabase
        .from('products')
        .select('id, name, oem', )
        .or(`name.ilike.%${searchTerm}%,oem.ilike.%${searchTerm}%`)
        .limit(10)                // ограничиваем подсказки
        .order('name');           // сортируем по алфавиту

    if (error) {
        console.error('Ошибка поиска товаров:', error);
        return [];
    }

    // Преобразуем в нужный формат
    return (data || []).map((product) =>{
        const lowerQuery = query.toLowerCase();
        const matchField =
            product.name?.toLowerCase().includes(lowerQuery) ? 'name' : 'oem';

        return {
            id: product.id,
            title: product.name || '',
            name: product.name,
            oem: product.oem,
            matchField
        };
    });
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