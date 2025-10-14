import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-muted border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Responsive Grid: 4 cols -> 2 cols -> 1 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-center sm:text-left">
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/updates"
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  What&apos;s New
                </Link>
              </li>
              <li>
                <Link
                  href="/developers"
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Developers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/guidelines"
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link
                  href="/safety"
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Safety
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/dmca"
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  DMCA
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex justify-center sm:justify-start space-x-4 mb-4">
              {/* X (Twitter) */}
              <Link
                href="/coming-soon"
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <span className="sr-only">X</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>

              {/* Instagram */}
              <Link
                href="/coming-soon"
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.017 0C8.396 0 7.969.013 6.748.072 5.527.13 4.718.333 3.999.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.859.131 5.668.072 6.889.013 8.11 0 8.537 0 12.017s.013 3.907.072 5.128c.059 1.22.26 2.03.558 2.749.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.72.295 1.529.497 2.749.558 1.22.058 1.647.072 5.128.072 3.48 0 3.907-.013 5.128-.072 1.22-.059 2.029-.263 2.748-.558.789-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.295-.719.496-1.529.558-2.748.059-1.22.072-1.647.072-5.128 0-3.48-.013-3.907-.072-5.128C23.497 5.527 23.295 4.718 23 3.999c-.306-.789-.718-1.459-1.384-2.126C20.948.935 20.279.63 19.49.63c-.72-.295-1.529-.497-2.749-.558C15.521.013 15.094 0 11.614 0H12.017zm-.056 5.487c3.426 0 6.204 2.778 6.204 6.204 0 3.426-2.778 6.204-6.204 6.204-3.426 0-6.204-2.778-6.204-6.204 0-3.426 2.778-6.204 6.204-6.204zm0 10.230c2.222 0 4.025-1.803 4.025-4.026S14.183 7.665 11.961 7.665c-2.222 0-4.025 1.803-4.025 4.026s1.803 4.025 4.025 4.025zM19.539 5.287c0 .8-.649 1.449-1.449 1.449-.8 0-1.449-.649-1.449-1.449 0-.8.649-1.449 1.449-1.449.8 0 1.449.649 1.449 1.449z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>

              {/* YouTube */}
              <Link
                href="/coming-soon"
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <span className="sr-only">YouTube</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>

              {/* Facebook */}
              <Link
                href="/coming-soon"
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Follow us for updates and news
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© 2025 ThreadUp</span>
              <span>•</span>
              <span>Made with ❤️</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <select className="bg-transparent border-none text-muted-foreground cursor-pointer">
                <option>English</option>
                <option>Español</option>
                <option>Français</option>
                <option>Deutsch</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
