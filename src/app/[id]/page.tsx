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
  console.log(context);
  const params = await context.params;
  const searchParamas = await context.searchParams;
  console.log(params);
  console.log(searchParamas);

  const { token } = await context.searchParams;

  try {
    const response = await getUser(token);
    console.log(response);

    if (response) {
      const { user } = response;

      if (user.newUser) return redirect("/new-user");

      return (
        <main className="flex">
          <DeleteUserFromFirebase />
          <SideMenuNav user={user} />
          <Menu user={user} />
          <Screen />
        </main>
      );
    } else {
      console.log("No response");

      redirect("/logout");
    }
  } catch (error) {
    console.log("Error", error);

    redirect("/logout");
  }
}

export default HomeAuth;
