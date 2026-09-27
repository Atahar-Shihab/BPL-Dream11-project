<div align="center">

# 🏏 Dream 11 Cricket

### Pick your players. Manage your budget. Build your dream team.

A responsive cricket team builder made with React. Browse player cards, spend your coins wisely, and manage a squad of up to six players.

</div>

---

## ✨ What you can do

- Browse player details, including country, role, rating, batting style, bowling style, and price.
- Start with **50,000 coins** and see your balance update as you build your team.
- Add up to **six unique players** while staying within budget.
- Review your selections, remove a player to get their price refunded, or clear the whole team.
- Use the layout on desktop, tablet, or mobile.

## 🧰 Built with

| Tool | Purpose |
| --- | --- |
| [React](https://react.dev/) | Interface and application state |
| [Vite](https://vite.dev/) | Development server and production builds |
| [Tailwind CSS](https://tailwindcss.com/) + [daisyUI](https://daisyui.com/) | Utility styling and UI components |
| [React Icons](https://react-icons.github.io/react-icons/) | Interface icons |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | Selection feedback |

## 🚀 Get started

You’ll need Node.js and npm installed.

```bash
# Install dependencies
npm install

# Start the local development server
npm run dev
```

Open the local URL printed in your terminal to use the app.

## 📜 Available commands

```bash
npm run dev      # Start the development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Check the project with ESLint
```

## 🗂️ Project structure

```text
src/
├── components/
│   ├── AvailablePlayers/  # Player cards and choose actions
│   ├── Navbar/            # Brand and live coin balance
│   ├── banner/            # Intro banner and player-list link
│   └── players/           # Available and selected player views
├── App.jsx                # Player data, team, and budget state
├── App.css                # Application layout and responsive styles
└── main.jsx               # React entry point

public/
└── data.json              # Player catalogue

assets/                    # Local logos, currency, and banner artwork
```

## 🧠 How team selection works

The player catalogue is loaded from `public/data.json`. Each player record includes an `id`, name, country, type, rating, batting and bowling styles, price, and image URL.

The app keeps the selected team and coin balance together in `src/App.jsx`. Choosing a player checks that they are not already selected, the team has fewer than six players, and the balance covers their price. Removing a player refunds their price; clearing the team refunds the total cost of all selected players.

To change the catalogue, edit `public/data.json` and keep each player’s `id` unique. Player photos currently use remote Wikimedia Commons file URLs; the card falls back to a local image if a photo cannot load.

---

<div align="center">

Made for cricket fans who love building the perfect team. 🏆

</div>
