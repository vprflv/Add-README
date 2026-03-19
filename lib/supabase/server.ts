import {createServerClient} from "@supabase/ssr";
import {cookies} from "next/headers";
import {Database} from "@/types/database.types";
import {SafeUser} from "@/shared/types";
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type AppUser = {
    id: string;
    email: string ;
    name: string | null;
    // avatar_url: string | null;
    created_at: string | null;
    // updated_at: string | null;
    vehicles?: Profile["vehicles"] | null         // или лучше определить интерфейс для vehicle
    // + можно добавить поля из auth.users, если нужно
    // email_confirmed_at?: string | null;
};


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


export async function getCurrentUser(): Promise<SafeUser | null> {
    const supabase = await createSupabaseServerClient();

    // Самый надёжный и рекомендуемый способ на сервере
    const {data: {user}, error} = await supabase.auth.getUser();

    if (error) {
        console.error('Ошибка при получении пользователя:', error);
        return null;
    }

    if (!user) {
        return null;
    }

    const {data: profile, error: profileError} = await supabase
        .from("profiles")
        .select("id, name, email, created_at, vehicles")
        .eq("id", user.id)
        .single();

    // const safeProfile = profile as Profile | null;

    if (profileError || !profile) {
        console.error("profile fetch error:", profileError);

        return {
            id: user.id,
            email: user.email ?? "no-email@unknown", // или "" — но лучше что-то осмысленное
            name:
                (user.user_metadata?.name as string | null) ??
                (user.user_metadata?.full_name as string | null) ??
                user.email?.split("@")[0] ??
                null,
            created_at: user.created_at ?? null,
            vehicles: null,
        };


    }

        return {
            id: user.id,
            email: user.email ?? profile.email ?? "",           // email всегда должен быть, но на всякий случай
            name:
                profile.name ??
                (user.user_metadata?.name as string | null) ??
                (user.user_metadata?.full_name as string | null) ??
                user.email?.split('@')[0] ??
                null,
            created_at: profile.created_at ?? user.created_at ?? null,
            vehicles: profile.vehicles ?? null

        };

}


