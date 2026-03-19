import { z } from 'zod';
import { zodValidator } from '@tanstack/zod-form-adapter';
import {useAddVehicle} from "@/lib/hooks/useAddVehicle";
import {useForm} from "@tanstack/react-form";


const vehicleSchema = z.object({
    name: z.string().min(1, 'Название обязательно'),
    vin: z.string().min(1, 'VIN обязателен'),
    year: z.number().min(1900).max(new Date().getFullYear() + 1),
    color: z.string().min(1, 'Цвет(не обязательно)').optional(),
});

type VehicleForm = z.infer<typeof vehicleSchema>;


export function AddVehicleForm(){
    const { mutate: addVehicle, isPending } = useAddVehicle();

    const form = useForm<VehicleForm>({
        defaultValues: { name: '', vin: '', year: new Date().getFullYear(), color: '' },
        validatorAdapter: zodValidator(),
        validators: { onChange: vehicleSchema },
        onSubmit: async ({ value }) => {
            addVehicle(value);
            form.reset();
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            className="space-y-4 bg-white p-6 rounded-xl shadow"
        >
            <form.Field name="name" children={(field) => (
                <div>
                    <label>Название автомобиля</label>
                    <input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)}
                           className="w-full border p-3 rounded"/>
                    {field.state.meta.errors && <p className="text-red-500 text-sm">{field.state.meta.errors}</p>}
                </div>
            )}/>

            <form.Field name="vin" children={(field) => (
                <div>
                    <label>VIN</label>
                    <input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)}
                           className="w-full border p-3 rounded"/>
                </div>
            )}/>

            <div className="grid grid-cols-2 gap-4">
                <form.Field name="year" children={(field) => (
                    <div>
                        <label>Год</label>
                        <input type="number" value={field.state.value}
                               onChange={(e) => field.handleChange(Number(e.target.value))}
                               className="w-full border p-3 rounded"/>
                    </div>
                )}/>

                <form.Field name="color" children={(field) => (
                    <div>
                        <label>Цвет</label>
                        <input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)}
                               className="w-full border p-3 rounded"/>
                    </div>
                )}/>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
                {isPending ? 'Добавляем...' : 'Добавить автомобиль'}
            </button>

        </form>
    )
}

