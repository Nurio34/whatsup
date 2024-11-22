import SideMenuNav from "./components/SideMenu";
import Menu from "./components/Menu";
import Screen from "./components/Screen";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { getUser } from "./actions";
import DeleteUserFromFirebase from "./components/DeleteUserFromFirebase";

async function HomeAuth() {
  const JWT_SECRET = process.env.JWT_SECRET;

  const token = (await cookies()).get("auth-token")?.value;

  if (token) {
    const { id } = jwt.verify(token, JWT_SECRET!) as JwtPayload;

    const user = await getUser(id);

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
}

export default HomeAuth;
