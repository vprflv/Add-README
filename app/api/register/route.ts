import { NextResponse } from 'next/server';
import { supabase } from '@/supabase';
import {User} from "@/shared/types";

export let users: User[] = [];

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password, name } = body;




        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email и пароль обязательны' },
                { status: 400 }
            );
        }

        // Проверка, существует ли уже такой email
        if (users.some(u => u.email === email)) {
            return NextResponse.json(
                { error: 'Пользователь с таким email уже существует' },
                { status: 409 }
            );
        }

        const newUser: User = {
            id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
            email,
            password,           // ← в реальности — хешировать (bcrypt / argon2)
            name: name || null,
            createdAt: new Date().toISOString(),
        };

        if(newUser){
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { name } }
            });

            users.push(newUser);
        }



        // Возвращаем данные без пароля
        const { password: _, ...safeUser } = newUser;



        return NextResponse.json(safeUser, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: 'Ошибка сервера' },
            { status: 500 }
        );
    }
}

// import { supabase } from '@/supabase';
// import { NextResponse } from 'next/server';
//
// export async function POST(request: Request) {
//     const { email, password, name } = await request.json();
//
//     const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: { data: { name } }
//     });
//
//     if (error) {
//         return NextResponse.json({ error: error.message }, { status: 400 });
//     }
//
//     return NextResponse.json({ user: data.user }, { status: 201 });
// }


