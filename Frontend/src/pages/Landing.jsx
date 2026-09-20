import { Link } from "react-router-dom";
import {
  Heart,
  Images,
  BookOpen,
  Mail,
  ShieldCheck,
  CloudUpload,
  MessageCircle,
  Monitor,
  Server,
  Database,
} from "lucide-react";

const highlights = [
  { value: "MERN", label: "Full-stack architecture" },
  { value: "Live", label: "WebSocket chat" },
  { value: "R2", label: "Cloud file storage" },
  { value: "8", label: "Jest test suites" },
];

const techStack = [
  {
    icon: Monitor,
    title: "Frontend",
    items: [
      "React 19",
      "Vite",
      "Tailwind CSS v4",
      "React Router v7",
      "Context API",
      "Axios",
      "Socket.IO Client",
      "Lucide Icons",
    ],
  },
  {
    icon: Server,
    title: "Backend",
    items: [
      "Node.js",
      "Express 5",
      "MongoDB",
      "Mongoose",
      "JWT",
      "bcrypt",
      "Multer",
      "Socket.IO",
      "Nodemailer",
      "express-rate-limit",
    ],
  },
  {
    icon: Database,
    title: "Cloud & testing",
    items: [
      "Cloudflare R2",
      "AWS S3 SDK",
      "multer-s3",
      "Jest",
      "Supertest",
      "mongodb-memory-server",
    ],
  },
];

const product = [
  {
    icon: Images,
    title: "Memories",
    description:
      "Moments with photos, places, and dates, shown as a polaroid-style album.",
  },
  {
    icon: BookOpen,
    title: "Journals",
    description: "Private entries that show who wrote each one.",
  },
  {
    icon: Mail,
    title: "Letters",
    description:
      "Sent and received tabs, read/unread tracking, and letters that can't be edited once sent.",
  },
  {
    icon: MessageCircle,
    title: "Live chat",
    description:
      "Real-time messaging between partners with an unread badge in the sidebar.",
  },
  {
    icon: Heart,
    title: "Built for two",
    description:
      "Partners connect with a unique code, and only they can see what they share.",
  },
  {
    icon: ShieldCheck,
    title: "Archive, never delete",
    description:
      "Ending a relationship archives everything instead of destroying it.",
  },
];

const frontendFeatures = [
  "Protected and guest-only routes that follow the login session",
  "Global state with Context: auth, socket connection, relationship modal",
  "Custom hooks and useReducer-based forms for memories, journals, and letters",
  "Search, sort, and read/unread filtering on list pages",
  "Photo gallery with lightbox, standalone uploads, and a link back to each memory",
  "Dashboard with days-together counter and cover and couple photos",
  "Live chat page that listens on a shared socket and tracks unread messages",
  "Responsive layout with a mobile drawer and reusable components",
  "Design system built on Tailwind v4 theme tokens",
];

const backendFeatures = [
  "Layered REST API: routes, controllers, repositories, and Mongoose models",
  "JWT sessions in HttpOnly cookies, with bcrypt password hashing",
  "Password reset by emailed link, with rate limits on login and forgot-password",
  "Relationship linking by unique code, with ended relationships archived",
  "Authorization middleware scoped to the relationship and the resource owner",
  "Photos stored as separate documents, uploaded to Cloudflare R2 and removed from it on delete",
  "Letters that are immutable once sent, with read tracking when opened",
  "Socket.IO with cookie-authenticated handshake, per-relationship rooms, and saved messages",
  "Centralized error handling, request validation, and upload file filters and limits",
  "Integration tests with Jest and Supertest against an in-memory MongoDB",
];

const architecture = [
  "React + Vite",
  "Axios / Socket.IO",
  "Express API",
  "Controllers + repositories",
  "MongoDB + Cloudflare R2",
];

