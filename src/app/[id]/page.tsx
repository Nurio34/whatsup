import SideMenuNav from "./components/SideMenu";
import Menu from "./components/Menu";
import Screen from "./components/Screen";
import { redirect } from "next/navigation";
import DeleteUserFromFirebase from "./components/DeleteUserFromFirebase";
import { getUser } from "./actions";

type AsyncRouteContext = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ token: string }>;
};

async function HomeAuth(context: AsyncRouteContext) {
  const { token } = await context.searchParams;

  try {
    const response = await getUser(token);

    if (response) {
      const { user } = response;

      if (user.newUser) return redirect("/new-user");

      return (
        <main className="flex overflow-y-hidden">
          <DeleteUserFromFirebase />
          <SideMenuNav desktop={true} />
          <Menu user={user} />
          <Screen />
        </main>
      );
    } else {
      redirect("/logout");
    }
  } catch (error) {
    console.log(error);

    redirect("/logout");
  }
}

export default HomeAuth;
