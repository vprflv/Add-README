import {createClient} from "@supabase/supabase-js";
import {NextResponse} from "next/server";
import {SafeUser} from "@/shared/types";
import {supabase} from "@/supabase";

export async function POST(request: Request) {

    try {
        const body = await request.json();
        const {email, password, name} = body;

        console.log('Получены данные регистрации:', {email, name}); // ← для проверки

        // const supabase = createClient( // ← твой клиент (или supabase из импорта)
        //     process.env.NEXT_PUBLIC_SUPABASE_URL!,
        //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        // );

        const {data, error} = await supabase.auth.signUp({
            email,
            password,
            options: {data: {name}}
        });

        console.log('Результат signUp:', {
            user: data?.user ? {id: data.user.id, email: data.user.email} : null,
            session: data?.session,
            error: error ? {message: error.message, code: error.code, details: error.details} : null
        });  // ← самое важное!

        if (error) {
            console.error('Ошибка signUp:', error);
            let message = error.message;
            let status = 400;

            if (error.message.includes('duplicate key') || error.code === '23505') {
                message = 'Пользователь с таким email уже существует';
                status = 409;
            } else if (error.message.toLowerCase().includes('password')) {
                message = 'Пароль слишком слабый';
            }

            return NextResponse.json({error: message}, {status});

        }

        if (!data.user) {
            console.error('signUp вернул success, но user = null');
            return NextResponse.json({error: 'Пользователь не создан (нет data.user)'}, {status: 500});
        }

        const safeUser: SafeUser = {
            id: data.user.id,
            email: data.user.email!,
            name: (data.user.user_metadata?.name as string | null) ?? null,
            createdAt: data.user.created_at ?? new Date().toISOString(),
        };

        return NextResponse.json<SafeUser>(safeUser, {status: 201});

    } catch (err) {
        console.error('Неожиданная ошибка в register:', err);
        return NextResponse.json({error: 'Ошибка сервера'}, {status: 500});
    }
}