import {ProfilePage} from "@/components/profile/ProfilePage";
import {getCurrentUser} from "@/lib/supabase/server";

export default async function Profile(){
    const user = await getCurrentUser();

    return (<div>
        <ProfilePage currentUser={user} />
    </div>)
}