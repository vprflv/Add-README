import { createServerClient } from '@supabase/ssr';

import { cookies } from 'next/headers';
import {Database} from "@/types/database.types";
import {NextResponse} from "next/server";
import {SafeUser} from "@/shared/types";

type ProfileRow = Database['public']['Tables']['profiles']['Row'];

export async function GET(request: Request) {
    const cookieStore = await cookies();

    // Серверный клиент с service_role (обходит RLS)
    const supabaseAdmin = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,   // ← секретный ключ!
        {
            cookies: {
                get(name) { return cookieStore.get(name)?.value; },
                set(name, value, options) { cookieStore.set({ name, value, ...options }); },
                remove(name, options) { cookieStore.set({ name, value: '', ...options }); },
            },
        }
    );

    const { data: profiles, error } = await supabaseAdmin
        .from('profiles')
        .select('id, email, name, created_at, vehicles',)
        .order('created_at', { ascending: false });

    if (error) {

        return NextResponse.json({ error: 'Не удалось загрузить пользователей' }, { status: 500 });
    }

    const safeUsers: SafeUser[] = profiles?.map((p: ProfileRow) => ({
        id: p.id,
        email: p.email,
        name: p.name,
        created_at: p.created_at,
        vehicles: p.vehicles ?? null,
    })) ?? [];

    return NextResponse.json(safeUsers);

}

