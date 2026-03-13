export default function Header() {
    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Логотип */}
                    <div className="flex items-center">
                        <a href="/" className="text-2xl font-bold text-indigo-600">
                            МойПроект
                        </a>
                    </div>

                    {/* Правая часть — авторизация */}
                    <div className="flex items-center gap-4">
                        <a
                            href="/login"
                            className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition"
                        >
                            Войти
                        </a>
                        <a
                            href="/register"
                            className="bg-indigo-600 text-white hover:bg-indigo-700 px-5 py-2.5 text-sm font-medium rounded-lg transition shadow-sm"
                        >
                            Регистрация
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}