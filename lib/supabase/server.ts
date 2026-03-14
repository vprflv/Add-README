import {createServerClient} from "@supabase/ssr";
import {cookies} from "next/headers";

export async function createSupabaseServerClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,


        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch (error) {
                        // The `set` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },




            },
        }
    );
}


export async function getCurrentUser() {
    const supabase = await createSupabaseServerClient();

    // Самый надёжный и рекомендуемый способ на сервере
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        console.error('Ошибка при получении пользователя:', error);
        return null;
    }

    if (!user) {
        return null;
    }

    return {
        id: user.id,
        email: user.email ?? '',           // email всегда должен быть, но на всякий случай
        name:
            (user.user_metadata?.name as string | null) ??
            (user.user_metadata?.full_name as string | null) ??
            user.email?.split('@')[0] ??
            null,
        createdAt: user.created_at ?? new Date().toISOString(),
        // Можно добавить другие поля, если нужно:
        // avatar_url: user.user_metadata?.avatar_url as string | null,
    };
}

