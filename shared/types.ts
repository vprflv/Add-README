export type User = {
    id: number;
    email: string;
    password: string;
    name?: string | null;
    createdAt: string | null;
};

export type SafeUser = {
    id: string;
    email: string;
    name?: string | null;
    createdAt: string | null;

};