import React from "react";
import { campers } from "../manual/Karty.jsx";
import { useLocation, useSearchParams } from "react-router-dom";
import ResponsiveCalendar from "./Calendar.jsx";

function StayCarousel({ options = [], name = "stay", initialId, onChange })
{
  const [selectedIds, setSelectedIds] = React.useState(() =>
  {
    const first = options[0] && options[0].id;
    return initialId != null ? [initialId] : first != null ? [first] : [];
  });
  React.useEffect(() =>
  {
    const targetId = initialId ?? selectedIds[0];
    if (targetId == null) return;
    const el = document.querySelector(`li[data-id="${targetId}"]`);
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: "auto" });
  }, []); // run once

  return (
    <div className="relative flex-1 flex">
      {/* scroll track */}
      <ul
        role="listbox"
        aria-label="Choose your stay"
        className="
          grid grid-flow-col auto-cols-[85%] sm:auto-cols-[280px]
          gap-3 px-3 py-[3px]
          overflow-x-auto snap-x snap-mandatory scroll-smooth
          [scrollbar-width:none] [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden min-h-0
        "
      >
        {options.map((o) =>
        {
          const checked = selectedIds.includes(o.id);
          return (
            <li
              data-id={o.id}
              key={o.id}
              role="option"
              aria-selected={checked}
              className="snap-start"
            >
              <label
                className="
                  block h-full select-none rounded-xl border
                  bg-slate-900
                  border-white/10
                  shadow-[0_2px_8px_rgba(26,26,26,.16)]
                  px-4 py-[4px] transition
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

                <div className="flex min-h-0 items-start gap-3 peer-checked:[&_.inner]:bg-white">
                  {/* dot indicator */}
                  <span
                    className="
                      mt-1 inline-flex size-4 shrink-0 items-center justify-center
                      rounded-full border  border-white/20
                      ring-1 ring-inset  ring-white/10
                      transition min-h-0"
                    aria-hidden="true"
                  >
                    <span className="block inner size-2 rounded-full bg-slate-900 peer-checked:bg-white" />
                  </span>

                  <div className="min-w-0 min-h-0 flex-1 flex-col overflow-auto">
                    <div className="truncate text-sm font-semibold text-slate-100">
                      {o.name}
                    </div>
                    {o.subtitle && (
                      <div className="truncate text-xs text-slate-400">
                        {o.subtitle}
                      </div>
                    )}
                    {o.images && (
                      <img
                        src={o.images[0]}
                        alt={o.name}
                        className="h-[clamp(100px,18cqh,250px)] object-cover rounded-lg mt-2"
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

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const initialId = React.useMemo(() =>
  {
    const fromState = location.state && location.state.initialId;
    if (fromState != null) return fromState;
    const q = searchParams.get("camper");
    if (q == null) return options[0]?.id;
    const m = options.find(o => String(o.id) === q);
    return m ? m.id : options[0]?.id;
  }, [location.state, searchParams, options])

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
    <div className="min-h-[calc(100dvh-80px)] h-[calc(100dvh-80px)] w-full flex flex-col bg-gray-100  relative touch-none overflow-x-clip
    [@media(min-width:769px)]:mt-[80px]">
      <div className="mx-[21px] mt-[21px] mb-[8px] flex  h-full max-h-full flex-col bg-white  rounded-2xl p-4 shadow-lg gap-[12px] [container-type:size]
      md:mx-8 md:my-8 md:gap-4">
        <h1 className="text-[25px] pt-2 font-bold tracking-[1.8px] text-center leading-4 whitespace-nowrap
        md:text-[36px] md:leading-8">
          Rezerwacja przyczep
        </h1>
        <p className="text-[16px] leading-5 text-[rgb(0,108,228)] pt-2 underline
        md:text-[20px] md:leading-8">
          Wybierz swoją przyczepę/przyczepy i sprawdź dostępność
        </p>
        <div className=" flex flex-col h-[clamp(190px,30cqh,250px)]">
          <StayCarousel
            options={options}
            name="rezerwacja"
            initialId={initialId}
            onChange={(ids) =>
            {
              console.log("Selected IDs:", ids);
              setSelectedCamperIds(ids); // ← array of IDs
            }}
          />
        </div>
        <div className="rounded-xl overflow-hidden flex md:flex-1 justify-center [@media(min-width:760px)]:!items-center md:min-h-0 md:mt-4">
          <ResponsiveCalendar
            /* optional wrapper spacing */
            className="mt-2 md:h-full"
            /* calendar props */
            selectRange
            allowPartialRange={false}
            value={range}
            onChange={(val) =>
            {
              if (!Array.isArray(val)) return;
              const [a, b] = val || [];
              if (a && b && rangeIntersectsBooked(a, b, bookedSet))
              {
                setRange(null);
                return;
              }
              setRange(val);
            }}
            minDate={today}
            prev2Label={null}
            next2Label={null}
            tileDisabled={({ date, view }) => view === "month" && bookedSet.has(key(date))}
            tileClassName={({ date, view }) =>
              view === "month" && bookedSet.has(key(date)) ? "rc-booked" : ""
            }
            /* optional: change when it becomes a sheet */
            shortHeightQuery="(max-height: 760px)"
            /* optional: auto-close sheet when range picked */
            autoCloseOnRange
          />
        </div>
        <div className="flex flex-col gap-3 justify-between mt-auto">
          <Summary range={range} />
          <button className={` mx-4 p-4 py-5 ${getNights(range) > 0 ? "bg-[#ff6600]" : "bg-gray-200 opacity-70"} rounded-2xl
        shadow-[12px_12px_24px_rgba(0,0,0,0.25),-12px_-12px_24px_rgba(255,255,255,0.6)]
        text-center font-body leading-[1px] tracking-[1.8px] text-white text-lg font-semibold  text-[14px]
        lg:text-[30px] flex justify-center mb-0.5`}>Zarezerwuj Przyczepę!</button>
        </div>
      </div>
    </div>
  );
}

export default Rezerwacja;








/* Additional Calendar functions */
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
// clicked day is selected if single equals it or within [a,b] -> not used
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
/* summary component */
function Summary({ range })
{
  if (!Array.isArray(range) || !range[0] || !range[1])
  {
    return <div className="text-sm text-slate-500 mt-auto">Wybierz zakres dat…</div>;
  }
  const [a, b] = range;
  const nights = Math.max(
    0,
    Math.round((startOfDay(b) - startOfDay(a)) / 86400000),
  );
  return (
    <div className="text-sm text-slate-700 leading-4">
      Od <b>{a.toLocaleDateString()}</b> do <b>{b.toLocaleDateString()}</b> —{" "}
      <b>{nights}</b> nocy <p className="text-green-700">wybrane daty są dotępne!</p>
    </div>
  );
}
