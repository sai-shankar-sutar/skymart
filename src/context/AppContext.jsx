import { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS } from "../data/products";

const AppCtx = createContext(null);
export const useApp = () => useContext(AppCtx);

// NOTE ON STORAGE: this is a front-end-only demo, so "accounts" and the
// active session live in localStorage (plain text, no server, no hashing).
// That's enough to demonstrate real validation (unique email, wrong
// password, persisted login) but should NOT be treated as a real auth
// system — swap this for a real backend before shipping anything like it.
const USERS_KEY = "skymart_users";
const SESSION_KEY = "skymart_session";

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // storage unavailable (e.g. private browsing) — fail silently, session
    // just won't persist across reloads.
  }
}

function loadSessionEmail() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw)?.email ?? null : null;
  } catch {
    return null;
  }
}

function saveSessionEmail(email) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
  } catch {
    // ignore
  }
}

function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AppProvider({ children }) {
  const [user, setUser] = useState(null); // { name, email }
  const [route, setRoute] = useState("signin"); // signin | signup | home | shop | about
  const [shopCategory, setShopCategory] = useState("all"); // category filter to open Shop with
  const [cart, setCart] = useState({}); // productId -> qty
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  // Restore a logged-in session on first load, if one exists.
  useEffect(() => {
    const email = loadSessionEmail();
    if (email) {
      const found = loadUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (found) {
        setUser({ name: found.name, email: found.email });
        setRoute("home");
      } else {
        clearSession();
      }
    }
    setAuthReady(true);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  function signUp(name, email, password) {
    const cleanEmail = email.trim();
    if (!EMAIL_RE.test(cleanEmail)) {
      return { success: false, error: "Enter a valid email address." };
    }
    const users = loadUsers();
    const exists = users.some((u) => u.email.toLowerCase() === cleanEmail.toLowerCase());
    if (exists) {
      return {
        success: false,
        error: "An account with this email already exists. Try signing in instead.",
      };
    }
    const newUser = { name: name.trim(), email: cleanEmail, password };
    saveUsers([...users, newUser]);
    saveSessionEmail(cleanEmail);
    setUser({ name: newUser.name, email: newUser.email });
    setRoute("home");
    return { success: true };
  }

  function signIn(email, password) {
    const cleanEmail = email.trim();
    const users = loadUsers();
    const found = users.find((u) => u.email.toLowerCase() === cleanEmail.toLowerCase());
    if (!found) {
      return {
        success: false,
        error: "No account found with that email. Please sign up first.",
      };
    }
    if (found.password !== password) {
      return { success: false, error: "Incorrect password. Please try again." };
    }
    saveSessionEmail(found.email);
    setUser({ name: found.name, email: found.email });
    setRoute("home");
    return { success: true };
  }

  function signOut() {
    clearSession();
    setUser(null);
    setCart({});
    setRoute("signin");
  }

  function addToCart(productId) {
    // Cart is keyed by product id, so adding an item already in the cart
    // only ever increments its quantity — duplicate line items can't happen.
    setCart((c) => ({ ...c, [productId]: (c[productId] || 0) + 1 }));
    const p = PRODUCTS.find((x) => x.id === productId);
    setToast(`${p.name} added to cart`);
  }

  function updateQty(productId, delta) {
    setCart((c) => {
      const next = { ...c };
      const q = (next[productId] || 0) + delta;
      if (q <= 0) delete next[productId];
      else next[productId] = q;
      return next;
    });
  }

  function removeFromCart(productId) {
    setCart((c) => {
      const next = { ...c };
      delete next[productId];
      return next;
    });
  }

  function openProductModal(product) {
    setSelectedProduct(product);
  }

  function closeProductModal() {
    setSelectedProduct(null);
  }

  // Navigate to the Shop page, optionally pre-filtered to a category.
  // Used by category cards ("Electronics" -> filtered) as well as generic
  // "Shop"/"View All"/"See all" links (no category -> "all").
  function goToShop(category = "all") {
    setShopCategory(category);
    setRoute("shop");
  }

  const cartItems = Object.entries(cart).map(([id, qty]) => ({
    product: PRODUCTS.find((p) => p.id === Number(id)),
    qty,
  }));
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const cartValue = cartItems.reduce((sum, i) => sum + i.qty * i.product.price, 0);

  const value = {
    user,
    route,
    setRoute,
    shopCategory,
    goToShop,
    signIn,
    signUp,
    signOut,
    authReady,
    cart,
    cartItems,
    cartCount,
    cartValue,
    addToCart,
    updateQty,
    removeFromCart,
    cartOpen,
    setCartOpen,
    toast,
    selectedProduct,
    openProductModal,
    closeProductModal,
  };

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}
