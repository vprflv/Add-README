import {SafeUser} from "@/shared/types";
import {ListKeysQueries} from "@/shared/keys";
import {useQuery} from "@tanstack/react-query";
import {createSupabaseBrowserClient} from "@/lib/supabase/client";


async function fetchProfile(): Promise<SafeUser | null> {
    const supabase = createSupabaseBrowserClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile } = await supabase
        .from('profiles')
        .select('id, name, email, created_at, vehicles')
        .eq('id', user.id)
        .single()

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
    }

}

export function useProfile() {
    return useQuery({
        queryKey: ListKeysQueries.profilKey,
        queryFn: fetchProfile,
        staleTime: 1000 * 60 * 10, // 10 минут
    })
}