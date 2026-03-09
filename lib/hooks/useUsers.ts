"use client";

import { useQuery } from "@tanstack/react-query";
import {SafeUser} from "@/shared/types";
import {ListKeysQueries} from "@/shared/keys";



async function fetchUsers(): Promise<SafeUser[]> {
    const res = await fetch("/api/users"); // или "/api/register" если объединили
    if (!res.ok) throw new Error("Не удалось загрузить пользователей");
    return res.json();
}

export function useUsers() {
    return useQuery({
        queryKey: ListKeysQueries.usersKeyAll,
        queryFn: fetchUsers,
        staleTime: 1000 * 60, // 1 минута
    });
}