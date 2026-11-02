import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

// Pages that had the animated photo background in the original PHP site
const SLIDESHOW_PAGES = ["/", "/jewellery", "/collections", "/login", "/register", "/contact", "/estimator"];

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.classList.toggle("slideshow", SLIDESHOW_PAGES.includes(pathname));
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
