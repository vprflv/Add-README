'use client';


import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {useRouter} from "next/navigation";
import { useForm } from '@tanstack/react-form';
import {useMutation} from "@tanstack/react-query";
import {zodValidator,type zodValidator } from "@tanstack/zod-form-adapter";

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

    const form = useForm<LoginForm, typeof zodValidator>({
        defaultValues: {
            email: '',
            password: '',
        },
        validatorAdapter: zodValidator(),
        validators: {
            onChange: loginSchema,
               },
        onSubmit:  async ({ value }) => {
                     try {
                         const response = await loginUser(value);
                         if ('isAuthenticated' in response && response.isAuthenticated) {
                             router.push('/');
                         }
                    }catch (err:any) {
                         throw new Error(err.message || 'Ошибка входа');
                     }

                    // Пример: await loginUser(value);
                     // await new Promise(r => setTimeout(r, 1500)); // симуляция
                     // throw new Error('Test server error'); // для теста ошибки
                 },

    });


    const mutation= useMutation({
        mutationFn: loginUser,
        onSuccess: (response) => {
            if ('isAuthenticated' in response && response.isAuthenticated) {

                router.push('/'); // или куда вам нужно после логина
            }
        },

    });

    return {
        form,
        isLoading: form.state.isSubmitting,
        error: form.state.errors?.[0] || null,
        login: mutation.mutate,
        isSuccess: false,
    };


}






