# 🧠 React + Tailwind Project Dependencies

This document lists the main packages for your React + Tailwind project, their purpose, and installation commands.

| # | Package Name | Purpose / What It Does &&& When To Use | Installation Command |

| 1 | **@fortawesome/fontawesome-free** | When you need icons in your UI | `npm install @fortawesome/fontawesome-free` |

| 2 | **@hookform/resolvers** | When you’re using external validation with React Hook Form. | `npm install @hookform/resolvers` |

| 3 | **@tailwindcss/vite** | Always use with Tailwind CSS v4+ projects. | `npm install -D @tailwindcss/vite` |

| 4 | **axios** | Simplifies HTTP requests (GET, POST, etc.). | To communicate with APIs (fetch/send data). | `npm install axios` |

| 5 | **flowbite** | Pre-built Tailwind CSS UI components (buttons, modals, navbar, etc.). |`npm install flowbite` |

| 6 | **generate-react-cli** | CLI tool for auto-generating React component boilerplates. | To quickly create component/page files with structure. | `npm install -g generate-react-cli` |

| 7 | **react** | Core React library (used to build UI components). | Always required in every React project. | Installed automatically with Vite React template |

| 8 | **react-dom** | Renders React components to the browser DOM. | Always used alongside `react`. | Installed automatically with Vite React template |

| 9 | **react-hook-form** | Lightweight library for form handling and validation. | For managing form input, validation, and submission. | `npm install react-hook-form` |

| 10 | **react-router-dom** | Enables routing and navigation between pages. | When your app has multiple routes or pages. | `npm install react-router-dom` |

| 11 | **tailwindcss** |For styling your project using Tailwind classes. | `npm install tailwindcss @tailwindcss/vite` |

| 12 | **zod** | Type-safe schema validation library for JS/TS. | For validating user input or API data structures. | `npm install zod` |

| 12 | **React Query** |Server state management |it makes fetching, caching, synchronizing and updating server state in your web applications a breeze | `npm i @tanstack/react-query` | then i import QueryClient, QueryClientProvider | then const query = new QueryClient() | then i put my app in it

