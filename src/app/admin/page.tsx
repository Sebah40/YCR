"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Lock, LogOut, Check, Palette } from "lucide-react";
import type { ThemeId, ThemeConfig } from "@/lib/themes";

const THEME_ICONS: Record<string, string> = {
  Clover: "\u2618",
  Egg: "\ud83e\udd5a",
  Flower2: "\ud83c\udf38",
  Sun: "\u2600\ufe0f",
  Star: "\u2b50",
  Moon: "\ud83c\udf19",
  Leaf: "\ud83c\udf42",
  Snowflake: "\u2744\ufe0f",
  Sparkles: "\u2728",
  Heart: "\u2764\ufe0f",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [themes, setThemes] = useState<ThemeConfig[]>([]);
  const [activeTheme, setActiveTheme] = useState<ThemeId>("st-patricks");
  const [saving, setSaving] = useState(false);

  const { setThemeId } = useTheme();

  // Check session on mount
  useEffect(() => {
    Promise.all([
      fetch("/api/theme").then((r) => r.json()),
      import("@/lib/themes").then((m) => m.getAllThemes()),
    ]).then(([themeData, allThemes]) => {
      setActiveTheme(themeData.theme);
      setThemes(allThemes);
    });
  }, []);

  useEffect(() => {
    // Try to access a protected endpoint to check auth
    fetch("/api/theme", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ theme: "__check__" }) })
      .then((r) => {
        // 401 = not authed, 400 = authed but invalid theme (which means we ARE authed)
        setAuthed(r.status === 400);
        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        setError("Invalid credentials");
      } else {
        setAuthed(true);
      }
    } catch {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setUsername("");
    setPassword("");
  }

  async function handleSetTheme(id: ThemeId) {
    setSaving(true);
    try {
      const res = await fetch("/api/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: id }),
      });
      if (res.ok) {
        setActiveTheme(id);
        setThemeId(id);
      }
    } finally {
      setSaving(false);
    }
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-warm-500">Loading...</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-warm-100">
              <Lock className="h-6 w-6 text-warm-600" strokeWidth={2} />
            </div>
            <h1 className="text-2xl font-bold text-warm-900">Admin Login</h1>
            <p className="mt-1 text-sm text-warm-500">Sign in to manage site themes</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="mb-1 block text-sm font-medium text-warm-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full rounded-lg border border-warm-200 bg-white px-3 py-2.5 text-sm text-warm-900 placeholder-warm-400 outline-none transition-colors focus:border-coral-400 focus:ring-2 focus:ring-coral-100"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-warm-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-warm-200 bg-white px-3 py-2.5 text-sm text-warm-900 placeholder-warm-400 outline-none transition-colors focus:border-coral-400 focus:ring-2 focus:ring-coral-100"
                placeholder="Enter password"
              />
            </div>
            {error && (
              <p className="text-sm font-medium text-red-600">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-coral-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-coral-600 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Palette className="h-6 w-6 text-coral-500" strokeWidth={2} />
          <h1 className="text-2xl font-bold text-warm-900">Theme Manager</h1>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg border border-warm-200 px-4 py-2 text-sm font-medium text-warm-600 transition-colors hover:bg-warm-50"
        >
          <LogOut className="h-4 w-4" strokeWidth={2} />
          Log Out
        </button>
      </div>

      <p className="mb-6 text-sm text-warm-500">
        Select a seasonal theme to apply site-wide. The theme changes colors, animations, and seasonal images.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme) => {
          const isActive = theme.id === activeTheme;
          return (
            <button
              key={theme.id}
              onClick={() => handleSetTheme(theme.id)}
              disabled={saving}
              className={`group relative rounded-xl border-2 p-5 text-left transition-all ${
                isActive
                  ? "border-coral-500 bg-coral-50 shadow-md"
                  : "border-warm-100 bg-white hover:border-warm-300 hover:shadow-sm"
              } disabled:opacity-50`}
            >
              {isActive && (
                <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-coral-500">
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                </div>
              )}

              <div className="mb-3 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-xl"
                  style={{ backgroundColor: theme.preview + "20", color: theme.preview }}
                >
                  {THEME_ICONS[theme.icon] || "\ud83c\udfa8"}
                </div>
                <div>
                  <h3 className="font-semibold text-warm-900">{theme.name}</h3>
                </div>
              </div>

              {/* Color preview swatches */}
              <div className="flex gap-1">
                {["300", "500", "700"].map((shade) => (
                  <div
                    key={`warm-${shade}`}
                    className="h-4 w-4 rounded"
                    style={{ backgroundColor: theme.colors.warm[shade] }}
                  />
                ))}
                {["300", "500", "700"].map((shade) => (
                  <div
                    key={`coral-${shade}`}
                    className="h-4 w-4 rounded"
                    style={{ backgroundColor: theme.colors.coral[shade] }}
                  />
                ))}
                {["300", "500"].map((shade) => (
                  <div
                    key={`amber-${shade}`}
                    className="h-4 w-4 rounded"
                    style={{ backgroundColor: theme.colors.amber[shade] }}
                  />
                ))}
              </div>

              {theme.seasonalImages.length > 0 && (
                <p className="mt-2 text-xs text-warm-400">
                  {theme.seasonalImages.length} seasonal image{theme.seasonalImages.length > 1 ? "s" : ""}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
