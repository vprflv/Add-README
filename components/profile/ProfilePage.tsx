'use client'

import {SupabaseUser} from "@/supabase";
import Link from 'next/link';
export function ProfilePage({ currentUser }: { currentUser: SupabaseUser }) {

          return (
              <div className="p-8">
                  <div>
                      <h1 className="text-2xl font-bold mb-4">Профиль пользователя</h1>
                      <p><strong>Email:</strong> {currentUser.email}</p>
                      <p><strong>Имя:</strong> {currentUser.name || 'Не указано'}</p>
                      <p><strong>ID:</strong> {currentUser.id}</p>
                  </div>



                  <div>
                      <h1>
                          <Link href="/addVehicle" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                              Добавить TC
                          </Link>
                      </h1>
                  </div>
              </div>

          )
}

