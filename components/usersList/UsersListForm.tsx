import {useUsers} from "@/lib/hooks/useUsers";


export function UsersLIst(){
    const { data: users, isLoading, error } = useUsers();

    if (isLoading) {
        return <div className="p-8 text-center">Загрузка пользователей...</div>;
    }

    if (error) {
        return (
            <div className="p-8 text-center text-red-600">
                Ошибка: {(error as Error).message}
            </div>
        );
    }

    if (!users?.length) {
        return <div className="p-8 text-center">Пользователей пока нет</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Зарегистрированные пользователи</h1>

            <div className="grid gap-4">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
                    >
                        <div className="font-medium">{user.name || "Без имени"}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                        <div className="text-xs text-gray-500 mt-1">
                            Зарегистрирован: {new Date(user.createdAt).toLocaleString("ru-RU")}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}