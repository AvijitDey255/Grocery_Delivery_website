import { auth } from "@/auth";
import EditRoleMobile from "@/components/EditRoleMobile";
import NavBar from "@/components/NavBar";
import connectDB from "@/lib/db";
import User from "@/models/user.model";
import { redirect } from "next/navigation";


export default async function Home() {
  await connectDB()
  const session  = await auth()
  const user = await User.findById(session?.user?.id)
  if(!user)
  {
    redirect("/login")
  }
  const InComplete = !user.mobile || !user.role || (!user.mobile && user.role=="user")

  if(InComplete){
    return <EditRoleMobile/>
  }
  return (
    <>
      <NavBar user={user}/>
    </>
  );
}
