"use client";
import {useRegister} from "@/lib/hooks/useRegister";
import { useRouter } from "next/navigation";
import {useState} from "react";




export default function RegisterForm() {
    const { mutate, isPending, isSuccess, error } = useRegister();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");






    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

            mutate(
                { email, password, name },
                {
                    onSuccess: () => {
                        router.push("/");
                    },
                }
            );


    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 border rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6 text-center">Регистрация</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Имя (необязательно)</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1">
                        Email <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1">
                        Пароль <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {error && (
                    <p className="text-red-600 text-sm">
                        {error.message || "Ошибка регистрации"}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {isPending ? "Регистрация..." : "Зарегистрироваться"}
                </button>


            </form>

            {isSuccess && (
                <p className="mt-4 text-green-600 text-center">Успешно!</p>
            )}
        </div>
    )


}








