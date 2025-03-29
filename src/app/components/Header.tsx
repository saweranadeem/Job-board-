import Link from "next/link";
import React from "react";
import { getSignInUrl, withAuth, signOut } from "@workos-inc/authkit-nextjs";
const Header = async () => {
  const { user } = await withAuth();
  // Get the URL to redirect the user to AuthKit to sign in
  const signInUrl = await getSignInUrl();

  return (
    <>
      {/* {JSON.stringify(user)} */}
      <div className="container flex justify-between items-center mx-auto py-4 cursor-pointer">
        <Link href={"/"} className="font-bold text-lg">
          Job Fair
        </Link>
        <div className="flex gap-2 ">
          {!user && (
            <Link
              href={signInUrl}
              className="bg-gray-200 py-2 px-4 rounded-md  cursor-pointer"
            >
              Login
            </Link>
          )}
          {user && (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button className="bg-gray-200 py-2 px-4 rounded-md cursor-pointer ">
                Log out
              </button>
            </form>
          )}

          <Link
            href={"/new-post"}
            className="py-2 px-4 rounded-md bg-blue-600 text-white cursor-pointer"
          >
            Post a job
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
