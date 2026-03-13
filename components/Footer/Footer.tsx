export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">МойПроект</h3>
                        <p className="text-sm">© 2025 — {new Date().getFullYear()} Все права защищены.</p>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-3">Продукт</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition">Функции</a></li>
                            <li><a href="#" className="hover:text-white transition">Цены</a></li>
                            <li><a href="#" className="hover:text-white transition">Для команд</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-3">Компания</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition">О нас</a></li>
                            <li><a href="#" className="hover:text-white transition">Блог</a></li>
                            <li><a href="#" className="hover:text-white transition">Карьера</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-3">Поддержка</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition">Помощь</a></li>
                            <li><a href="#" className="hover:text-white transition">Контакты</a></li>
                            <li><a href="#" className="hover:text-white transition">Документация</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}