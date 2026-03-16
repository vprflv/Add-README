import {createSupabaseServerClient} from "@/lib/supabase/server";
import {NextResponse} from "next/server";

export async function POST() {
    try{
        const supabase = await createSupabaseServerClient();

        const { error } = await supabase.auth.signOut();


        if (error) {
            console.error("Supabase signOut error:", error);
            return NextResponse.json({ error: "Не удалось выйти" }, { status: 500 });
        }

        return NextResponse.json({ success: true }, { status: 200 });

    }catch(err){
        console.error("Logout server error:", err);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }

}