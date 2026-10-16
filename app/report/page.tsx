const aspects = [
  {
    aspect: "Content & Substance",
    grade: "A",
    score: 90,
    notes: "Well-researched with strong supporting evidence and clear arguments.",
  },
  {
    aspect: "Structure & Organisation",
    grade: "B+",
    score: 78,
    notes: "Logical flow overall, but transitions between sections could be smoother.",
  },
  {
    aspect: "Writing Quality",
    grade: "A-",
    score: 85,
    notes: "Clear and concise language. Minor grammatical issues noted on pages 4–6.",
  },
  {
    aspect: "Analysis & Critical Thinking",
    grade: "B",
    score: 74,
    notes: "Good observations, but conclusions need deeper analytical support.",
  },
  {
    aspect: "Presentation & Formatting",
    grade: "A",
    score: 92,
    notes: "Excellent layout, consistent formatting, and professional appearance.",
  },
];

const FINAL_GRADE = "B+";
const FINAL_SCORE = 83.8;

function gradeBadgeClass(score: number): string {
  if (score >= 90) return "bg-[#10704b] text-[#FFEFB3]";
  if (score >= 80) return "bg-[#1a8f62] text-white";
  if (score >= 70) return "bg-[#FFEFB3] text-[#053322] border border-[#10704b]";
  return "bg-red-100 text-red-700 border border-red-300";
}

export default function ReportPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 py-36 font-sans">
      {/* Header */}
      <div className="w-full max-w-3xl mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-[#10704b]">Evaluation Report</h1>
        <p className="mt-2 text-[#053322]/70 text-sm font-medium">
          A detailed breakdown of your report performance across all assessed aspects.
        </p>
      </div>

      {/* Report Card */}
      <div className="w-full max-w-3xl bg-[#FFEFB3] rounded-3xl border-3 border-[#10704b] overflow-hidden">
        {/* Table */}
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#10704b] text-[#FFEFB3]">
              <th className="text-left px-6 py-4 font-bold uppercase tracking-wide text-xs w-[35%]">
                Aspect
              </th>
              <th className="text-center px-4 py-4 font-bold uppercase tracking-wide text-xs w-[12%]">
                Grade
              </th>
              <th className="text-center px-4 py-4 font-bold uppercase tracking-wide text-xs w-[12%]">
                Score
              </th>
              <th className="text-left px-6 py-4 font-bold uppercase tracking-wide text-xs">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {aspects.map((row, i) => (
              <tr
                key={row.aspect}
                className={`border-t border-[#10704b]/20 transition-colors duration-150 ${
                  i % 2 === 0 ? "bg-transparent" : "bg-[#10704b]/5"
                }`}
              >
                <td className="px-6 py-4 font-semibold text-[#053322]">{row.aspect}</td>
                <td className="px-4 py-4 text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${gradeBadgeClass(row.score)}`}
                  >
                    {row.grade}
                  </span>
                </td>
                <td className="px-4 py-4 text-center font-bold text-[#053322]">
                  {row.score}
                </td>
                <td className="px-6 py-4 text-[#053322]/80 leading-relaxed">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Final Grade Row */}
        <div className="border-t-3 border-[#10704b] bg-[#10704b] px-6 py-5 flex flex-row items-center justify-between">
          <div>
            <p className="text-[#FFEFB3]/70 text-xs font-bold uppercase tracking-widest mb-0.5">
              Final Grade
            </p>
            <p className="text-[#FFEFB3] text-sm font-medium">
              Average across all evaluated aspects
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[#FFEFB3]/70 text-xs font-semibold uppercase tracking-wide">
                Score
              </p>
              <p className="text-[#FFEFB3] text-2xl font-extrabold">{FINAL_SCORE}</p>
            </div>
            <div className="bg-[#FFEFB3] text-[#10704b] rounded-2xl px-5 py-2 font-extrabold text-3xl border-2 border-[#053322]">
              {FINAL_GRADE}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}