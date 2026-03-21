import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SafeUser, Vehicle} from "@/shared/types";
import {ListKeysQueries} from "@/shared/keys";
import {useRouter} from "next/navigation";

export function useAddVehicle() {
    const router = useRouter();
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (vehicleData: Omit<Vehicle, 'id'>) => {
            const res = await fetch('/api/addVehicle', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vehicleData),
            })
            if (!res.ok) throw new Error(await res.text())
            return res.json()
        },

        onSuccess: () => {
            router.push("/profile");
        },

        onMutate: async (newVehicle) => {
            await queryClient.cancelQueries({ queryKey: ListKeysQueries.profilKey })
            const previous = queryClient.getQueryData<SafeUser>(ListKeysQueries.profilKey)

            if (previous) {
                const optimisticVehicle = { ...newVehicle, id: `optimistic-${Date.now()}` } as Vehicle
                queryClient.setQueryData<SafeUser>(ListKeysQueries.profilKey, {
                    ...previous,
                    vehicles: [...(previous.vehicles ?? []), optimisticVehicle],
                })
            }
            return { previous }

        },

        onError: (_, __, context) => {
            if (context?.previous) {
                queryClient.setQueryData(ListKeysQueries.profilKey, context.previous)
            }
        },

        onSettled: () => {

            queryClient.invalidateQueries({ queryKey: ListKeysQueries.profilKey })
        },

    })
}