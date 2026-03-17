import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function SchemaEvolution() {
  const [ref, isVisible] = useScrollReveal(0.2);

  const phase = isVisible ? "visible" : "hidden";

  return (
    <div className="max-w-3xl mx-auto px-6">
      <div
        ref={ref}
        className="rounded-lg border overflow-hidden"
        style={{ borderColor: "#E0DDD8" }}
      >
        <div className="grid md:grid-cols-[1fr_auto_1fr]">
          {/* LEFT — v1.0 Wrong */}
          <div
            className="p-8 border-b md:border-b-0 md:border-r"
            style={{
              borderColor: "#E0DDD8",
              opacity: phase === "visible" ? 1 : 0,
              transition: "opacity 500ms ease-out",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-xs font-mono uppercase tracking-[0.15em]"
                style={{ color: "#9A9A8A" }}
              >
                v1.0 — Toy-Centric
              </span>
              <span className="ml-auto text-sm" style={{ color: "#ef4444" }}>
                ✕
              </span>
            </div>

            {/* Big wrong box */}
            <div
              className="rounded-lg p-4 border-2 border-dashed"
              style={{
                borderColor: "#ef4444",
                background: "#fef2f2",
                opacity: phase === "visible" ? 1 : 0,
                transition: "opacity 400ms ease-out 100ms",
              }}
            >
              <p
                className="text-xs font-mono mb-3"
                style={{ color: "#dc2626" }}
              >
                Product / Toy
              </p>
              <div className="space-y-2">
                {["Tool data", "Tool specs", "Tool refs"].map((item, i) => (
                  <div
                    key={i}
                    className="rounded px-3 py-2 text-xs font-mono border"
                    style={{
                      background: "#fff",
                      borderColor: "#fca5a5",
                      color: "#9A9A8A",
                      opacity: phase === "visible" ? 1 : 0,
                      transition: `opacity 300ms ease-out ${200 + i * 100}ms`,
                    }}
                  >
                    {item} (embedded ×50)
                  </div>
                ))}
              </div>
            </div>

            <p
              className="text-xs mt-4 leading-relaxed"
              style={{ color: "#9A9A8A" }}
            >
              Tool data embedded in every product record. Change one spec:
              update thousands of rows.
            </p>
          </div>

          {/* CENTER — Arrow */}
          <div className="flex items-center justify-center px-4 py-6 md:py-0">
            <div className="flex flex-col items-center gap-2">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                className="md:rotate-0 rotate-90"
                style={{
                  opacity: phase === "visible" ? 1 : 0,
                  transition: "opacity 400ms ease-out 600ms",
                }}
              >
                <path
                  d="M8 20H32M32 20L24 12M32 20L24 28"
                  stroke="#C8470D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className="text-xs font-mono text-center whitespace-nowrap"
                style={{
                  color: "#9A9A8A",
                  opacity: phase === "visible" ? 1 : 0,
                  transition: "opacity 300ms ease-out 700ms",
                }}
              >
                October
                <br />
                refactor
              </span>
            </div>
          </div>

          {/* RIGHT — v3.1 Correct */}
          <div
            className="p-8"
            style={{
              opacity: phase === "visible" ? 1 : 0,
              transition: "opacity 500ms ease-out 800ms",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-xs font-mono uppercase tracking-[0.15em]"
                style={{ color: "#9A9A8A" }}
              >
                v3.1 — Tool-Centric
              </span>
              <span className="ml-auto text-sm" style={{ color: "#22c55e" }}>
                ✓
              </span>
            </div>

            {/* Tool box */}
            <div
              className="rounded-lg p-4 border-2 mb-4"
              style={{
                borderColor: "#22c55e",
                background: "#f0fdf4",
                opacity: phase === "visible" ? 1 : 0,
                transition: "opacity 400ms ease-out 900ms",
              }}
            >
              <p className="text-xs font-mono" style={{ color: "#16a34a" }}>
                Tool (standalone)
              </p>
              <p className="text-xs mt-1" style={{ color: "#9A9A8A" }}>
                Defined once.
              </p>
            </div>

            {/* Arrows to products */}
            <div className="flex gap-2 items-start">
              <div className="flex flex-col items-center gap-1 pt-1">
                {[0, 1, 2].map((i) => (
                  <svg
                    key={i}
                    width="24"
                    height="16"
                    viewBox="0 0 24 16"
                    fill="none"
                    style={{
                      opacity: phase === "visible" ? 1 : 0,
                      transition: `opacity 300ms ease-out ${1000 + i * 80}ms`,
                    }}
                  >
                    <path
                      d="M2 8H20M20 8L15 3M20 8L15 13"
                      stroke="#C8470D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                {["Product A", "Product B", "Product C…"].map((p, i) => (
                  <div
                    key={i}
                    className="rounded px-3 py-1.5 text-xs font-mono border"
                    style={{
                      background: "#fff",
                      borderColor: "#bbf7d0",
                      color: "#1A1A1A",
                      opacity: phase === "visible" ? 1 : 0,
                      transition: `opacity 300ms ease-out ${1000 + i * 80}ms`,
                    }}
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>

            <p
              className="text-xs mt-4 leading-relaxed"
              style={{ color: "#9A9A8A" }}
            >
              One tool defined once. Referenced everywhere.
            </p>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 32, marginBottom: 32 }}>
        <img
          src="/ERD_PTMI_2.png"
          alt="EDEN schema evolution across 10 iterations"
          style={{
            width: "100%",
            borderRadius: 8,
            border: "1px solid #E0DDD8",
            display: "block",
          }}
        />
        <p
          style={{
            fontSize: 11,
            fontFamily: "monospace",
            color: "#9A9A8A",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Schema evolution across 10 iterations, latest taken 2025 Augusts.
        </p>
      </div>
    </div>
  );
}
