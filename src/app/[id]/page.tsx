import SideMenuNav from "./components/SideMenu";
import Menu from "./components/Menu";
import Screen from "./components/Screen";
import { redirect } from "next/navigation";
import DeleteUserFromFirebase from "./components/DeleteUserFromFirebase";
import { getUser } from "./actions";

type AsyncRouteContext = {
  params: Promise<Record<string, string | string[]>>;
  searchParams: Promise<URLSearchParams>;
};

async function HomeAuth(context: AsyncRouteContext) {
  const { id } = await context.params;

  const user = await getUser(id as string);
  console.log(user);

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
