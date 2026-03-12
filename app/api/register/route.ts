import {createSupabaseServerClient} from "@/lib/supabase/server";
import {NextResponse} from "next/server";
import {SafeUser} from "@/shared/types";

export async function POST(request: Request) {
    try {
        const supabase = await createSupabaseServerClient(); // ← правильный серверный клиент!

        const body = await request.json();
        const { email, password, name } = body;

        // Валидация (рекомендуется добавить zod/yup)
        if (!email || !password) {
            return NextResponse.json({ error: 'Email и пароль обязательны' }, { status: 400 });
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name },           // custom metadata
                emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
            },
        });

        console.log('signUp result:', {
            user: data.user ? { id: data.user.id, email: data.user.email } : null,
            session: data.session,
            error: error ?? null,
        });

        if (error) {
            let message = error.message;
            let status = 400;

            if (error.code === '23505' || error.message.includes('duplicate key')) {
                message = 'Пользователь с таким email уже существует';
                status = 409;
            } else if (error.message.toLowerCase().includes('password')) {
                message = 'Пароль слишком слабый';
                status = 400;
            }

            return NextResponse.json({ error: message }, { status });
        }

        if (!data.user) {
            return NextResponse.json(
                { error: 'Пользователь не создан (нет data.user)' },
                { status: 500 }
            );
        }


        // Важно: после signUp сессия может быть создана (если подтверждение email отключено)
        if (data.session) {
            // Сохраняем куки автоматически через @supabase/ssr
            // (это уже сделано внутри createServerClient → setAll)
        }

        const safeUser: SafeUser = {
            id: data.user.id,
            email: data.user.email!,
            name: (data.user.user_metadata?.name as string | null) ?? null,
            createdAt: data.user.created_at ?? new Date().toISOString(),
        };


        return NextResponse.json<SafeUser>(safeUser, { status: 201 });






    }catch(err){
        console.error('Unexpected error in register:', err);
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }

}