import React from "react";
import { useState } from "react";

import axios from "axios";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Github,
  Linkedin,
  Mail,
  Menu,
  Sparkles,
  X,
  Code2,
  Database,
  Brain,
  Cloud,
  ExternalLink
} from "lucide-react";
import { profile, skills, projects, experience } from "./data/portfolio";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function Navbar() {
  const [mobile, setMobile] = useState(false);

  const links = [
    ["Home", "#home"],
    ["Skills", "#skills"],
    ["Projects", "#projects"],
    ["Experience", "#experience"],
    ["Education", "#education"],
    ["Contact", "#contact"]
  ];

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="shell pt-4">
        <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/90 bg-white/80 px-5 py-3 shadow-card backdrop-blur-xl">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#172238] text-white">
              <span className="text-sm">✦</span>
            </span>
            <span className="font-extrabold tracking-tight">CoreX</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {links.map(([label, href], i) => (
              <a
                key={label}
                href={href}
                className={`text-xs font-semibold transition hover:text-sky-600 ${
                  i === 0 ? "text-sky-600" : "text-slate-600"
                }`}
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full bg-[#172238] px-4 py-2 text-xs font-bold text-white hover:bg-sky-600"
            >
              Contact
            </a>
          </div>

          <button
            onClick={() => setMobile(!mobile)}
            className="rounded-full bg-slate-100 p-2 md:hidden"
          >
            {mobile ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        {mobile && (
          <div className="mx-auto mt-2 max-w-5xl rounded-3xl border border-white bg-white p-3 shadow-card md:hidden">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobile(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-sky-50"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
      <div className="absolute left-[-10%] top-20 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />
      <div className="absolute right-[-8%] top-28 h-96 w-96 rounded-full bg-cyan-100/40 blur-3xl" />

      <div className="shell">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/75 px-4 py-2 text-[11px] font-bold text-sky-700">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Available for freelance projects
            </div>

            <p className="eyebrow mb-4">Full Stack + AI Engineering</p>

            <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-[-.055em] text-[#172238] sm:text-6xl lg:text-7xl">
              {profile.headline.split(" ").slice(0, 3).join(" ")}{" "}
              <span className="text-sky-500">
                {profile.headline.split(" ").slice(3).join(" ")}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              {profile.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-[#172238] px-5 py-3 text-sm font-bold text-white shadow-lg hover:-translate-y-0.5 hover:bg-sky-600"
              >
                View projects <ArrowUpRight size={16} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-5 py-3 text-sm font-bold text-slate-700 hover:border-sky-400 hover:text-sky-600"
              >
                Get in touch
              </a>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3 text-[11px] font-bold text-slate-400">
              <span>React</span><span>•</span>
              <span>Node.js</span><span>•</span>
              <span>MongoDB</span><span>•</span>
              <span>Python</span><span>•</span><span>AI</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-6 rounded-[45px] bg-sky-100/70 blur-2xl" />
            <div className="relative rounded-[42px] border border-white bg-white/70 p-4 shadow-soft">
              <div className="overflow-hidden rounded-[34px] bg-gradient-to-br from-[#e4f5ff] via-white to-[#d7efff] p-6">
                <div className="flex justify-end">
                  <span className="rounded-full bg-white/80 px-3 py-1.5 text-[9px] font-extrabold text-sky-700 shadow-sm">
                    AI ENGINEER
                  </span>
                </div>

                <div className="mx-auto mt-7 h-64 w-64 overflow-hidden rounded-full border-8 border-white bg-slate-100 shadow-card">
                  <img
                    src="/profile.png"
                    alt="Gowtham A"
                    className="h-full w-full object-cover object-[50%_25%]"
                  />
                </div>

                <div className="pt-6 text-center">
                  <h2 className="text-2xl font-extrabold tracking-tight">{profile.name}</h2>
                  <p className="mt-1 text-xs font-medium text-slate-500">{profile.role}</p>
                </div>

                <div className="mt-5 flex justify-center gap-2">
                  <Social href={profile.github}><Github size={14} /></Social>
                  <Social href={profile.linkedin}><Linkedin size={14} /></Social>
                  <Social href={`mailto:${profile.email}`}><Mail size={14} /></Social>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a href="#skills" className="mx-auto mt-16 block w-fit text-[10px] font-bold uppercase tracking-[.3em] text-slate-400">
          Scroll ↓
        </a>
      </div>
    </section>
  );
}

function Social({ href, children }) {
  return (
    <a
      href={href}
      className="grid h-9 w-9 place-items-center rounded-full bg-[#172238] text-white hover:bg-sky-600"
    >
      {children}
    </a>
  );
}

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 text-4xl font-extrabold tracking-[-.035em] text-[#172238]">
          {title}
        </h2>
      </div>
      {description && (
        <p className="max-w-md text-sm leading-6 text-slate-500">{description}</p>
      )}
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-28">
      <div className="shell">
        <SectionTitle
          eyebrow="Capabilities"
          title="Skills"
          description="The tools I use to design, build and ship modern web and AI products."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, i) => (
            <div
              key={skill.title}
              className={`group rounded-[28px] border p-6 shadow-card transition hover:-translate-y-1 ${
                i === 0 ? "border-sky-200 bg-sky-50" : "border-white bg-white/80"
              }`}
            >
              <div className="mb-7 flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-xl shadow-sm">
                  {skill.icon}
                </span>
                <span className="text-[10px] font-extrabold text-slate-300">0{i + 1}</span>
              </div>
              <h3 className="text-lg font-extrabold text-[#172238]">{skill.title}</h3>
              <p className="mt-2 text-xs leading-6 text-slate-500">{skill.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectVisual({ project, index }) {
  const colors = {
    dark: "from-[#172238] via-[#2b3650] to-[#0f182a]",
    blue: "from-[#5aa9e8] via-[#347fc7] to-[#1a4b8c]",
    cyan: "from-[#d8f7ff] via-[#b8edff] to-[#8cd3ef]",
    sky: "from-[#dcefff] via-[#9cccf2] to-[#4f94cf]",
    light: "from-white via-[#eef8ff] to-[#cdeaff]"
  };

  return (
    <div className={`relative h-52 overflow-hidden rounded-[23px] bg-gradient-to-br ${colors[project.style]}`}>
      <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1.5 text-[9px] font-extrabold text-slate-700 backdrop-blur">
        {project.category}
      </span>

      <div className="absolute inset-x-8 bottom-6">
        <div className="mx-auto max-w-[245px] rounded-2xl border border-white/40 bg-white/20 p-3 shadow-2xl backdrop-blur">
          {index % 2 === 0 ? (
            <div>
              <div className="mb-2 h-2.5 w-1/3 rounded-full bg-white/70" />
              <div className="grid grid-cols-3 gap-2">
                <div className="h-16 rounded-xl bg-white/35" />
                <div className="col-span-2 h-16 rounded-xl bg-white/25" />
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="h-20 w-12 rounded-xl bg-white/70" />
              <div className="flex-1 space-y-2">
                <div className="h-2.5 w-2/3 rounded-full bg-white/70" />
                <div className="h-2.5 w-1/2 rounded-full bg-white/40" />
                <div className="h-8 rounded-xl bg-white/30" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-28">
      <div className="shell">
        <SectionTitle
          eyebrow="Selected work"
          title="Projects Showcase"
          description="Full-stack and AI projects presented in the same floating-card visual language as the reference."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <article
              key={project.title}
              className="group rounded-[30px] border border-white bg-white/80 p-3 shadow-card transition hover:-translate-y-1.5"
            >
              <ProjectVisual project={project} index={i} />
              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-extrabold tracking-tight">{project.title}</h3>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 group-hover:bg-sky-100">
                    <ArrowUpRight size={15} />
                  </span>
                </div>
                <p className="mt-2 text-xs leading-6 text-slate-500">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <span key={tag} className="rounded-full bg-sky-50 px-2.5 py-1 text-[9px] font-bold text-sky-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-28">
      <div className="shell">
        <SectionTitle
          eyebrow="Career journey"
          title="Internship & Experience"
          description="A clean timeline section replacing the reference image's research area with your professional experience."
        />

        <div className="panel overflow-hidden p-6 sm:p-10">
          <div className="relative">
            <div className="absolute bottom-3 left-[11px] top-3 w-px bg-sky-100 sm:left-[15px]" />

            <div className="space-y-8">
              {experience.map((item, index) => (
                <article key={`${item.company}-${item.title}`} className="relative pl-10 sm:pl-14">
                  <span className="absolute left-0 top-1 grid h-7 w-7 place-items-center rounded-full border-4 border-white bg-sky-500 text-white shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>

                  <div className="grid gap-5 lg:grid-cols-[170px_1fr]">
                    <div>
                      <p className="text-xs font-extrabold text-sky-600">{item.period}</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {item.type}
                      </p>
                    </div>

                    <div className="rounded-[24px] border border-sky-100 bg-white/80 p-5 shadow-sm">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                        <div>
                          <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-slate-400">
                            {item.company}
                          </p>
                          <h3 className="mt-1 text-lg font-extrabold text-[#172238]">
                            {item.title}
                          </h3>
                        </div>
                        {index === 0 && (
                          <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-[9px] font-extrabold text-emerald-600">
                            Current
                          </span>
                        )}
                      </div>

                      <p className="mt-3 max-w-3xl text-xs leading-6 text-slate-500">
                        {item.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.skills.map(skill => (
                          <span key={skill} className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-600">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const cards = [
    [Code2, "Frontend", "React + Tailwind"],
    [Database, "Backend", "Node + MongoDB"],
    [Brain, "AI", "RAG + LLM"],
    [Cloud, "Cloud", "AWS fundamentals"]
  ];

  return (
    <section className="py-24 sm:py-28">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-[34px] border border-white bg-white p-3 shadow-soft">
            <div className="flex h-[370px] items-end justify-center rounded-[27px] bg-gradient-to-br from-sky-100 to-white">
              <div className="mb-10 h-60 w-60 overflow-hidden rounded-full border-8 border-white bg-slate-100 shadow-card">
                <img
                  src="/profile.png"
                  alt="Gowtham A"
                  className="h-full w-full object-cover object-[50%_25%]"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="eyebrow">About me</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Full-stack thinking with an <span className="text-sky-500">AI-first</span> mindset.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
              I enjoy solving real problems by combining strong web development fundamentals
              with practical AI engineering. My focus is on building useful products that
              are clean, maintainable and easy to use.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {cards.map(([Icon, title, text]) => (
                <div key={title} className="rounded-2xl border border-sky-100 bg-sky-50/60 p-4">
                  <Icon size={18} className="text-sky-600" />
                  <h3 className="mt-4 text-sm font-extrabold">{title}</h3>
                  <p className="mt-1 text-[10px] font-medium text-slate-500">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function Education() {
  return (
    <section id="education" className="py-20">
      <div className="shell">
        <div className="panel p-7 sm:p-10">
          <div className="grid gap-6 md:grid-cols-[.4fr_1.6fr] md:items-center">
            <div>
              <p className="eyebrow">Education</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight">Academic Foundation</h2>
            </div>
            <div className="rounded-[24px] border border-sky-100 bg-sky-50/60 p-6">
              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-sky-600">
                2020
              </p>
              <h3 className="mt-2 text-lg font-extrabold text-[#172238]">
                Bachelor of Engineering (Electronics & Communication Engineering)
              </h3>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                Muthayammal College of Engineering
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await axios.post(`${API}/contact`, form);
      setForm({ name: "", email: "", message: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-28">
      <div className="shell">
        <div className="overflow-hidden rounded-[34px] border border-white bg-white shadow-soft">
          <div className="grid lg:grid-cols-[.78fr_1.22fr]">
            <div className="relative overflow-hidden bg-[#172238] p-8 text-white sm:p-10">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-sky-400/20 blur-3xl" />
              <Sparkles className="relative text-sky-300" size={24} />
              <p className="relative mt-9 text-[10px] font-extrabold uppercase tracking-[.25em] text-sky-300">
                Contact
              </p>
              <h2 className="relative mt-2 text-4xl font-extrabold tracking-tight">
                Get in <span className="text-sky-300">Touch</span>
              </h2>
              <p className="relative mt-5 max-w-sm text-sm leading-7 text-slate-300">
                Have a website, SaaS product or AI idea? Send a message and let's discuss it.
              </p>

              <div className="relative mt-9 space-y-4">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-xs font-bold hover:text-sky-300">
                  <Mail size={16} /> {profile.email}
                </a>
                <div className="flex items-center gap-3 text-xs font-bold">
                  <CheckCircle2 size={16} className="text-emerald-300" />
                  Available for freelance work
                </div>
              </div>
            </div>

            <form onSubmit={submit} className="p-8 sm:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="Name" placeholder="Your name" value={form.name} onChange={v => setForm({...form, name: v})} />
                <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={v => setForm({...form, email: v})} />
              </div>

              <label className="mt-5 block">
                <span className="text-[10px] font-extrabold uppercase tracking-[.16em] text-slate-500">
                  Message
                </span>
                <textarea
                  required
                  rows="7"
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  placeholder="Tell me about your project..."
                  className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none focus:border-sky-400 focus:bg-white"
                />
              </label>

              {status === "success" && (
                <p className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-600">
                  <CheckCircle2 size={15} /> Message sent successfully.
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 text-xs font-bold text-red-500">
                  Could not send message. Please start the Node.js backend.
                </p>
              )}

              <button
                disabled={status === "loading"}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#172238] px-6 py-3 text-sm font-bold text-white hover:bg-sky-600 disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Input({ label, ...props }) {
  return (
    <label>
      <span className="text-[10px] font-extrabold uppercase tracking-[.16em] text-slate-500">
        {label}
      </span>
      <input
        required
        {...props}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm outline-none focus:border-sky-400 focus:bg-white"
      />
    </label>
  );
}

function Footer() {
  return (
    <footer className="bg-[#172238] text-white">
      <div className="shell py-10">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-[#172238]">✦</span>
              <span className="font-extrabold">CoreX</span>
            </a>
            <p className="mt-3 max-w-sm text-xs leading-6 text-slate-400">
              Full Stack Developer & AI Engineer building modern digital experiences.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-xs font-semibold text-slate-300">
            <a href="#home" className="hover:text-sky-300">Home</a>
            <a href="#skills" className="hover:text-sky-300">Skills</a>
            <a href="#projects" className="hover:text-sky-300">Projects</a>
            <a href="#experience" className="hover:text-sky-300">Experience</a>
            <a href="#education" className="hover:text-sky-300">Education</a>
            <a href="#contact" className="hover:text-sky-300">Contact</a>
          </div>

          <div className="flex gap-2">
            <Social href={profile.github}><Github size={14} /></Social>
            <Social href={profile.linkedin}><Linkedin size={14} /></Social>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-[10px] text-slate-500">
          © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind CSS, Node.js & MongoDB.
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <About />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
