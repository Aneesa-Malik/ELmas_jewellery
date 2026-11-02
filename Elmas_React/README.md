# ELMAS Jewellery — React E-Commerce Website

A luxury jewellery store built with **React.js (Vite)**, **React Router** and **Bootstrap 5**.
Converted from the original PHP/MySQL version.

## Features
- Home, Collections (category filter + live search), Jewellery gallery (product popup + add to bag)
- Price Estimator (quantity × price, add to bag)
- Shopping bag (add / remove / grand total), Checkout with order confirmation
- Register / Login with form validation, Logout, Contact form
- Admin page to add a product: `/admin/add-product`
- Responsive layout, animated background, live clock in footer

## Run locally
```bash
npm install
npm run dev        # open the link shown in the terminal
```

## Build
```bash
npm run build
npm run preview
```

## Upload to GitHub
```bash
git init
git add .
git commit -m "ELMAS Jewellery React e-commerce project"
git branch -M main
git remote add origin https://github.com/<your-username>/elmas-jewellery.git
git push -u origin main
```

## Deploy on Vercel (free)
1. Go to vercel.com and sign in with GitHub.
2. Click **Add New → Project** and import the `elmas-jewellery` repository.
3. Vercel auto-detects **Vite**. Leave the defaults (Build: `npm run build`, Output: `dist`) and click **Deploy**.
4. `vercel.json` is already included so page refreshes on routes like `/cart` work.

## PHP → React mapping
| Original (PHP)                    | React version                              |
|-----------------------------------|--------------------------------------------|
| header.php / footer.php           | `components/Header.jsx`, `Footer.jsx`      |
| home.php                          | `pages/Home.jsx`                           |
| collections.php                   | `pages/Collections.jsx`                    |
| jewellery.php                     | `pages/Jewellery.jsx`                      |
| estimator.php                     | `pages/Estimator.jsx`                      |
| cart.php (`$_SESSION['cart']`)    | `pages/Cart.jsx` + `context/CartContext.jsx` |
| checkout.php (orders tables)      | `pages/Checkout.jsx` (saved in localStorage) |
| login.php / registor.php          | `pages/Login.jsx`, `pages/Register.jsx` + `context/AuthContext.jsx` |
| contact.php                       | `pages/Contact.jsx`                        |
| add_product.php, admin/           | `pages/AddProduct.jsx`                     |
| config.php (MySQL + sessions)     | `context/storage.js` (browser localStorage) |

There is no backend: users, cart and orders are stored in the browser's localStorage.

## Login note
Registration (same as the PHP version) gives every new account the default password **123456**.
Register first, then log in with that email and `123456`.
