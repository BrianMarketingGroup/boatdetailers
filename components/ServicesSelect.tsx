"use client";

import { detailingServices } from "@/content/services";

const ALL_LABEL = "All Specialties and Services";

interface ServicesSelectProps {
  value: string[];
  onChange: (selected: string[]) => void;
  error?: string;
}

export default function ServicesSelect({ value, onChange, error }: ServicesSelectProps) {
  const allLabels = detailingServices.map((s) => s.label);
  const allSelected = allLabels.every((l) => value.includes(l));

  function toggle(label: string) {
    if (value.includes(label)) {
      onChange(value.filter((v) => v !== label));
    } else {
      onChange([...value, label]);
    }
  }

  function toggleAll() {
    if (allSelected) {
      onChange([]);
    } else {
      onChange([...allLabels]);
    }
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {detailingServices.map((service) => {
          const selected = value.includes(service.label);
          return (
            <label
              key={service.id}
              className={`flex items-center gap-3 rounded-xl border-2 cursor-pointer p-3.5 transition-all ${
                selected
                  ? "border-teal bg-teal/5"
                  : "border-sky-dark hover:border-teal/40 bg-white"
              }`}
            >
              <input
                type="checkbox"
                checked={selected}
                onChange={() => toggle(service.label)}
                className="h-4 w-4 rounded accent-teal flex-shrink-0"
              />
              <p className="font-semibold text-sm text-navy leading-snug">{service.label}</p>
            </label>
          );
        })}
      </div>

      <label
        className={`flex items-center gap-3 rounded-xl border-2 cursor-pointer p-3.5 transition-all mt-1 ${
          allSelected
            ? "border-teal bg-teal/5"
            : "border-sky-dark hover:border-teal/40 bg-white"
        }`}
      >
        <input
          type="checkbox"
          checked={allSelected}
          onChange={toggleAll}
          className="h-4 w-4 rounded accent-teal flex-shrink-0"
        />
        <p className="font-bold text-sm text-navy leading-snug">{ALL_LABEL}</p>
      </label>

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
