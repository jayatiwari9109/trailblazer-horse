import { Link } from "@tanstack/react-router";
import {
  useEffect,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  Menu,
  Moon,
  Sun,
  User,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookingPopup } from "@/components/site/BookingPopup";

const nav = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/trails",
    label: "Horse Trails",
  },
  {
    to: "/experiences",
    label: "Experiences",
  },
  {
    to: "/packages",
    label: "Packages",
  },
  {
    to: "/about",
    label: "About",
  },
  {
    to: "/gallery",
    label: "Gallery",
  },
  {
    to: "/blog",
    label: "Blog",
  },
  {
    to: "/contact",
    label: "Contact",
  },
] as const;

export function Header() {
  const [scrolled, setScrolled] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [dark, setDark] =
    useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(
        window.scrollY > 20,
      );
    };

    onScroll();

    window.addEventListener(
      "scroll",
      onScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll,
      );
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      dark,
    );
  }, [dark]);

  return (
    <motion.header
      initial={{
        y: -20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "py-2"
          : "py-4",
      )}
    >
      <div className="container-wide">
        <div
          className={cn(
            "glass flex items-center justify-between gap-4 rounded-2xl px-4 py-3 md:px-6",
            scrolled &&
              "shadow-elegant",
          )}
        >
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <div className="gradient-forest grid h-10 w-10 shrink-0 place-items-center rounded-xl text-forest-foreground shadow-glow">
              <span className="font-display text-lg font-bold">
                H
              </span>
            </div>

            <div className="hidden sm:block">
              <div className="font-display text-lg font-bold leading-none text-forest">
                Horse Trails
              </div>

              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Premium Equestrian
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{
                  exact:
                    item.to === "/",
                }}
                className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-cream hover:text-forest data-[status=active]:bg-forest data-[status=active]:text-forest-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex"
              onClick={() =>
                setDark(
                  (current) =>
                    !current,
                )
              }
            >
              {dark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="hidden gap-2 md:inline-flex"
              asChild
            >
              <Link to="/login">
                <User className="h-4 w-4" />
                Login
              </Link>
            </Button>

            {/* Desktop Book Now popup */}
            <div className="hidden md:block">
              <BookingPopup
                trailName="Horse Trails Experience"
              />
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() =>
                setMenuOpen(
                  (current) =>
                    !current,
                )
              }
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="glass mt-2 rounded-2xl p-3 lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {nav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() =>
                      setMenuOpen(
                        false,
                      )
                    }
                    className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-cream"
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="mt-2 border-t border-border pt-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      asChild
                    >
                      <Link
                        to="/login"
                        onClick={() =>
                          setMenuOpen(
                            false,
                          )
                        }
                      >
                        Login
                      </Link>
                    </Button>

                    <Button
                      className="bg-forest text-forest-foreground"
                      asChild
                    >
                      <Link
                        to="/register"
                        onClick={() =>
                          setMenuOpen(
                            false,
                          )
                        }
                      >
                        Register
                      </Link>
                    </Button>
                  </div>

                  {/* Mobile Book Now popup */}
                  <div className="mt-3 flex justify-center">
                    <BookingPopup
                      trailName="Horse Trails Experience"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}