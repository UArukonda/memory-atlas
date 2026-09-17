import { Link } from "react-router-dom";
import {
  Heart,
  Images,
  BookOpen,
  Mail,
  ShieldCheck,
  CloudUpload,
} from "lucide-react";

const features = [
  {
    icon: Images,
    title: "Memories",
    description:
      "Capture moments with photos, places, and dates - organized into a shared gallery you can look back on together.",
  },
  {
    icon: BookOpen,
    title: "Journals",
    description:
      "Write private journal entries, each one showing who wrote it, building a personal history of your relationship.",
  },
  {
    icon: Mail,
    title: "Letters",
    description:
      "Send letters to each other, split into Sent and Received - once sent, a letter stays exactly as it was written.",
  },
  {
    icon: Heart,
    title: "Built for two",
    description:
      "Connect with a unique relationship code. Only the two of you can ever see what you share.",
  },
  {
    icon: ShieldCheck,
    title: "Data that's respected",
    description:
      "Ending a relationship never deletes your memories - they're archived, never destroyed, so nothing you've shared is ever lost.",
  },
  {
    icon: CloudUpload,
    title: "Real cloud storage",
    description:
      "Photos are stored securely in the cloud, not just sitting on a server that could disappear.",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b border-border px-6 py-5 sm:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
            <Heart size={19} fill="currentColor" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-heading">
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
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
          >
            Sign up
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16 sm:px-10 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-heading sm:text-5xl">
            Your story, together.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-body sm:text-lg">
            A private space for two - preserve your memories, write to each
            other, and look back on everything you've shared.
          </p>
          <div className="mt-8 mb-2 flex items-center justify-center gap-4">
            <Link
              to="/signup"
              className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-primary-hover"
            >
              Get started
            </Link>
            <Link
              to="/login"
              className="rounded-xl border border-border px-6 py-3 text-sm font-medium text-body transition hover:bg-primary/5"
            >
              I have an account
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 font-semibold text-heading">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted sm:px-10">
        Memory Atlas - a private place for your story.
      </footer>
    </div>
  );
};

export default Landing;
