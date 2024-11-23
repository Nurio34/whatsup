import SideMenuNav from "./components/SideMenu";
import Menu from "./components/Menu";
import Screen from "./components/Screen";
import { redirect } from "next/navigation";
import { getUser } from "./actions";
import DeleteUserFromFirebase from "./components/DeleteUserFromFirebase";

async function HomeAuth() {
  const user = await getUser();
  console.log({ user });

  if (user.newUser) return redirect("/new-user");

  return (
    <main className="flex">
      <DeleteUserFromFirebase />
      <SideMenuNav user={user} />
      <Menu user={user} />
      <Screen />
    </main>
  );
}

export default HomeAuth;
