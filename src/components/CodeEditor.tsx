export default function CodeEditor() {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        backgroundColor: "#0D0D14",
        border: "1px solid #22222C",
        borderRadius: "8px",
        boxShadow: "0px 24px 60px rgba(0, 0, 0, 0.5)",
        fontFamily: "JetBrains Mono, monospace",
        fontSize: "13px",
        lineHeight: "1.7",
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ backgroundColor: "#13131A", borderBottom: "1px solid #22222C" }}
      >
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28C840" }} />
        <span className="ml-auto text-xs" style={{ color: "#5A5A6A" }}>api/projects.ts</span>
      </div>

      <div className="px-5 py-5 overflow-x-auto">
        <pre className="text-xs sm:text-sm leading-relaxed whitespace-pre">
          <span className="syntax-lineno">{"1  "}</span>
          <span className="syntax-comment">{"// Sintrix project scaffold\n"}</span>
          <span className="syntax-lineno">{"2  "}</span>
          <span className="syntax-keyword">import </span>
          <span className="syntax-variable">{"{ createApp } "}</span>
          <span className="syntax-keyword">from </span>
          <span className="syntax-string">{"'@sintrix/core';\n"}</span>
          <span className="syntax-lineno">{"3  "}</span>
          <span className="syntax-keyword">import </span>
          <span className="syntax-variable">{"{ db } "}</span>
          <span className="syntax-keyword">from </span>
          <span className="syntax-string">{"'./database';\n"}</span>
          <span className="syntax-lineno">{"4  \n"}</span>
          <span className="syntax-lineno">{"5  "}</span>
          <span className="syntax-keyword">const </span>
          <span className="syntax-variable">app </span>
          <span className="syntax-variable">= </span>
          <span className="syntax-function">createApp</span>
          <span className="syntax-variable">{"({\n"}</span>
          <span className="syntax-lineno">{"6  "}</span>
          <span className="syntax-variable">{"  name: "}</span>
          <span className="syntax-string">{"'project-aurora'"}</span>
          <span className="syntax-variable">{",\n"}</span>
          <span className="syntax-lineno">{"7  "}</span>
          <span className="syntax-variable">{"  stack: ["}</span>
          <span className="syntax-string">{"'react'"}</span>
          <span className="syntax-variable">{", "}</span>
          <span className="syntax-string">{"'node'"}</span>
          <span className="syntax-variable">{", "}</span>
          <span className="syntax-string">{"'postgres'"}</span>
          <span className="syntax-variable">{"],\n"}</span>
          <span className="syntax-lineno">{"8  "}</span>
          <span className="syntax-variable">{"});\n"}</span>
          <span className="syntax-lineno">{"9  \n"}</span>
          <span className="syntax-lineno">{"10 "}</span>
          <span className="syntax-type">export </span>
          <span className="syntax-keyword">async function </span>
          <span className="syntax-function">handleRequest</span>
          <span className="syntax-variable">{"(\n"}</span>
          <span className="syntax-lineno">{"11 "}</span>
          <span className="syntax-variable">{"  req: "}</span>
          <span className="syntax-type">Request</span>
          <span className="syntax-variable">{"\n"}</span>
          <span className="syntax-lineno">{"12 "}</span>
          <span className="syntax-variable">{"): "}</span>
          <span className="syntax-type">Promise</span>
          <span className="syntax-variable">{"<"}</span>
          <span className="syntax-type">Response</span>
          <span className="syntax-variable">{">"}</span>
          <span className="syntax-variable">{" {\n"}</span>
          <span className="syntax-lineno">{"13 "}</span>
          <span className="syntax-keyword">{"  const "}</span>
          <span className="syntax-variable">data </span>
          <span className="syntax-variable">= </span>
          <span className="syntax-keyword">await </span>
          <span className="syntax-variable">db.</span>
          <span className="syntax-function">query</span>
          <span className="syntax-variable">{"(\n"}</span>
          <span className="syntax-lineno">{"14 "}</span>
          <span className="syntax-string">{"    'SELECT * FROM projects'\n"}</span>
          <span className="syntax-lineno">{"15 "}</span>
          <span className="syntax-variable">{"  );\n"}</span>
          <span className="syntax-lineno">{"16 "}</span>
          <span className="syntax-keyword">{"  return "}</span>
          <span className="syntax-variable">app.</span>
          <span className="syntax-function">json</span>
          <span className="syntax-variable">{"({ data });\n"}</span>
          <span className="syntax-lineno">{"17 "}</span>
          <span className="syntax-variable">{"}"}</span>
        </pre>
      </div>
    </div>
  );
}
