'use client'

import {SupabaseUser} from "@/supabase";
import Link from 'next/link';
import {useQuery} from "@tanstack/react-query";
import {ListKeysQueries} from "@/shared/keys";
import {createSupabaseServerClient, getCurrentUser} from "@/lib/supabase/server";
import {allowedDisplayValues} from "next/dist/compiled/@next/font/dist/constants";


export function ProfilePage({ currentUser }: { currentUser: SupabaseUser }) {

          return (
              <div className="p-8">
                  <div className="bg-white shadow rounded-xl p-6 mb-8">
                      <h1 className="text-3xl font-bold mb-6">Профиль пользователя</h1>

                      <div className="space-y-3 text-lg">
                          <p><strong>Email:</strong> {currentUser.email}</p>
                          <p><strong>Имя:</strong> {currentUser.name || 'Не указано'}</p>
                          <p><strong>ID:</strong> {currentUser.id}</p>
                      </div>

                  </div>

                  {/* === БЛОК С АВТОМОБИЛЯМИ === */}

                  <div className="bg-white shadow rounded-xl p-6">
                      <div className="flex justify-between items-center mb-6">
                          <h2 className="text-2xl font-semibold">
                              Мои транспортные средства ({currentUser.vehicles.length})
                          </h2>

                      </div>
                      <Link
                          href="/vehicle/addVehicle"
                          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition"
                      >
                          + Добавить ТС
                      </Link>
                  </div>


                  {currentUser.vehicles.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">
                          У вас пока нет добавленных автомобилей
                      </p>
                  ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentUser.vehicles.map((vehicle, index) => (
                              <div
                                  key={index} // пока нет id, используем index. Лучше добавить id в vehicle
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

