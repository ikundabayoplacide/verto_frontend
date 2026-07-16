import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const KPI_OPTIONS = [
  { key: "monthly", label: "01" },
  { key: "quarterly", label: "02" },
  { key: "yearly", label: "03" },
  { key: "contract", label: "04" },
  { key: "years", label: "05" },
] as const;

type KpiKey = (typeof KPI_OPTIONS)[number]["key"];

interface BaseDef {
  key: KpiKey;
  category: string;
  label: string;
  color: string;
}

interface StatDef extends BaseDef {
  unit?: string;
}

interface AimDef extends BaseDef {
  suffix?: string;
}

const STAT_DEFS: StatDef[] = [
  { key: "monthly", category: "Revenue", label: "Monthly Revenue", unit: "RWF", color: "#1f2937" },
  { key: "quarterly", category: "Revenue", label: "Quarterly Revenue", unit: "RWF", color: "#2563eb" },
  { key: "yearly", category: "Revenue", label: "Yearly Revenue", unit: "RWF", color: "#4f46e5" },
  { key: "contract", category: "Contracts", label: "Contracts", color: "#059669" },
  { key: "years", category: "Experience", label: "Years Experience", color: "#d97706" },
];

const AIM_DEFS: AimDef[] = [
  { key: "monthly", category: "Revenue", label: "Monthly Revenue", suffix: "RWF", color: "#1f2937" },
  { key: "quarterly", category: "Revenue", label: "Quarterly Revenue", suffix: "RWF", color: "#2563eb" },
  { key: "yearly", category: "Revenue", label: "Yearly Revenue", suffix: "RWF", color: "#4f46e5" },
  { key: "contract", category: "Contracts", label: "Contracts", color: "#059669" },
  { key: "years", category: "Experience", label: "Years Experience", color: "#d97706" },
];

/* ------------------------------------------------------------------ */
/*  helpers                                                           */
/* ------------------------------------------------------------------ */

const formatKilowatts = (v: number) => (v >= 1000 ? `${v / 1000}K` : String(v));

const parseStat = (raw: string): number | null => {
  if (!raw) return null;
  const n = Number(raw.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : null;
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

interface StatModalProps {
  open: boolean;
  mode: "stats" | "aims" | null;
  data?: any;
  onSave: (payload: any) => void;
  onClose: () => void;
}

export default function StatModal({ open, mode, data, onSave, onClose }: StatModalProps) {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [values, setValues] = useState<Record<KpiKey, string>>({
    monthly: "",
    quarterly: "",
    yearly: "",
    contract: "",
    years: "",
  });
  const [unitMode, setUnitMode] = useState<boolean>(false);

  const list = mode === "stats" ? (STAT_DEFS as any) : (AIM_DEFS as any);


  const set = (k: KpiKey, v: string) => setValues((prev) => ({ ...prev, [k]: v }));

  const handleOk = () => {
    if (!title.trim()) {
      setTitleError(true);
      return;
    }

    if (mode === "stats") {
      const statDefs = list as StatDef[];
      const entry: any = { title };

      if (unitMode) {
        const main = statDefs.find((d) => values[d.key] !== undefined);
        if (main) {
          entry.key = main.key;
          entry.value = parseInt(values[main.key] || "0", 10);
          entry.unit = "kilowatts";
        }
      } else {
        statDefs.forEach((def) => {
          if (values[def.key]) {
            entry.key = def.key;
            entry.value = parseInt(values[def.key], 10);
          }
        });
      }
      onSave(entry);
    } else {
      const aimDefs = list as AimDef[];
      const goals: any[] = [];
      aimDefs.forEach((def) => {
        const raw = values[def.key];
        const v = parseStat(raw);
        if (v !== null) {
          goals.push({
            label: def.label,
            unit: def.suffix || "",
            value: v,
            formatted: def.suffix === "RWF" ? `RWF ${formatKilowatts(v)}` : `${v}`,
          });
        }
      });
      onSave({ title, goals });
    }

    onClose();
  };

  const isStatsMode = mode === "stats";

  useEffect(() => {
    if (!open) return;
    setTitle("");
    setTitleError(false);
    setValues({ monthly: "", quarterly: "", yearly: "", contract: "", years: "" });
    if (data) {
      setTitle(data.title || data.sectionTitle || "");
      if (data.key && data.value !== undefined) {
        setValues((v) => ({ ...v, [data.key as KpiKey]: String(data.value) }));
      }
      if (mode === "stats") setUnitMode(Boolean(data.unit));
    }
    if (mode === "aims") setUnitMode(false);
  }, [open, data, mode]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-[520px] bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-base font-black text-gray-900">{isStatsMode ? "Edit Stat" : "Edit Aim"}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4">
          {/* Section title */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Section Title *</label>
            <input
              className={`w-full rounded-lg border ${titleError ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"} text-gray-800 text-sm px-3 py-2.5 outline-none placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim()) setTitleError(false);
              }}
              placeholder="e.g. Achievements"
            />
            {titleError && <p className="text-xs text-red-500">Title is required</p>}
          </div>

          {/* KPI inputs */}
          {list.map((def: any) => {
            return (
              <div className="flex flex-col gap-1" key={def.key}>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: def.color }} />
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{def.label}</label>
                  {isStatsMode && !unitMode && <span className="text-xs text-gray-400">{def.unit || ""}</span>}
                </div>

                <input
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm px-3 py-2.5 outline-none placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  type="text"
                  value={values[def.key as KpiKey]}
                  onChange={(e) => set(def.key as KpiKey, e.target.value)}
                  placeholder={def.suffix === "RWF" ? "e.g. 50000000" : "e.g. 15000"}
                />
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleOk}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500 text-white text-xs font-bold hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}