# ♠️ Poker Tournament Manager & Timer

A web application designed to manage live poker tournaments by handling blind levels, timing, and essential tournament statistics in a clear and reliable way.

This project was built as a **portfolio application**, focusing on real-world logic, state management, persistence, and user safety.

---


## 🌐 Live Demo

The application is deployed using **GitHub Pages** and can be accessed here:

👉 **https://mszymanski1997.github.io/poker-tournament-manager/**

---

## 🃏 What is a Poker Timer?

In poker tournaments, the game is divided into **blind levels**.  
Blinds are forced bets that increase over time to ensure the tournament progresses and eventually ends.

A **poker timer**:

- counts down the time remaining in the current blind level
- automatically switches to the next level
- informs players when a level is about to change
- helps organizers control the tournament flow

Even for people unfamiliar with poker, you can think of it as:

> a countdown system that changes game difficulty at fixed intervals.

---

## ⚙️ How This Application Works

- The tournament is divided into **levels**, each with defined small and big blinds.
- A timer runs for the current level.
- When one minute remains:
  - the timer starts pulsing
  - the color changes to red (warning state)
  - a warning sound is played
- When the level ends:
  - blinds are automatically updated
  - a sound is played
  - the next level starts
- When the last level is completed:
  - the timer disappears
  - a **"Tournament Finished"** message is shown

The tournament can be reset or restored at any time, with confirmation modals to prevent accidental data loss.

---

## 🧰 Technologies Used

- **React**
- **TypeScript**
- **SCSS**
- **React Context API** (two separate contexts for state management)
- **Custom React Hooks**
- **LocalStorage** for persistent data

Planned:

- **Node.js**
- **Express**
- **MongoDB**

---

## ✨ Key Features

### ⏱️ Tournament & Timer

- Fully functional poker tournament timer
- Automatic blind level progression
- Visual and sound alerts:
  - 1-minute warning
  - blind level change
- Manual timer controls:
  - start / pause
  - fast forward
  - rewind
- Tournament end state handling

### 🧱 Blind Structure Management

- Default blind structure provided
- Custom blind structure editable via form
- Validation prevents invalid states:
  - at least one blind level is always required
  - invalid values cannot be submitted
- Dynamic modification of future blind levels during runtime

### 💾 Persistence & Safety

- Tournament data saved to **localStorage**
- After page refresh:
  - current time
  - current blind level
  - blind structure
    are restored automatically
- Previous tournament structure can be reloaded even days later
- Reset and load actions require confirmation in a modal

### 📊 Statistics

- Average stack calculation
- Total chip count
- Players-in tracking
- Time remaining to the next scheduled break
- Payout-related calculations

---

## 🧠 State Management

- Application state is split into **two React Contexts**
- Reusable logic extracted into **custom hooks**
- LocalStorage synchronization handled safely to avoid data loss

---

## 🚀 Future Plans

- Backend integration using **Node.js, Express, and MongoDB**
  - user authentication
  - saving multiple blind structures per user
  - loading saved structures across devices
- Table balancing system:
  - automatic rebalancing when players join or leave
- Timer enhancements:
  - currency selection
  - add-ons support
- Further UI/UX improvements

---

## 📌 Project Status

The application is **fully functional** and actively maintained.  
New features and improvements are planned and will be added incrementally.

---

## 👤 Author

Created as a portfolio project to demonstrate:

- complex state management
- persistence
- real-world business logic
- scalable frontend architecture
