
import { NextResponse } from 'next/server';


type User = {
    id: number;
    email: string;
    password: string;
    name?: string;
    createdAt: string;
};

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

        users.push(newUser);

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