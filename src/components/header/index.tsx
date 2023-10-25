"use client"
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { menuItems } from "@/utils";
import { MenuItem } from "@/utils/types";
import Button from "../button";
import ThemeToggler from "../theme";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { GlobalContext } from "@/context";

export default function Header() {
  const [sticky, setSticky] = useState<boolean>(false);
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const { setSearchQuery, setSearchResults } = useContext(GlobalContext);
  const router = useRouter();
  const pathName = usePathname();
  const [loginOptionsOpen, setLoginOptionsOpen] = useState(false);

  function handleStickyNavbar() {
    if (window.scrollY >= 80) setSticky(true);
    else setSticky(false);
  }

  function handleNavbarToggle() {
    setNavbarOpen(!navbarOpen);
  }

  function handleLoginOptionsToggle() {
    setLoginOptionsOpen(!loginOptionsOpen);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  useEffect(() => {
    setSearchResults([]);
    setSearchQuery("");
  }, [pathName]);

  return (
    <div>
      <header
        className={`top-0 left-0 z-40 flex w-full items-center bg-transparent
        ${
          sticky
            ? "!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky backdrop:blur-sm !transition dark:!bg-primary dark:!bg-opacity-20"
            : "absolute"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href={"/"}
                className={`text-[30px] font-extrabold cursor-pointer block w-full
                  ${sticky ? "py-5 lg:py-2" : "py-8"}
                `}
              >
                BlogApp
              </Link>
            </div>
            <div className="hidden lg:flex w-full items-center justify-between px-4">
              <ul className="flex space-x-12">
                {menuItems.map((item: MenuItem) => (
                  <li key={item.id} className="group relative">
                    <Link
                      href={item.path}
                      className={`flex py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex gap-4 items-center justify-end">
                {session ? (
                  <>
                    <Button
                      onClick={() => router.push("/create")}
                      text="Create Blog"
                    />
                    <Button onClick={() => signOut()} text="Logout" />
                  </>
                ) : (
                  <>
                    <Button onClick={handleLoginOptionsToggle} text="Login" />
                    {loginOptionsOpen && (
                      <ul className="flex gap-2">
                        <li>
                          <Button
                            onClick={() => signIn("github")}
                            text="GitHub"
                          />
                        </li>
                        <li>
                          <Button
                            onClick={() => signIn("google")}
                            text="Google"
                          />
                        </li>
                      </ul>
                    )}
                  </>
                )}
                <div className="flex gap-3 items-center">
                  <ThemeToggler />
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-between px-4 lg:hidden">
              <button
                onClick={handleNavbarToggle}
                id="navbarToggler"
                aria-label="Mobile Menu"
                className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2"
              >
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white
                    ${navbarOpen ? "top-[7px] rotate-45" : ""}
                  `}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white
                    ${navbarOpen ? "opacity-0" : ""}
                  `}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white
                    ${navbarOpen ? "top-[-8px] -rotate-45" : ""}
                  `}
                />
              </button>
            </div>
          </div>

          <nav
            id="navbarCollapse"
            className={`absolute right-0 z-30 w-full rounded border-[.5px] bg-white border-body-color/50 py-4 px-6 duration-300 dark:border-body-color/20 dark:bg-dark lg:hidden
              ${navbarOpen ? "top-full opacity-100" : "top-[120%] opacity-0"}
            `}
          >
            <div className="flex gap-3 items-end justify-end">
              <ThemeToggler />
            </div>
            <ul className="block">
              {menuItems.map((item: MenuItem) => (
                <li key={item.id} className="group relative">
                  <Link
                    href={item.path}
                    className={`block py-2 text-base text-dark group-hover:opacity-70 dark:text-white`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {session ? (
                <li>
                  <Button
                    onClick={() => router.push("/create")}
                    text="Create Blog"
                  />
                  <Button onClick={() => signOut()} text="Logout" />
                </li>
              ) : (
                <li>
                  <Button onClick={handleLoginOptionsToggle} text="Login" />
                  {loginOptionsOpen && (
                    <ul className="flex gap-2">
                      <li className=" py-4">
                        <Button
                          onClick={() => signIn("github")}
                          text="GitHub"
                        />
                      </li>
                      <li className=" py-4">
                        <Button
                          onClick={() => signIn("google")}
                          text="Google"
                        />
                      </li>
                    </ul>
                  )}
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}