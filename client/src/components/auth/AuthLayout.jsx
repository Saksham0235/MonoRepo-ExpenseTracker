import React from "react";

const FEATURES = [
  { icon: "📊", text: "See where your money goes with clear charts" },
  { icon: "⚡", text: "Log an expense in a few seconds" },
  { icon: "🔒", text: "Your data stays private to your account" },
];

/**
 * Shared shell for the login and register pages.
 * - Mobile: compact brand bar on top, form card below.
 * - Desktop (lg+): brand panel on the left, form on the right.
 */
const AuthLayout = ({ title, subtitle, error, footer, children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f0f4f8] lg:flex-row">
      {/* Brand panel */}
      <aside className="relative overflow-hidden bg-gradient-to-br from-[#1a1f36] to-[#2d3561] px-6 py-5 text-white sm:px-10 lg:flex lg:w-[45%] lg:max-w-xl lg:flex-col lg:px-14 lg:py-12">
        {/* Decorative glow, desktop only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 hidden h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-20 hidden h-80 w-80 rounded-full bg-violet-500/20 blur-3xl lg:block"
        />

        <div className="relative flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-lg">
            💸
          </div>
          <div>
            <p className="text-base font-semibold tracking-wide">Expense Tracker</p>
            <p className="text-xs text-white/60 lg:hidden">Personal finance, simplified</p>
          </div>
        </div>

        <div className="relative mt-auto hidden lg:block">
          <h2 className="text-3xl font-semibold leading-tight xl:text-4xl">
            Take control of
            <br />
            your spending.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            Track daily expenses, spot patterns and stay on budget, all in one place.
          </p>

          <ul className="mt-8 space-y-4">
            {FEATURES.map((f) => (
              <li key={f.text} className="flex items-center gap-3 text-sm text-white/85">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-base">
                  {f.icon}
                </span>
                {f.text}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative mt-auto hidden pt-12 text-xs text-white/40 lg:block">
          © {new Date().getFullYear()} Expense Tracker
        </p>
      </aside>

      {/* Form area */}
      <main className="flex flex-1 items-start justify-center px-4 py-8 sm:px-6 sm:py-14 lg:items-center lg:py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.07),0_8px_24px_rgba(0,0,0,0.06)] sm:p-8">
            <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
            {subtitle && <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>}

            {error && (
              <div
                role="alert"
                className="mt-5 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700"
              >
                <span aria-hidden="true">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div className="mt-6">{children}</div>
          </div>

          {footer && <p className="mt-6 text-center text-sm text-slate-600">{footer}</p>}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
