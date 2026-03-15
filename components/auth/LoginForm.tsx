'use client';

import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useStore } from '@tanstack/react-form';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Input } from '@/components/ui/input';

import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';

import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import {useLogin} from "@/lib/hooks/useLogin";





export function LoginForm() {
    const { form,  isLoading, error: serverError,loginSchema } = useLogin();



    const isSubmitting = useStore(
        form.store,                            // ← передаём form.store
        (state) => state.isSubmitting
    );

    return (
        <Card className=" mx-auto w-full max-w-md border-border/40 shadow-sm">
            <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl font-bold tracking-tight text-center">
                    Вход в аккаунт
                </CardTitle>
                <CardDescription className="text-center">
                    Введите email и пароль
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="space-y-5"
                >
                    {/* Поле Email */}
                    <form.Field
                        name="email"
                        validators={{
                            onChange: loginSchema.shape.email,
                        }}
                    >
                        {(field) => {
                            const hasError = Boolean(field.state.meta.errors?.length > 0);
                            return (
                                <Field data-invalid={hasError}>
                                    <FieldLabel>Email</FieldLabel>
                                    <FieldContent>
                                        <Input
                                            placeholder="name@example.com"
                                            type="email"
                                            autoComplete="email"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                        />
                                    </FieldContent>
                                    {field.state.meta.errors?.length > 0 && (
                                        // @ts-expect-error FieldError returns null | JSX.Element, but we guard with &&
                                        <FieldError>
                                            {field.state.meta.errors.join(", ")}
                                        </FieldError>
                                    )}

                                </Field>
                            );
                        }}
                    </form.Field>

                    {/* Поле Password */}
                    <form.Field
                        name="password"
                        validators={{
                            onChange: loginSchema.shape.password,
                        }}
                    >
                        {(field) => {
                            const hasError = Boolean(field.state.meta.errors?.length > 0);
                            return (
                                <Field data-invalid={hasError}>
                                    <FieldLabel>Пароль</FieldLabel>
                                    <FieldContent>
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                            autoComplete="current-password"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                        />
                                    </FieldContent>
                                    {field.state.meta.errors?.length > 0 && (
                                        // @ts-expect-error FieldError returns null | JSX.Element, but we guard with &&
                                        <FieldError>
                                            {field.state.meta.errors.join(", ")}
                                        </FieldError>
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>

                    {/* Глобальная ошибка (если onSubmit кидает ошибку) */}
                    {form.state.errors?.length > 0 && (
                        <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive text-center">
                            {form.state.errors.join(', ')}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full font-medium"
                        disabled={isSubmitting}
                    >
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Войти
                    </Button>
                </form>
            </CardContent>

            <CardFooter className="flex flex-col items-center justify-center gap-2 border-t bg-muted/40 px-6 py-4 text-sm text-muted-foreground">
                <p>
                    Нет аккаунта?{' '}
                    <Link
                        href="/register"
                        className="text-primary underline-offset-4 hover:underline font-medium"
                    >
                        Зарегистрироваться
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )

}






