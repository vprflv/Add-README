"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {ListKeysQueries} from "@/shared/keys";
import {POST} from "@/app/api/route";

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

    return useMutation <User, Error, RegisterInput, { previousUsers?: User[] }>({
        mutationFn: registerUser,

        onMutate: async (newUserData) => {
            await queryClient.cancelQueries({ queryKey:ListKeysQueries.usersKeyAll });

            const previousUsers = queryClient.getQueryData<User[]>(ListKeysQueries.usersKeyAll);

            const optimisticUser: User = {
                id: Date.now(), // или другой временный id
                email: newUserData.email,
                name: newUserData.name || null,
                createdAt: new Date().toISOString(),
            };

            queryClient.setQueryData<User[]>(ListKeysQueries.usersKeyAll, (old = []) => [
                ...old,
                optimisticUser,
            ]);

            return { previousUsers };


        },

        onError: (err, newUserData, context) => {
            if (context?.previousUsers) {
                queryClient.setQueryData(ListKeysQueries.usersKeyAll , context.previousUsers);
            }
        },

        onSettled: (newUserFromServer, error, variables, context) => {
            // Лучше всего — инвалидировать и перезагрузить список
            queryClient.invalidateQueries({ queryKey: ListKeysQueries.usersKeyAll });

            // Альтернатива: если сервер вернул пользователя с настоящим id → обновляем точечно
            if (newUserFromServer && !error) {
                queryClient.setQueryData<User[]>(ListKeysQueries.usersKeyAll, (old = []) =>
                    old.map((u) =>
                        // Заменяем временный id на настоящий (если сравниваете по email)
                        u.email === newUserFromServer.email ? newUserFromServer : u
                    )
                );
            }
        },

        onSuccess: (newUser) => {
            // Например:
            queryClient.setQueryData(["currentUser"], newUser);
            router.push("/users");
        },
    });

    }






