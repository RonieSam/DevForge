"use client";

import {
  ArrowRight,
  MessageSquare,
  Shield,
  FolderKanban,
  Activity,
  Users,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

const features = [
  {
    title: "Role-based access",
    desc: "Owner, Admin, and Member permissions enforced securely across every workspace.",
    icon: Shield,
  },
  {
    title: "Real-time collaboration",
    desc: "Instant messaging and live updates powered through WebSockets.",
    icon: MessageSquare,
  },
  {
    title: "Project management",
    desc: "Track tasks, priorities, and deadlines in a clean engineering workflow.",
    icon: FolderKanban,
  },
  {
    title: "Team organizations",
    desc: "Create organizations, invite members, and manage multiple projects easily.",
    icon: Users,
  },
  {
    title: "Activity logs",
    desc: "Track every action and change made inside your workspace.",
    icon: Activity,
  },
  {
    title: "GitHub linked",
    desc: "Attach repositories directly to projects for faster collaboration.",
    icon: FaGithub,
  },
];

const steps = [
  {
    number: "01",
    title: "Create your organization",
    desc: "Sign up, create an organization, and invite your team members.",
  },
  {
    number: "02",
    title: "Set up projects",
    desc: "Create projects, connect repositories, and assign responsibilities.",
  },
  {
    number: "03",
    title: "Collaborate in real time",
    desc: "Chat, track progress, and manage tasks together from one workspace.",
  },
];

export default function LandingPage() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className="h-screen overflow-y-auto overflow-x-hidden bg-white text-neutral-900">
      {/* NAVBAR */}
     

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 pt-20 text-center">
          <div className="mb-6 rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
            Live on Render + Vercel
          </div>

          <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Where dev teams{" "}
            <span className="text-blue-600">ship together</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-600">
            Manage projects, assign tasks, track progress, and collaborate in
            real time — all in one workspace built for engineers.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection("features")}
              className="rounded-2xl bg-blue-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              Start for free
            </button>

            <button className="flex items-center gap-2 rounded-2xl border border-neutral-300 px-7 py-4 text-sm font-semibold transition hover:bg-neutral-100">
              <FaGithub size={18} />
              View on GitHub
            </button>
          </div>

          {/* MOCKUP */}
          <div className="mt-20 w-full max-w-6xl rounded-3xl border border-neutral-200 bg-white p-5 shadow-2xl shadow-neutral-200">
            <div className="mb-5 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
            </div>

            <div className="grid gap-5 lg:grid-cols-[260px_1fr_350px]">
              {/* Sidebar */}
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Projects
                </p>

                <div className="space-y-2">
                  <div className="rounded-xl bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700">
                    AURA Nexus
                  </div>

                  <div className="rounded-xl px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100">
                    ROV Dashboard
                  </div>

                  <div className="rounded-xl px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100">
                    Telemetry v2
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="rounded-2xl border border-neutral-200 p-5">
                <h3 className="mb-5 text-left text-lg font-semibold">
                  Project Tasks
                </h3>

                <div className="space-y-4">
                  {[
                    ["Video pipeline", "Done"],
                    ["CNN integration", "In Progress"],
                    ["REST telemetry", "Todo"],
                    ["Control UI", "High Priority"],
                  ].map((task, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl border border-neutral-200 px-4 py-3"
                    >
                      <span className="text-sm font-medium">{task[0]}</span>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {task[1]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat */}
              <div className="rounded-2xl border border-neutral-200 p-5">
                <h3 className="mb-5 text-left text-lg font-semibold">
                  Team Discussion
                </h3>

                <div className="space-y-3">
                  {[
                    "Pushing control UI branch today",
                    "Telemetry accuracy improved",
                    "PR ready for review",
                  ].map((msg, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-neutral-100 px-4 py-3 text-left text-sm text-neutral-700"
                    >
                      {msg}
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex gap-3">
                  <input
                    placeholder="Type a message..."
                    className="flex-1 rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />

                  <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-16 grid w-full max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
            {[
              ["4", "roles & permissions"],
              ["Real-time", "WebSocket chat"],
              ["Live", "Supabase · Render · Vercel"],
              ["JWT", "stateless auth"],
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6"
              >
                <h3 className="text-3xl font-bold">{item[0]}</h3>
                <p className="mt-2 text-sm text-neutral-600">{item[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="border-t border-neutral-200 bg-neutral-50 py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Built for engineers
            </p>

            <h2 className="text-4xl font-bold tracking-tight">
              Everything a dev team needs
            </h2>

            <p className="mt-5 text-lg text-neutral-600">
              From task tracking to real-time communication, DevForge keeps
              engineering teams aligned without unnecessary complexity.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon;

              return (
                <div
                  key={i}
                  className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Icon size={26} />
                  </div>

                  <h3 className="text-xl font-semibold">{feature.title}</h3>

                  <p className="mt-4 leading-7 text-neutral-600">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
              How it works
            </p>

            <h2 className="text-4xl font-bold tracking-tight">
              Up and running in minutes
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={i}
                className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8"
              >
                <span className="text-sm font-bold text-blue-600">
                  {step.number}
                </span>

                <h3 className="mt-5 text-2xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-neutral-600">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-200 py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-5xl font-bold tracking-tight">
            Ready to build with your team?
          </h2>

          <p className="mt-6 text-lg text-neutral-600">
            Free to use. No credit card required. Deployed and live.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection("features")}
              className="rounded-2xl bg-blue-600 px-7 py-4 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Start for free
            </button>

            <button className="rounded-2xl border border-neutral-300 px-7 py-4 text-sm font-semibold hover:bg-neutral-100">
              View demo
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="footer"
        className="border-t border-neutral-200 bg-neutral-50"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-8 text-sm text-neutral-500 md:flex-row">
          <p>DevForge · Built by Ronie Samuel</p>

          <div className="flex gap-6">
            <a href="#">GitHub</a>
            <a href="#">Sign In</a>
            <a href="#">Sign Up</a>
          </div>
        </div>
      </footer>
    </main>
  );
}