import React from "react";
import { campers } from "../manual/Karty.jsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function StayCarousel({ options = [], name = "stay", initialId, onChange })
{
  const [selectedIds, setSelectedIds] = React.useState(() =>
  {
    const first = options[0] && options[0].id;
    return initialId != null ? [initialId] : first != null ? [first] : [];
  });

  return (
    <div className="relative ">
      {/* scroll track */}
      <ul
        role="listbox"
        aria-label="Choose your stay"
        className="
          grid grid-flow-col auto-cols-[85%] sm:auto-cols-[280px]
          gap-3 px-3 py-[2px]
          overflow-x-auto snap-x snap-mandatory scroll-smooth
          [scrollbar-width:none] [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {options.map((o) =>
        {
          const checked = selectedIds.includes(o.id);
          return (
            <li
              key={o.id}
              role="option"
              aria-selected={checked}
              className="snap-start"
            >
              <label
                className="
                  block h-full select-none rounded-xl border
                  bg-white dark:bg-slate-900
                  border-black/5 dark:border-white/10
                  shadow-[0_2px_8px_rgba(26,26,26,.16)]
                  px-4 py-3 transition
                "
                data-checked={checked || undefined}
              >
                <input
                  type="checkbox"
                  name={name}
                  value={o.id}
                  className="sr-only peer"
                  checked={checked}
                  onChange={() =>
                  {
                    const next = checked
                      ? selectedIds.filter((id) => id !== o.id)
                      : [...selectedIds, o.id];
                    setSelectedIds(next);
                    onChange && onChange(next);
                    requestAnimationFrame(() =>
                    {
                      const el = document.activeElement?.closest("li");
                      el && el.scrollIntoView({ inline: "start", behavior: "smooth", block: "nearest" });
                    });
                  }}
                />

                <div className="flex items-start gap-3 peer-checked:[&_.inner]:bg-white">
                  {/* dot indicator */}
                  <span
                    className="
                      mt-1 inline-flex size-4 shrink-0 items-center justify-center
                      rounded-full border border-black/10 dark:border-white/20
                      ring-1 ring-inset ring-black/5 dark:ring-white/10
                      transition"
                    aria-hidden="true"
                  >
                    <span className="block inner size-2 rounded-full bg-white dark:bg-slate-900 peer-checked:bg-white" />
                  </span>

                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {o.name}
                    </div>
                    {o.subtitle && (
                      <div className="truncate text-xs text-slate-600 dark:text-slate-400">
                        {o.subtitle}
                      </div>
                    )}
                    {o.images && (
                      <img
                        src={o.images[0]}
                        alt={o.name}
                        className="w-full h-32 object-cover rounded-lg mt-2"
                      />
                    )}
                    {o.meta && (
                      <div
                        className="
                          mt-1 inline-flex items-center gap-1 rounded-full
                          border border-black/10 dark:border-white/10
                          px-2 py-[2px] text-[11px] text-slate-700 dark:text-slate-300
                          bg-[linear-gradient(180deg,#F7FAFF,#EEF4FF)]
                          dark:bg-[linear-gradient(180deg,#0B1220,#0F172A)]
                        "
                      >
                        {o.meta}
                      </div>
                    )}
                  </div>
                </div>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Rezerwacja()
{
  const options = campers.map((camper, i) => ({
    ...camper,
    subtitle: "dla 3 osob",
    meta: "Dostepna",
    key: camper.id,
    booked: camper.booked || [],
  }));

  const [selectedCamperIds, setSelectedCamperIds] = React.useState(
    options[0]?.id != null ? [options[0].id] : []
  );
  const [range, setRange] = React.useState(null); // null | Date | [Date, Date]



  // If camper changes, clear current range to avoid invalid selection
  React.useEffect(() => setRange(null), [selectedCamperIds]);

  const selectedCampers = React.useMemo(
    () => options.filter((o) => selectedCamperIds.includes(o.id)),
    [options, selectedCamperIds]
  );

  const bookedSet = React.useMemo(() =>
  {
    const s = new Set();
    selectedCampers.forEach((c) =>
    {
      (c.booked || []).length &&
       expandRangesToDays(c.booked).forEach((d) => s.add(d));
    });
    return s;
  }, [selectedCampers]);

  const today = startOfDay(new Date());

  return (
    <div className="min-h-[calc(100dvh-80px)] w-full flex flex-col bg-gray-100  relative touch-none overflow-x-clip">
      <div className="mx-[21px] my-[21px] flex flex-1 flex-col bg-white  rounded-2xl p-4 shadow-lg gap-4 ">
        <h1 className="text-[30px] pt-2 font-bold tracking-[1px] text-center">
          Rezerwacja przyczep
        </h1>
        <p className="text-[20px leading-8 text-[rgb(0,108,228)] pt-[16px] underline">
          Wybierz swoją przyczepę/przyczepy i sprawdź dostępność
        </p>
        <StayCarousel
          options={options}
          name="rezerwacja"
          initialId={options[0]?.id}
          onChange={(ids) =>
          {
            console.log("Selected IDs:", ids);
            setSelectedCamperIds(ids); // ← array of IDs
          }}
        />
        <div className="mt-4 rounded-xl border border-black/5 overflow-hidden">
          <Calendar
            selectRange
            allowPartialRange={false}
            value={range}
            onChange={(val) =>
            {
              // Only accept completed ranges; ignore single Date selections
              if (!Array.isArray(val))
              {
                return; // keeps current state (null or previous range)
              }

              const [a, b] = val || [];
              if (a && b && rangeIntersectsBooked(a, b, bookedSet))
              {
                setRange(null);
                return;
              }
              setRange(val); // valid [start, end]
            }}
            minDate={today}
            prev2Label={null}
            next2Label={null}
            // Disable booked days
            tileDisabled={({ date, view }) =>
            {
              if (view !== "month") return false;
              return bookedSet.has(key(date));
            }}
            // Add classes to show booked days visually
            tileClassName={({ date, view }) =>
            {
              if (view !== "month") return "";
              return bookedSet.has(key(date)) ? "rc-booked" : "";
            }}
          />
        </div>
        <Summary range={range} />
        <button className={`m-4 p-4 ${getNights(range) > 0 ? "bg-[#ff66009a]" : "bg-gray-200 opacity-70"} rounded-2xl
        shadow-[12px_12px_24px_rgba(0,0,0,0.25),-12px_-12px_24px_rgba(255,255,255,0.6)]
        px-2 mb-6 lg:px-8 lg:py-3 text-center font-body leading-[0.88] text-white text-lg font-semibold textborder text-[14px]
        lg:text-[30px]`}>Zarezerwuj Przyczepę!</button>
      </div>
    </div>
  );
}

export default Rezerwacja;

function startOfDay(d)
{
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function key(d)
{
  const x = startOfDay(d);
  const y = x.getFullYear();
  const m = String(x.getMonth() + 1).padStart(2, "0");
  const dd = String(x.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}
// clicked day is selected if single equals it or within [a,b]
function isDaySelected(date, value)
{
  if (!value) return false;
  const kd = key(date);
  if (Array.isArray(value))
  {
    const [a, b] = value;
    if (!a || !b) return false;
    const ka = key(a),
      kb = key(b);
    const lo = ka < kb ? ka : kb;
    const hi = ka < kb ? kb : ka;
    return kd >= lo && kd <= hi;
  }
  return kd === key(value);
}
// booked: [{ start:'YYYY-MM-DD', end:'YYYY-MM-DD' }]
function expandRangesToDays(ranges)
{
  const out = [];
  for (const { start, end } of ranges)
  {
    const s = startOfDay(new Date(start));
    const e = startOfDay(new Date(end));
    for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1))
    {
      out.push(key(d));
    }
  }
  return out;
}
function rangeIntersectsBooked(a, b, bookedSet)
{
  if (!a || !b) return false;
  const s = startOfDay(a),
    e = startOfDay(b);
  for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1))
  {
    if (bookedSet.has(key(d))) return true;
  }
  return false;
}
function getNights(range)
{
  if (!Array.isArray(range) || !range[0] || !range[1]) return 0;
  const [a, b] = range;
  return Math.max(0, Math.round((startOfDay(b) - startOfDay(a)) / 86400000));
}
/* Optional: a tiny summary component you already had */
function Summary({ range })
{
  if (!Array.isArray(range) || !range[0] || !range[1])
  {
    return <div className="text-sm text-slate-500">Wybierz zakres dat…</div>;
  }
  const [a, b] = range;
  const nights = Math.max(
    0,
    Math.round((startOfDay(b) - startOfDay(a)) / 86400000),
  );
  return (
    <div className="text-sm text-slate-700">
      Od <b>{a.toLocaleDateString()}</b> do <b>{b.toLocaleDateString()}</b> —{" "}
      <b>{nights}</b> nocy <p className="text-green-700">wybrane daty są dotępne!</p>
    </div>
  );
}