const concepts = [
  "REST API design",
  "Authentication vs authorization",
  "HttpOnly cookies",
  "WebSocket rooms",
  "Object storage",
  "Rate limiting",
  "Compound indexes",
  "Mongoose populate",
  "Integration testing",
  "React Context",
  "Client-side search and sorting",
  "Responsive design",
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-atlas">
      <header className="flex items-center justify-between border-b border-border px-6 py-5 sm:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-ink shadow-sm">
            <Heart size={19} fill="currentColor" />
          </div>
          <span className="font-display text-xl font-medium tracking-tight text-heading">
            Memory Atlas
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-body transition hover:text-primary"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-ink transition hover:bg-primary-hover"
          >
            Sign up
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
        <section className="text-center">
          <p className="eyebrow">Final project showcase</p>
          <h1 className="mt-4 font-display text-5xl font-medium tracking-tight text-heading sm:text-7xl">
            Memory Atlas
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-display text-lg italic leading-8 text-body sm:text-xl">
            A private, real-time journaling app for couples, built end to end
            with the MERN stack.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to="/signup"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-ink transition hover:bg-primary-hover"
            >
              Try the app
            </Link>
            <Link
              to="/login"
              className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-body transition hover:bg-white/5"
            >
              I have an account
            </Link>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {highlights.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-xl border border-border bg-surface/60 px-4 py-5"
              >
                <p className="font-display text-3xl font-medium text-accent">
                  {value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <p className="eyebrow">Tech stack</p>
          <h2 className="mt-2 font-display text-3xl font-medium text-heading sm:text-4xl">
            What it's built with
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {techStack.map(({ icon: Icon, title, items }) => (
              <div
                key={title}
                className="panel rounded-2xl border border-t-2 border-border border-t-accent/60 p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-xl font-medium text-heading">
                    {title}
                  </h3>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-raised px-3 py-1 text-xs font-medium text-body"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <p className="eyebrow">Architecture</p>
          <h2 className="mt-2 font-display text-3xl font-medium text-heading sm:text-4xl">
            How the pieces connect
          </h2>

          <div className="mt-8 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
            {architecture.map((step, index) => (
              <div
                key={step}
                className="flex flex-1 items-center gap-3 lg:flex-col lg:text-center"
              >
                <div className="flex-1 rounded-xl border border-border bg-surface px-4 py-4 text-center text-sm font-medium text-heading lg:w-full">
                  {step}
                </div>
                {index < architecture.length - 1 && (
                  <span className="text-primary lg:hidden">↓</span>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <p className="eyebrow">Features developed</p>
          <h2 className="mt-2 font-display text-3xl font-medium text-heading sm:text-4xl">
            Frontend and backend
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="panel rounded-2xl border border-t-2 border-border border-t-primary/60 p-6">
              <h3 className="font-display text-xl font-medium text-heading">
                Frontend
              </h3>
              <ul className="mt-4 space-y-3">
                {frontendFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-sm leading-6 text-body"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel rounded-2xl border border-t-2 border-border border-t-accent/60 p-6">
              <h3 className="font-display text-xl font-medium text-heading">
                Backend
              </h3>
              <ul className="mt-4 space-y-3">
                {backendFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-sm leading-6 text-body"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <p className="eyebrow">The product</p>
          <h2 className="mt-2 font-display text-3xl font-medium text-heading sm:text-4xl">
            What users get
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-display text-lg font-medium text-heading">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <p className="eyebrow">What I practiced</p>
          <h2 className="mt-2 font-display text-3xl font-medium text-heading sm:text-4xl">
            Concepts behind the build
          </h2>

          <div className="mt-8 flex flex-wrap gap-3">
            {concepts.map((concept) => (
              <span
                key={concept}
                className="rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-sm text-body"
              >
                {concept}
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer className="flex items-center justify-center gap-2 border-t border-border px-6 py-8 text-center text-sm text-muted sm:px-10">
        <CloudUpload size={16} className="text-accent" />
        <span>Memory Atlas, a final project showcase.</span>
      </footer>
    </div>
  );
};

export default Landing;
