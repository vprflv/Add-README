'use client'


import Link from 'next/link';
import {useProfile} from "@/lib/hooks/useProfile";



export function ProfilePage() {
    const { data: user, isLoading,error  } = useProfile()


    if (isLoading) {
        return (
            <div className="p-8">
                <div className="bg-white shadow rounded-xl p-6">
                    <p className="text-lg">Загрузка профиля...</p>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="p-8">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <p className="text-red-600">
                        {error ? error.message : "Не удалось загрузить профиль"}
                    </p>
                </div>
            </div>
        );
    }




          return (

              <div className="p-8">
                  <div className="bg-white shadow rounded-xl p-6 mb-8">
                      <h1 className="text-3xl font-bold mb-6">Профиль пользователя</h1>

                      <div className="space-y-3 text-lg">
                          <p><strong>Email:</strong> {user.email}</p>
                          <p><strong>Имя:</strong> {user.name || 'Не указано'}</p>
                          <p><strong>ID:</strong> {user.id}</p>
                      </div>
                  </div>

                  {/* === БЛОК С АВТОМОБИЛЯМИ === */}
                  <div className="bg-white shadow rounded-xl p-6">
                      <div className="flex justify-between items-center mb-6">
                          <h2 className="text-2xl font-semibold">
                              Мои транспортные средства ({user.vehicles?.length ?? 0})
                          </h2>
                      </div>

                      <Link
                          href="/vehicle/addVehicle"
                          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition"
                      >
                          + Добавить ТС
                      </Link>
                  </div>

                  {user.vehicles?.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">
                          У вас пока нет добавленных автомобилей
                      </p>
                  ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                          {user.vehicles?.map((vehicle, index) => (
                              <div
                                  key={vehicle.id || index} // лучше использовать id, когда он появится
                                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
                              >
                                  <h3 className="font-semibold text-xl mb-3">{vehicle.name}</h3>
                                  <div className="space-y-2 text-gray-600">
                                      <p><strong>VIN:</strong> {vehicle.vin}</p>
                                      <p><strong>Год:</strong> {vehicle.year}</p>
                                      <p><strong>Цвет:</strong> {vehicle.color}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  )}
              </div>


          )
}

