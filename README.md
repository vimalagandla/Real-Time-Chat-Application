# PingSpace — Real-Time Chat Application

A responsive front-end chat application built with plain HTML, CSS, and JavaScript. It presents a polished messaging experience with an interactive conversation list, message composer, emoji picker, simulated live replies, keyboard shortcuts, dark mode, and a mobile-friendly drawer.

## Preview

Open `index.html` in any modern browser. No setup, build process, or package installation is needed.

## Features

- Responsive desktop and mobile chat layouts
- Conversation search and selection
- Message sending with automatically simulated live replies
- Typing indicator, delivery/read state, timestamps, and message bubbles
- Emoji picker and attachment interaction feedback
- Light/dark appearance toggle
- Keyboard shortcut: `Ctrl/Cmd + K` focuses conversation search

## Project structure

```text
Real-Time Chat Application/
├── index.html   # Page structure and interface elements
├── style.css    # Responsive styling and appearance modes
├── script.js    # Chat interactions and UI behaviour
└── README.md    # Project information
```

## Run locally

1. Download or clone the project.
2. Open `index.html` in a web browser.
3. Select a conversation or type a message and press **Send**.

## Notes

This is a front-end demo: messages and replies are created in the browser and are not sent to a server. To make it truly multi-user and persistent, connect the message events in `script.js` to a backend such as Node.js with Socket.IO, Firebase, or Supabase.
