import { DISPLAY, BODY, C } from "./tokens"

export type PaymentStep = { pct: string; title: string; date?: string; body: string }

// `.pay` : pourcentage en gros (display, 200, 52px) à gauche, titre (body,
// 600, 16px) + sous-label capitales + paragraphe à droite.
export default function PaymentFrieze({ steps }: { steps: PaymentStep[] }) {
  return (
    <ul className="list-none p-0 mt-12">
      {steps.map((s, i) => (
        <li
          key={i}
          className="grid grid-cols-1 min-[521px]:grid-cols-[minmax(128px,auto)_1fr] gap-[10px] min-[521px]:gap-7 items-start py-[26px] border-t last:border-b"
          style={{ borderColor: C.line }}
        >
          <p className="text-[44px] min-[521px]:text-[52px] leading-[.9] font-extralight whitespace-nowrap m-0" style={{ fontFamily: DISPLAY, fontWeight: 200, color: C.ink }}>
            {s.pct}
          </p>
          <div>
            <h3 className="text-[16px] font-semibold leading-[1.35] m-0" style={{ fontFamily: BODY, color: C.ink }}>
              {s.title}
            </h3>
            {s.date && (
              <p className="text-[12px] font-medium uppercase tracking-[.16em] mt-[6px]" style={{ color: C.muted }}>
                {s.date}
              </p>
            )}
            <p className="text-[14.5px] mt-2 max-w-[60ch]" style={{ color: C.muted }}>
              {s.body}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
