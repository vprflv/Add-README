'use client';


import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";

async function logoutUser(): Promise<{ success: true }> {
    const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || 'Ошибка выхода');
    }
    debugger
    return data;
}

export function useLogout() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            router.push('/login');

        },
        onError: (err: any) => {
            console.error('Logout failed:', err.message);
            // здесь можно показать toast / alert
        },

    });

    return {
        logout: mutation.mutate,
        isLoading: mutation.isPending,
        error: mutation.error?.message || null,
    };

}



