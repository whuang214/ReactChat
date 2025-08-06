# ReactChat

A modern, real-time chat app with GitHub sign-in, customizable profiles/themes, and group messaging: built with a clean, accessible UI.

**Live Demo:** [https://react-chat-gamma-seven.vercel.app/](https://react-chat-gamma-seven.vercel.app/)

## Why this project

- **What I built:** End-to-end messaging experience: auth, profiles, themes, 1:1 & group chats, real-time updates, responsive design.
- **My role:** Lead developer (majority of implementation) across frontend, backend, and integration.
- **Focus:** Simple, fast UX; clear data flow; production-minded auth/session handling.

## Features

- **GitHub OAuth** (via Passport) + **JWT** for stateless sessions
- **Profiles & Themes**: bio + color themes (10 options) for accessibility
- **Direct & Group Chats** with real-time messaging
- **Responsive UI** (mobile/desktop) with TailwindCSS
- **CORS/Env-based config** for smooth local + cloud deploys

## Tech Stack

- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Auth:** GitHub OAuth (Passport) + JWT
- **Dev tooling:** Nodemon
- **Hosting:** Heroku (demo at the link above)

## Screenshots

![GIF Demo](https://i.imgur.com/rxq0DS0.gif)

---

## Architecture Notes

- **Auth flow:** GitHub OAuth → issue JWT → store client-side; API verifies per request.
- **Data model:** MongoDB via Mongoose (users, conversations, messages).
- **Real-time:** Event-driven updates for messaging (web socket).
- **DX:** Vite HMR, clear `.env` separation, and CORS rules for local vs prod.

---

## Future Roadmap

- Typing indicators & read receipts
- Notifications (in-app + push)
- Online/Offline presence
- Group admin tools (edit name, members)
- Media uploads (images)

## Team

- **William Huang** — Lead developer (UI/UX, messaging, auth, data flow)
- **Brandon** — Profile + backend support
- **Ethan** — Settings + backend support
- **Ryan** — Settings + frontend
- **Lucca** — Profile + frontend
