"use client";
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

const read = (k, fb) => {
  try { const v = JSON.parse(localStorage.getItem(k)); return v ?? fb; } catch { return fb; }
};

export default function StoreProvider({ products, children }) {
  const [favs, setFavs] = useState([]);
  const [cart, setCart] = useState({}); // { slug: qty }
  const [panel, setPanel] = useState(null); // 'search' | 'favs' | 'cart' | null
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFavs(read("ds-favs", []));
    setCart(read("ds-cart", {}));
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem("ds-favs", JSON.stringify(favs)); localStorage.setItem("ds-cart", JSON.stringify(cart)); } catch {}
  }, [favs, cart, ready]);

  // Trava a rolagem quando um painel está aberto
  useEffect(() => {
    document.body.style.overflow = panel ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [panel]);

  const toggleFav = useCallback((slug) => setFavs((f) => (f.includes(slug) ? f.filter((s) => s !== slug) : [...f, slug])), []);
  const addToCart = useCallback((slug) => { setCart((c) => ({ ...c, [slug]: (c[slug] || 0) + 1 })); setPanel("cart"); }, []);
  const setQty = useCallback((slug, q) => setCart((c) => { const n = { ...c }; if (q <= 0) delete n[slug]; else n[slug] = q; return n; }), []);

  const value = useMemo(() => ({
    products, favs, cart, panel, setPanel, toggleFav, addToCart, setQty,
    cartCount: Object.values(cart).reduce((a, b) => a + b, 0),
  }), [products, favs, cart, panel, toggleFav, addToCart, setQty]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
