import {createSupabaseServerClient} from "@/lib/supabase/server";
import {NextResponse} from "next/server";
import {SafeUser} from "@/shared/types";

export async function POST(request: Request) {
    try{
        const supabase = await createSupabaseServerClient();

        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Email и пароль обязательны" }, { status: 400 });
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            let message = error.message;
            let status = 400;

            if (message.toLowerCase().includes("invalid login credentials")) {
                message = "Неверный email или пароль";
                status = 401;
            } else if (message.toLowerCase().includes("confirmed")) {
                message = "Email не подтверждён. Проверьте почту.";
                status = 403;
            }

            return NextResponse.json({ error: message }, { status });
        }

        if (!data.user || !data.session) {
            return NextResponse.json(
                { error: "Не удалось войти (нет сессии или пользователя)" },
                { status: 500 }
            );
        }

        const safeUser: SafeUser = {
            id: data.user.id,
            email: data.user.email!,
            name: (data.user.user_metadata?.name as string | null) ?? null,
            createdAt: data.user.created_at ?? new Date().toISOString(),
        };

        return NextResponse.json<SafeUser & { isAuthenticated: true }>(
            { ...safeUser, isAuthenticated: true },
            { status: 200 }
        );

    }catch(e){
        console.error("Unexpected error in login:", err);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}