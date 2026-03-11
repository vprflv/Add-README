import { NextResponse } from 'next/server';
import type { Database } from '@/types/database.types';
import {supabase} from "@/supabase";
import {SafeUser} from "@/shared/types";

type ProfileRow = Database['public']['Tables']['profiles']['Row'];




export async function GET() {
    const {data: profiles, error} = await supabase
        .from('profiles')
        .select('id, email, name, created_at')
        .order('created_at', {ascending: false});

    if (error) {

        console.error('Ошибка при получении профилей:', error);
        return NextResponse.json({error: 'Не удалось загрузить пользователей'}, {status: 500});
    }

    const safeUsers: SafeUser[] = profiles?.map((p: ProfileRow) => ({
        id: p.id,                      // string (uuid)
        email: p.email,
        name: p.name,
        createdAt: p.created_at,       // уже в ISO-формате
    })) ?? [];
    debugger
    return NextResponse.json(safeUsers);
}

