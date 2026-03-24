"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {ListKeysQueries} from "@/shared/keys";

type RegisterInput = {
    email: string;
    password: string;
    name?: string;
};

type User = {
    id: number;
    email: string;
    name: string | null;
    createdAt: string;
};

async function registerUser(data: RegisterInput): Promise<User> {
    const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });


    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Ошибка при регистрации");
    }

    return res.json();
}


export function useRegister() {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation <User, Error, RegisterInput>({
        mutationFn: registerUser,

        onSuccess: (newUser) => {
            queryClient.setQueryData(ListKeysQueries.profilKey, newUser);

            queryClient.invalidateQueries({
                queryKey: ListKeysQueries.usersKeyAll
            });

            router.push("/");

        },

        onError: (err) => {
            console.error("Ошибка регистрации:", err.message);
        },


    });

    }






