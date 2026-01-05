import Link from "next/link";
import { ThemeToggle } from "../ui/ThemeToggle";

export function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-semibold text-foreground">
              みんなの割り勘
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
