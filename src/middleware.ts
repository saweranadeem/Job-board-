import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

export default authkitMiddleware({
  redirectUri: "http://localhost:3000/api/auth/callback", // Change this for production
});

// Apply authentication middleware to all pages
export const config = {
  matcher: ["/((?!_next|api/auth|public|static|favicon.ico).*)"],
};
