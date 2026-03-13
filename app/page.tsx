import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";


export default function Home() {
    return (
        <>
            <Header />

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
                    {/* Hero / основной контент */}
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                            Добро пожаловать в будущее
                        </h1>

                        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                            Создавайте, делитесь и вдохновляйтесь вместе с тысячами людей
                            по всему миру. Быстро, красиво, удобно.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/register"
                                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-sm"
                            >
                                Начать бесплатно
                            </a>
                            <a
                                href="#features"
                                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-xl transition"
                            >
                                Узнать больше
                            </a>
                        </div>
                    </div>

                    {/* Пример карточек */}
                    <div id="features" className="mt-24 grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Мгновенно",
                                text: "Создавайте проекты за считанные минуты",
                            },
                            {
                                title: "Стильно",
                                text: "Современный дизайн из коробки",
                            },
                            {
                                title: "Вместе",
                                text: "Работайте в команде в реальном времени",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}