'use client';

import { Button } from '@/components/ui/button';


import { Input } from '@/components/ui/input';
import {useLogin} from "@/lib/hooks/useLogin";
import {Form, FormControl, FormField, FormMessage} from "@radix-ui/react-form";
import {Label} from "@/components/ui/label";



export default function LoginForm() {
    const { form, isLoading, error, login } = useLogin();

    function onSubmit(values: { email: string; password: string }) {
        login(values);
    }

    return (
        <div className="w-full max-w-md space-y-8 p-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Вход в аккаунт</h2>
                <p className="text-muted-foreground mt-2">
                    Введите email и пароль
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Email</Label>
                                <FormControl>
                                    <Input placeholder="name@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>

            </Form>

        </div>
)
}