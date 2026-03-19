'use client';

import {SafeUser, Vehicle} from "@/shared/types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ListKeysQueries} from "@/shared/keys";

const addVehicleFn = async (vehicleData: Omit<Vehicle, 'id'>) => {
    const res = await fetch('/api/addVehicle', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(vehicleData),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Ошибка добавления');
    }
    return res.json();
};

export function useAddVehicle() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addVehicleFn,

        onMutate: async (newVehicle) => {
            await queryClient.cancelQueries({ queryKey: ListKeysQueries.profilKey });
            const previousProfile = queryClient.getQueryData<SafeUser>(ListKeysQueries.profilKey);
            if (previousProfile) {
                queryClient.setQueryData<SafeUser>(ListKeysQueries.profilKey, {
                    ...previousProfile,
                    vehicles: [...(previousProfile.vehicles ?? []), newVehicle as Vehicle],
                });
            }
            return { previousProfile };
        },
        onError: (err, newVehicle, context) => {
            if (context?.previousProfile) {
                queryClient.setQueryData(ListKeysQueries.profilKey, context.previousProfile);
            }
            console.error('Ошибка добавления автомобиля:', err);
        },

        onSettled: () => {
            // Финальная синхронизация с сервером
            queryClient.invalidateQueries({ queryKey:ListKeysQueries.profilKey });
        },

    })
}



