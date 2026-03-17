
'use client'

import {useState} from "react";
import Link from "next/link";
import {SupabaseUser} from "@/supabase";
import {useLogout} from "@/lib/hooks/useLogout";
import {ProfilePage} from "@/components/profile/ProfilePage";



export function UserDropdown({ user }: { user: SupabaseUser }) {
    const [isOpen, setIsOpen] = useState(false);
    const { logout, isLoading } = useLogout();

    const toggle = () => setIsOpen(!isOpen);
    const close = () => setIsOpen(false);

    const handleLogout = () => {
        logout();
        close();
    };

    return(
        <div className="relative">
            {/* Кнопка профиля */}
            <button
                onClick={toggle}
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-medium focus:outline-none"
            >
                <span>{user.name || user.email}</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Выпадающее меню */}

            {isOpen && (
                <>
                    {/* Оверлей для закрытия по клику вне */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={close}
                    />

                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-20">
                        <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900">
                                {user.name || 'Пользователь'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {user.email}
                            </p>
                        </div>

                        <Link
                            href="/profile"
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                            onClick={close}
                        >
                            Профиль
                        </Link>

                        <Link
                            href="/profile/settings"
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                            onClick={close}
                        >
                            Настройки
                        </Link>

                        <Link
                            href="/profile/orders"
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                            onClick={close}
                        >
                            Мои заказы / брони
                        </Link>

                        <div className="border-t border-gray-100 my-1" />

                        <button
                            onClick={handleLogout}
                            disabled={isLoading}
                            className ={`
                            block w-full text-left px-4 py-2.5 text-sm 
                                 ${isLoading ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:bg-red-50'} 
                                    transition
                            `}

                        >
                            Выйти
                        </button>
                    </div>
                </>
            )}
        </div>
    )

}