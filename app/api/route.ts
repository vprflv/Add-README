import { NextResponse } from 'next/server';

let todos: any[] = [
    { id: 1, title: 'Купить молоко', completed: false },
    { id: 2, title: 'Сходить в зал', completed: true },
];


// ────────────────────────────────────────────────
// GET    /api/todos          → все записи
// GET    /api/todos?id=1     → одна запись (query)
// POST   /api/todos          → создать
// PUT    /api/todos?id=1     → обновить
// DELETE /api/todos?id=1     → удалить
// ────────────────────────────────────────────────


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        const todo = todos.find(t => t.id === Number(id));
        return todo
            ? NextResponse.json(todo)
            : NextResponse.json({ error: 'Not found' }, { status:404} );

    }

    return NextResponse.json(todos);
}


export async function POST(request: Request) {
    const body = await request.json();
    const newTodo = {
        id: todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1,
        ...body,
        completed: false,
    };
    todos.push(newTodo);
    return NextResponse.json(newTodo, { status: 201 });
}


export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));
    const body = await request.json();

    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    todos[index] = { ...todos[index], ...body };
    return NextResponse.json(todos[index]);
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));

    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    todos.splice(index, 1);
    return new NextResponse(null, { status: 204 });
}