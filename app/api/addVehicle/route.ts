import {createSupabaseServerClient, getCurrentUser} from "@/lib/supabase/server";
import {NextResponse} from "next/server";



export async function PATCH(request: Request) {

  try {
      const supabase = await createSupabaseServerClient();
      const currentUser = await getCurrentUser();

      if (!currentUser) {
          return NextResponse.json({error: 'Не авторизован'}, {status: 401})
      }

      const body = await request.json()

      const {name, vin, year, color} = body

      if (!name || !vin || year == null || !color) {
          return NextResponse.json({error: 'Все поля обязательны'}, {status: 400})
      }

      const newVehicle = {
          name: String(name),
          vin: String(vin),
          year: Number(year),
          color: String(color),
      }


      const {data: profile, error} = await supabase
          .from('profiles')
          .select("vehicles")
          .eq("id", currentUser.id)
          .single();



      if (error) {
          console.error(error)
          return NextResponse.json({ error: 'Не удалось добавить автомобиль' }, { status: 500 })
      }

      const currentVehicles = profile?.vehicles || [];
      const updatedVehicles = [...currentVehicles, newVehicle];

      const { error: updateError } = await supabase
          .from("profiles")
          .update({
              vehicles: updatedVehicles,
              updated_at: new Date().toISOString(),
          })
          .eq("id", currentUser.id);

      if (updateError) {
          console.error("Ошибка обновления vehicles:", updateError);
          return NextResponse.json({ error: "Не удалось добавить автомобиль" }, { status: 500 });
      }

      return NextResponse.json({
          success: true,
          added: newVehicle,
          vehiclesCount: updatedVehicles.length,
      });
  }catch (err:any){
      console.error("Route error:", err);
      return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }


}