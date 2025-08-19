import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendarfill.css";

function useMediaQuery(query, initial = false)
{
  const get = () =>
    typeof window === "undefined" ? initial : window.matchMedia(query).matches;
  const [matches, setMatches] = React.useState(get);
  React.useEffect(() =>
  {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    mql.addEventListener?.("change", onChange) ?? mql.addListener(onChange);
    setMatches(mql.matches);
    return () =>
      mql.removeEventListener?.("change", onChange) ??
      mql.removeListener(onChange);
  }, [query]);
  return matches;
}

function useScrollLock(locked)
{
  React.useEffect(() =>
  {
    const el = document.documentElement;
    const prev = el.style.overflow;
    if (locked) el.style.overflow = "hidden";
    return () => (el.style.overflow = prev);
  }, [locked]);
}

export default function ResponsiveCalendar({
  className = "",
  shortHeightQuery = "(max-height: 720px)",
  autoCloseOnRange = true,
  onChange,
  ...calendarProps
})
{
  const isShort = useMediaQuery(shortHeightQuery);
  const [open, setOpen] = React.useState(false);
  useScrollLock(open);

  const wrappedOnChange = React.useCallback(
    (val) =>
    {
      onChange?.(val);
      if (autoCloseOnRange && Array.isArray(val) && val[0] && val[1])
      {
        setOpen(false);
      }
    },
    [onChange, autoCloseOnRange]
  );

  if (!isShort)
  {
    // Inline mode (with internal cap + scroll container)
    return (
      <div className={`rounded-xl min-h-0 overflow-hidden ${className}`}>
        <div className="h-full w-full overflow-auto overscroll-contain px-2 lg:px-0 ">
          <div className="mx-auto w-full max-w-[420px] md:max-w-[600px] md:!h-full
           ">
            {/*bunch of tailwind to keep calendar responsive */}
            <Calendar {...calendarProps} onChange={wrappedOnChange} className="!w-full !md:h-full lg:!max-w-[400px]" tileClassName={"!h-[35px] md:!h-[50px] [@media(min-height:1100px)]:!h-[75px] [@media(min-height:1000px)]:!text-[20px] [@media(min-height:1300px)]:!h-[95px] [@media(min-height:1300px)]:!w-[95px] [@media(min-height:1300px)]:!text-[25px]"} />
          </div>
        </div>
      </div>
    );
  }

  // Bottom-sheet mode
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-2xl border border-black/5 bg-white py-3 text-sm font-medium shadow-sm"
      >
        Wybierz daty
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex flex-col pointer-events-none"
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50 pointer-events-auto" onClick={() => setOpen(false)} />
          <div
            className="relative z-10 mt-auto w-full rounded-t-2xl bg-white shadow-xl
                max-h-[85dvh] pb-[max(12px,env(safe-area-inset-bottom))]
                pointer-events-auto touch-pan-y"
          >
            <div className="mx-auto mt-2 mb-2 h-1.5 w-12 rounded-full bg-slate-300" />
            <div className="px-4 pb-4 overflow-auto">
              <div className="mx-auto w-full max-w-[520px]">
                <Calendar {...calendarProps} onChange={wrappedOnChange} className="w-full" />
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 rounded-xl bg-slate-100 py-2 text-sm" onClick={() => setOpen(false)}>
                  Anuluj
                </button>
                <button className="flex-1 rounded-xl bg-[#ff6600] text-white py-2 text-sm" onClick={() => setOpen(false)}>
                  Gotowe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
