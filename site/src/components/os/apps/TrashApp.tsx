import { useState } from "react";
import { YellowButton } from "./ui";

export function TrashApp() {
  const [items, setItems] = useState<string[]>([
    "vendor_lock_in.json",
    "paywall_per_seat.yaml",
    "closed_source_policy.md",
    "3_day_onboarding.pdf",
    "manual_setup_guide.docx",
  ]);

  const handleEmptyTrash = () => {
    setItems([]);
    window.dispatchEvent(new CustomEvent("sidekick_status_change", {
      detail: {
        status: "happy",
        message: "Successfully emptied the trash! Clean workspace initialized."
      }
    }));
  };

  return (
    <div className="px-7 py-7 text-center h-full flex flex-col justify-center items-center">
      <div className="text-5xl animate-bounce">🗑️</div>
      <h1 className="mt-3 text-xl font-extrabold text-ink">Trash</h1>
      <p className="text-[13px] text-mute mb-5">Things we threw out so you don't need them.</p>
      
      {items.length > 0 ? (
        <div className="w-full max-w-sm mx-auto space-y-2 text-left mb-5">
          {items.map((it) => (
            <div
              key={it}
              className="flex items-center gap-2.5 rounded-lg border border-hairline bg-white px-3.5 py-2.5 text-[13px] font-mono text-mute line-through shadow-sm"
            >
              📄 {it}
            </div>
          ))}
          <div className="text-center pt-2">
            <YellowButton onClick={handleEmptyTrash} className="bg-red-500 hover:bg-red-600 border-red-700 text-white font-bold text-[12px] rounded-lg">
              Empty Trash
            </YellowButton>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 text-zinc-400 font-bold text-[13px] italic">
          Trash is completely empty. Safe, clean, and open. ✨
        </div>
      )}
    </div>
  );
}
