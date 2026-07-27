import { AppProvider, useApp } from "./context/AppContext";
import Header from "./components/layout/Header";
import CartDrawer from "./components/layout/CartDrawer";
import Toast from "./components/common/Toast";
import SignInSplit from "./components/auth/SignInSplit";
import SignUpCentered from "./components/auth/SignUpCentered";
import HomePage from "./components/home/HomePage";
import ShopPage from "./components/shop/ShopPage";
import AboutPage from "./components/about/AboutPage";
import ProductModal from "./components/shop/ProductModal";

function Shell() {
  const { route, user, authReady } = useApp();

  if (!authReady) return null;

  if (!user) {
    return route === "signup" ? <SignUpCentered /> : <SignInSplit />;
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      {route === "home" && <HomePage />}
      {route === "shop" && <ShopPage />}
      {route === "about" && <AboutPage />}
      <CartDrawer />
      <ProductModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
