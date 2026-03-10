import { NextResponse } from 'next/server';
import {SafeUser} from "@/shared/types";


 let dataUsers: SafeUser[] = []; // ← замени на реальный источник

export async function GET() {
    const safeUsers = dataUsers.map(u => ({
        id: u.id,
        email: u.email,
        name: u.name,
        createdAt: u.createdAt,
    }));
    return NextResponse.json(safeUsers);
}

