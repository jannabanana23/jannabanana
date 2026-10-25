import Link from "next/link";
import { profile } from "@/content/profile";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="site-header__name">
        {profile.shortName}
      </Link>
      <nav aria-label="Main">
        <ul className="site-header__nav">
          <li><Link href="/#works">Works</Link></li>
          <li><Link href="/#about">About</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
