// import { useState, useEffect } from "react";
// import { getUser } from "../services/user";
import { useAuth } from "../context/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  // const [user, setUser] = useState("");
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const response = await getUser();
  //     setUser(response.data.username);
  //   };
  //   fetchUser();
  // }, []);

  return (
    <>
      <main>
        <section className="mb-8">
          {/* Welcome */}
          <div className=" flex items-center gap-4">
            {/* Couple avatar */}
            <img
              src={null}
              alt="Upender and Mithuna"
              className="h-14 w-14 rounded-full border-2 border-white shadow-sm "
            />
            <div>
              <h1 className="text-3xl font-semibold  text-heading">
                Good morning, {user?.username}
              </h1>
              <p className="mt-2 text-base text-body">
                Welcome back to your little corner of memories
              </p>
              <p className="mt-1 text-sm text-muted">
                Date:{new Date().toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
        </section>
        <section className="mb-8">
          {/* Quick actions */}
          <h2 className="text-lg font-semibold text-heading">Quick Actions</h2>
          <p className="text-sm text-muted mt-1">Add something to your story</p>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-xl border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-sm cursor-pointer">
              <span className="text-2xl">❤️</span>
              <p className="mt-3 font-medium text-heading">Add Memory</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-sm cursor-pointer">
              <span className="text-2xl">✍️</span>
              <p className="mt-3 font-medium text-heading">Write Journal</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-sm cursor-pointer">
              <span className="text-2xl">💌</span>
              <p className="mt-3 font-medium text-heading">Write Love Letter</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-sm cursor-pointer">
              <span className="text-2xl">📸</span>
              <p className="mt-3 font-medium text-heading">Add Photo</p>
            </div>
          </div>
        </section>
        <section className="mb-10">
          {/* Recent memories */}{" "}
          <h2 className="text-lg font-semibold text-heading">
            Recent Memories
          </h2>
          <p className="mt-1 text-sm text-muted">
            Everything we've shared along the way
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <article className="overflow-hidden rounded-xl border boredr-borer bg-surface">
              <img
                src={null}
                alt="Our first trip"
                className="h-48 w-full object-cover"
              />
              <h3 className="font-medium text-heading">Our First Trip</h3>
              <p className="mt-1 text-sm text-muted">August 10, 2026</p>
            </article>
            <article className="overflow-hidden rounded-xl border boredr-borer bg-surface">
              <img
                src={null}
                alt="Dinner together"
                className="h-48 w-full object-cover"
              />
              <h3 className="font-medium text-heading">Dinner together</h3>
              <p className="mt-1 text-sm text-muted">August 7, 2026</p>
            </article>
            <article className="overflow-hidden rounded-xl border boredr-borer bg-surface">
              <img
                src={null}
                alt="Beach day"
                className="h-48 w-full object-cover"
              />
              <h3 className="font-medium text-heading">Beach day</h3>
              <p className="mt-1 text-sm text-muted">August 2, 2026</p>
            </article>
          </div>
        </section>
        <section className="mt-10">
          {/* Journey / stats */}
          <h2 className="text-heading text-lg font-semibold">Our Journey</h2>
          <p className="mt-1 text-sm text-muted">A moment worth remembering</p>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-xl border border-border bg-surface p-5">
              <span className="text-2xl">❤️</span>
              <p className="mt-3 text-2xl font-semibold text-heading">842</p>
              <p className="mt-1 text-sm text-muted">Days Together</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5">
              <span className="text-2xl">📸</span>
              <p className="mt-3 text-2xl font-semibold text-heading">126</p>
              <p className="mt-1 text-sm text-muted">Memories</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5">
              <span className="text-2xl">📍</span>
              <p className="mt-3 text-2xl font-semibold text-heading">18</p>
              <p className="mt-1 text-sm text-muted">Places</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5">
              <span className="text-2xl">✍️</span>
              <p className="mt-3 text-2xl font-semibold text-heading">34</p>
              <p className="mt-1 text-sm text-muted">Journal Entries</p>
            </div>
          </div>
        </section>
        <section className="mt-10">
          <h2 className="mt-10 text-lg font-semibold text-heading">
            Today in Your Story
          </h2>

          <article className="mt-4 rounded-xl border border-border bg-surface p-6">
            <p className="text-sm font-medium text-primary">
              2 years ago today ❤️
            </p>
            <h3 className="mt-2 text-xl font-semibold text-heading">
              Our First Date
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-body">
              You went to that little café and talked for three hours.
            </p>
            <button className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover">
              View Memory
            </button>
          </article>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
