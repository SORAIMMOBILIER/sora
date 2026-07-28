import { describe, test, expect } from "bun:test"
import { DateTime } from "luxon"
import { nextWebinar, webinarLabel, webinarDateISO } from "./webinar"

const ZONE = "Europe/Paris"

describe("nextWebinar", () => {
  test("lundi -> mardi de la même semaine", () => {
    const now = DateTime.fromISO("2026-08-03T10:00:00", { zone: ZONE }) // lundi
    const result = nextWebinar(now)
    expect(result.toISODate()).toBe("2026-08-04")
    expect(result.hour).toBe(18)
  })

  test("mardi 17h59 -> le mardi du jour même (pas encore basculé)", () => {
    const now = DateTime.fromISO("2026-08-04T17:59:00", { zone: ZONE }) // mardi
    const result = nextWebinar(now)
    expect(result.toISODate()).toBe("2026-08-04")
  })

  test("mardi 18h01 -> bascule sur le mardi suivant", () => {
    const now = DateTime.fromISO("2026-08-04T18:01:00", { zone: ZONE }) // mardi
    const result = nextWebinar(now)
    expect(result.toISODate()).toBe("2026-08-11")
  })

  test("mercredi -> mardi suivant", () => {
    const now = DateTime.fromISO("2026-08-05T10:00:00", { zone: ZONE }) // mercredi
    const result = nextWebinar(now)
    expect(result.toISODate()).toBe("2026-08-11")
  })

  test("dimanche -> mardi de la semaine suivante (dans 2 jours)", () => {
    const now = DateTime.fromISO("2026-08-09T10:00:00", { zone: ZONE }) // dimanche
    const result = nextWebinar(now)
    expect(result.toISODate()).toBe("2026-08-11")
  })
})

describe("webinarLabel", () => {
  test("formate en français", () => {
    const d = DateTime.fromISO("2026-08-04T18:00:00", { zone: ZONE })
    expect(webinarLabel(d)).toBe("mardi 4 août à 18h")
  })
})

describe("webinarDateISO", () => {
  test("retourne une date ISO", () => {
    const d = DateTime.fromISO("2026-08-04T18:00:00", { zone: ZONE })
    expect(webinarDateISO(d)).toBe("2026-08-04")
  })
})
