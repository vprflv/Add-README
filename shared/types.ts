import {Json} from "@/types/database.types";

export type User = {
    id: number;
    email: string;
    password: string;
    name?: string | null;
    createdAt: string | null;
};

export interface Vehicle {
    name: string;
    vin: string;
    year: number;
    color: string;
}

export type SafeUser = {
    id: string;
    email: string | null;
    name?: string | null;
    created_at: string | null;
    vehicles?: Vehicle[] | null;

};