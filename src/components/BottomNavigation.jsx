import {
  ChartNoAxesColumnIncreasing,
  House,
  ReceiptText,
  Store,
  UserRound,
} from "lucide-react";

const items = [
  { id: "home", label: "Home", Icon: House },
  { id: "shop", label: "Shop", Icon: Store },
  { id: "dues", label: "EMI Dues", Icon: ReceiptText },
  { id: "limit", label: "Limit", Icon: ChartNoAxesColumnIncreasing },
  { id: "profile", label: "Profile", Icon: UserRound },
];

export function BottomNavigation() {
  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {items.map(({ id, label, Icon }) => {
        const active = id === "shop";
        return (
          <button
            key={id}
            className={`nav-item ${active ? "active" : ""}`}
            type="button"
            aria-current={active ? "page" : undefined}
          >
            <Icon size={22} strokeWidth={1.8} />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}