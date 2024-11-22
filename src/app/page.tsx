import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import HomeAuth from "./components/HomeAuth";
import HomeUnauth from "./components/HomeUnauth";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function HomePage() {
  const token = (await cookies()).get("auth-token")?.value;

  if (token) {
    const { id } = jwt.verify(token, JWT_SECRET!) as JwtPayload;

    if (id) {
      return <HomeAuth />;
    } else {
      return <HomeUnauth />;
    }
  } else {
    return <HomeUnauth />;
  }
}
