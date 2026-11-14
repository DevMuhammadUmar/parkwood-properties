import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";

export type Language = "en" | "ar";

interface NavContextType {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  isScrolled: boolean;
  menuButtonRef: React.RefObject<HTMLButtonElement | null>;
}

const NavContext = createContext<NavContextType | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLangState] = useState<Language>("en");
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  // Monitor scroll for header transformation (> 40px)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync lang & dir attributes with <html>
  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLang;
      document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
      try {
        localStorage.setItem("parkwood_lang", newLang);
      } catch {
        // LocalStorage access may be restricted
      }
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "en" ? "ar" : "en");
  }, [lang, setLang]);

  // Read initial saved language if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("parkwood_lang") as Language | null;
      if (saved === "en" || saved === "ar") {
        setLang(saved);
      }
    } catch {
      // Ignore
    }
  }, [setLang]);

  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Lock body scroll and set inert when menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      const mainContent = document.getElementById("main-content");
      const footer = document.querySelector("footer");
      if (mainContent) mainContent.setAttribute("inert", "");
      if (footer) footer.setAttribute("inert", "");
    } else {
      document.body.style.overflow = "";
      const mainContent = document.getElementById("main-content");
      const footer = document.querySelector("footer");
      if (mainContent) mainContent.removeAttribute("inert");
      if (footer) footer.removeAttribute("inert");
    }

    return () => {
      document.body.style.overflow = "";
      const mainContent = document.getElementById("main-content");
      const footer = document.querySelector("footer");
      if (mainContent) mainContent.removeAttribute("inert");
      if (footer) footer.removeAttribute("inert");
    };
  }, [isMenuOpen]);

  return (
    <NavContext.Provider
      value={{
        isMenuOpen,
        openMenu,
        closeMenu,
        toggleMenu,
        lang,
        setLang,
        toggleLang,
        isScrolled,
        menuButtonRef,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return ctx;
}
