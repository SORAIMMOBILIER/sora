import { readFile } from "fs/promises"
import { join } from "path"

const PLANS_DIR = join(process.cwd(), "public", "plans")

export async function loadVillaPlan(planKey: string, floor: "rdc" | "etage"): Promise<string | null> {
  try {
    const raw = await readFile(join(PLANS_DIR, `${planKey}-${floor}.svg`), "utf8")
    return raw.trim()
  } catch {
    return null
  }
}
