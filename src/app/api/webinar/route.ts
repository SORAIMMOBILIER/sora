import { NextRequest, NextResponse } from "next/server"
import { webinarDateISO } from "../../../../lib/webinar"

const FS_DOMAIN = "sora-team.myfreshworks.com"
const FS_TOKEN = process.env.FRESHSALES_API_KEY!
const AC_URL = process.env.AC_API_URL!
const AC_KEY = process.env.AC_API_KEY!

const FS_LEAD_SOURCE_WEBINAR = 202001095894
// TODO: confirmer le nom interne exact une fois le champ "Date webi" créé manuellement
// dans Freshsales (Réglages > Champs de contact > Nouveau champ > type Date).
const FS_DATE_WEBI_FIELD = "cf_date_webi"
const FS_TAG_WEBI_MARDI = "WEBI du mardi"

// TODO: remplacer par l'ID réel une fois la liste "Webi du mardi" créée manuellement
// dans ActiveCampaign (création bloquée par les permissions de la clé API).
const AC_LIST_ID_WEBI_MARDI = "TODO"
const AC_TAG_ID_WEBI_MARDI = "68" // "Webi du mardi - SSV"
const AC_FIELD_ID_DATE_WEBI = "13"
const AC_TAG_DELAY_MS = 5000

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { firstName, lastName, email, phone } = body

  if (!email || !firstName) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
  }

  const dateWebi = webinarDateISO()
  const results: { freshsales?: string; activecampaign?: string } = {}

  try {
    const fsRes = await fetch(
      `https://${FS_DOMAIN}/crm/sales/api/contacts/upsert`,
      {
        method: "POST",
        headers: {
          Authorization: `Token token=${FS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact: {
            first_name: firstName,
            last_name: lastName || "",
            email,
            mobile_number: phone || "",
            lead_source_id: FS_LEAD_SOURCE_WEBINAR,
            custom_field: {
              [FS_DATE_WEBI_FIELD]: dateWebi,
            },
          },
          unique_identifier: { emails: email },
        }),
      }
    )

    if (fsRes.ok) {
      const fsData = await fsRes.json()
      const contactId = fsData.contact?.id

      if (contactId) {
        await fetch(
          `https://${FS_DOMAIN}/crm/sales/api/contacts/${contactId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Token token=${FS_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contact: { tags: [FS_TAG_WEBI_MARDI] },
            }),
          }
        )
      }
      results.freshsales = "ok"
    } else {
      results.freshsales = "error"
    }
  } catch {
    results.freshsales = "error"
  }

  try {
    const acRes = await fetch(`${AC_URL}/api/3/contact/sync`, {
      method: "POST",
      headers: {
        "Api-Token": AC_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contact: {
          email,
          firstName,
          lastName: lastName || "",
          phone: phone || "",
        },
      }),
    })

    if (acRes.ok) {
      const acData = await acRes.json()
      const contactId = acData.contact?.id

      if (contactId && AC_LIST_ID_WEBI_MARDI !== "TODO") {
        await fetch(`${AC_URL}/api/3/contactLists`, {
          method: "POST",
          headers: {
            "Api-Token": AC_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contactList: { list: AC_LIST_ID_WEBI_MARDI, contact: contactId, status: 1 },
          }),
        })

        await new Promise((resolve) => setTimeout(resolve, AC_TAG_DELAY_MS))

        await fetch(`${AC_URL}/api/3/contactTags`, {
          method: "POST",
          headers: {
            "Api-Token": AC_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contactTag: { contact: contactId, tag: AC_TAG_ID_WEBI_MARDI },
          }),
        })
      }

      if (contactId) {
        await fetch(`${AC_URL}/api/3/fieldValues`, {
          method: "POST",
          headers: {
            "Api-Token": AC_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fieldValue: { contact: contactId, field: AC_FIELD_ID_DATE_WEBI, value: dateWebi },
          }),
        })
      }
      results.activecampaign = "ok"
    } else {
      results.activecampaign = "error"
    }
  } catch {
    results.activecampaign = "error"
  }

  return NextResponse.json({ success: true, results, dateWebi })
}
