'use client';

import { useProducts } from "@/lib/hooks/useProducts";
import Image from "next/image";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const supabase = createSupabaseBrowserClient();

export function ProductsPage() {
    const { data: products, isLoading, error } = useProducts();

    if (isLoading) {
        return (
            <div className="p-8">
                <div className="bg-white shadow rounded-2xl p-10 text-center">
                    <p className="text-xl text-gray-600">Загрузка товаров...</p>
                </div>
            </div>
        );
    }

    if (error || !products) {
        return (
            <div className="p-8">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                    <p className="text-red-600 text-lg">
                        {error? error.message : "Не удалось загрузить товары"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-10">Наши товары</h1>

            {products.length === 0 ? (
                <div className="text-center py-20 text-gray-500 text-xl">
                    Пока нет товаров
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => {
                        const imageUrl = product.photo
                            ? supabase.storage
                                .from('product-photos')
                                .getPublicUrl(product.photo).data.publicUrl
                            : null;

                        return (
                            <div
                                key={product.id}
                                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                            >
                                {/* Фото */}
                                <div className="w-full h-56 bg-gray-100 overflow-hidden rounded-t-2xl">
                                    {imageUrl ? (
                                        <Image
                                            src={imageUrl}
                                            alt={product.name || "Товар"}
                                            width={400}
                                            height={224}
                                            className="w-full h-full object-cover"
                                            sizes="(max-width: 768px) 100vw, 300px"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            Нет фото
                                        </div>
                                    )}
                                </div>

                                {/* Информация */}
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 min-h-[3.5rem]">
                                        {product.name}
                                    </h3>

                                    <div className="mt-3 space-y-2 text-sm text-gray-600">
                                        {product.OEM && <p>OEM: <span className="font-medium text-gray-700">{product.OEM}</span></p>}
                                        {product.applicability && (
                                            <p>Применяемость: <span className="font-medium text-gray-700">
                                                {Array.isArray(product.applicability) ? product.applicability.join(', ') : product.applicability}
                                            </span></p>
                                        )}
                                    </div>

                                    {/* Цена + кнопка */}
                                    <div className="mt-auto pt-6 flex items-end justify-between">
                                        <p className="text-2xl font-bold text-emerald-600">
                                            {product.price?.toLocaleString('ru-RU')} ₽
                                        </p>

                                        <button
                                            onClick={() => alert(`✅ Товар "${product.name}" добавлен в корзину!`)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-bold text-lg"
                                        >
                                            В корзину
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}