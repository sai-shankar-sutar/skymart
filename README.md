# SkyMart

A demo e-commerce UI (auth, home, shop with search/filter/sort, cart drawer) built with React + Tailwind CSS + lucide-react. All state (auth, cart) is local — no backend.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  data/
    products.js          # product catalog, category metadata, derived lists (TOP_RATED, NEW_ARRIVALS)
  context/
    AppContext.jsx        # AppProvider + useApp() — auth state, cart state, routing state
  components/
    common/
      StarRating.jsx
      ProductThumb.jsx
      Toast.jsx
      Dropdown.jsx
    layout/
      Header.jsx
      CartDrawer.jsx
    auth/
      AuthShell.jsx
      SignInSplit.jsx
      SignUpCentered.jsx
    home/
      HomePage.jsx
      StatMini.jsx
      CategoryCard.jsx
      MiniProductRow.jsx
    shop/
      ShopPage.jsx
      ProductCard.jsx
    about/
      AboutPage.jsx
  App.jsx                  # top-level Shell + routing between pages
  main.jsx                 # ReactDOM entry point
  index.css                 # Tailwind directives + global keyframes/utilities
```

## Notes

- Routing is just a `route` string in context (`signin | signup | home | shop | about`), no react-router.
- **Accounts are real (within the limits of a front-end-only demo):** signing up stores `{ name, email, password }` in `localStorage` under `skymart_users`, and rejects duplicate emails. Signing in looks the email up and checks the password, and returns a specific error ("no account found" vs. "incorrect password") instead of silently creating a user.
- **Sessions persist across reloads:** the logged-in user's email is stored under `skymart_session`; on load, `AppContext` checks it and restores the session automatically. Signing out clears the session but keeps the account.
- This is plain-text `localStorage`, not real authentication — there's no server, no hashing. Fine for a demo/prototype, not for production.
- **Product cards are clickable:** clicking anywhere on a card/row (outside the Add button) opens `ProductModal` with a larger photo, full description, rating, and an "Add to Cart" action.
- **Images, not icons:** product cards, cart items, and category tiles all use real `<img>` photos from [LoremFlickr](https://loremflickr.com), matched by keyword — the URL is built from each product's name + category, so e.g. "Wireless Bluetooth Headphones" pulls a photo actually tagged `wireless,bluetooth,headphones,electronics`, not a random unrelated image. Swap `image` in `src/data/products.js` for real product photo URLs whenever you have a catalog.
- Cart quantities, totals, and the "added to cart" toast are all derived from `AppContext`. The cart is keyed by product id, so adding the same product twice increments its quantity rather than creating a duplicate line item.
