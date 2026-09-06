import { Search } from "lucide-react";

export function SearchBar({ value, onChange }) {
  return (
    <label className="search">
      <Search size={18} strokeWidth={1.8} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search online stores..."
        aria-label="Search online stores"
      />
    </label>
  );
}