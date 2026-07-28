import { DateTime } from "luxon"

const ZONE = "Europe/Paris"
const WEEKDAY = 2 // mardi (1=lundi … 7=dimanche)
const HOUR = 18
const GRACE_MIN = 0 // bascule sur le mardi suivant dès 18h00. Passe à 90 pour garder l'affichage pendant le live

/** Prochain mardi 18h (Europe/Paris), bascule une fois l'heure passée */
export function nextWebinar(now: DateTime = DateTime.now()): DateTime {
  now = now.setZone(ZONE)
  let target = now.set({ weekday: WEEKDAY, hour: HOUR, minute: 0, second: 0, millisecond: 0 })
  if (target.plus({ minutes: GRACE_MIN }) <= now) target = target.plus({ weeks: 1 })
  return target
}

export const webinarLabel = (d: DateTime = nextWebinar()): string =>
  d.setLocale("fr").toFormat("cccc d LLLL 'à' HH'h'") // "mardi 4 août à 18h"

export const webinarDateISO = (d: DateTime = nextWebinar()): string | null => d.toISODate() // "2026-08-04"
