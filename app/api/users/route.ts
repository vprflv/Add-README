import { NextResponse } from 'next/server';
import {SafeUser} from "@/shared/types";
import {users} from "@/app/api/register/route";

// export let dataUsers: SafeUser[] = []; // ← замени на реальный источник

export async function GET() {
    const safeUsers = users.map(u => ({
        id: u.id,
        email: u.email,
        name: u.name,
        createdAt: u.createdAt,
    }));
    return NextResponse.json(safeUsers);
}

