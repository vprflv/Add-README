'use client';


import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";

type LoginResponse = {
    isAuthenticated: boolean;
    id: string;
    email: string;
    name: string | null;
    createdAt: string;
} | {
    error: string;
};

const loginSchema = z.object({
    email: z.string().email('Некорректный email'),
    password: z.string().min(1, 'Пароль обязателен'),
});

type LoginForm = z.infer<typeof loginSchema>;

async function loginUser(credentials: LoginForm): Promise<LoginResponse> {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || 'Ошибка входа');
    }

    return data;


}

export function useLogin() {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });


    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (response) => {
            if ('isAuthenticated' in response && response.isAuthenticated) {
                // Можно добавить toast или alert «Успешный вход»
                // Обновляем все запросы, зависящие от авторизации
                // router.refresh(); // если используете server components + revalidation
                router.push('/dashboard'); // или куда вам нужно после логина
            }
        },
        onError: (error: Error) => {
            form.setError('root', { message: error.message });
        },

        return {
            form,
            isLoading: mutation.isPending,
            error: form.formState.errors.root?.message,
            login: mutation.mutate,
            isSuccess: mutation.isSuccess,
        };
    });




}






