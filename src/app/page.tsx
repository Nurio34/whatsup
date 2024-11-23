import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import HomeAuth from "./components/HomeAuth";
import HomeUnauth from "./components/HomeUnauth";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function HomePage() {
  const _cookies = await cookies();
  console.log({ _cookies });

  const token = _cookies.get("auth-token")?.value;
  console.log({ token });

  if (token) {
    const { id } = jwt.verify(token, JWT_SECRET!) as JwtPayload;
    console.log({ id });

    if (id) {
      return <HomeAuth />;
    } else {
      return <HomeUnauth />;
    }
  } else {
    return <HomeUnauth />;
  }
}

// async function HomePage() {
//   const token = (await cookies()).get("auth-token")?.value;
//   console.log(token);

//   try {
//     if (token) {
//       const { id } = jwt.verify(token, JWT_SECRET!) as JwtPayload; // Verify the JWT

//       if (id) {
//         return <HomeAuth />;
//       } else {
//         return <HomeUnauth />;
//       }
//     }

//     // Token exists but is invalid/expired
//     console.log("Token is invalid or expired");
//     return <HomeUnauth />;
//   } catch (error: unknown) {
//     // Handle expired JWT
//     if (error instanceof jwt.TokenExpiredError) {
//       console.error("JWT expired:", error.message);
//     } else if (error instanceof jwt.JsonWebTokenError) {
//       console.error("JWT error:", error.message);
//     } else {
//       console.error("Unexpected error:", error);
//     }
//   }
// }

// export default HomePage;
