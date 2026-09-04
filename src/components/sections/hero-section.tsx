"use client"
import { useEffect, useRef } from "react"
import Link from "@/components/localized-link"
import { gsap } from "gsap"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const t = useTranslations("Home.Hero")
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-word", { yPercent: 110, duration: 1.3, stagger: 0.1, ease: "expo.out", delay: 0.6 })
      gsap.from(".hero-fade", { opacity: 0, y: 12, duration: 1, stagger: 0.12, delay: 1.2, ease: "expo.out" })
      gsap.fromTo(".hero-video", { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 2, ease: "expo.out" })
    }, ref)

    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative h-screen min-h-[720px] w-full overflow-hidden bg-background">
      {/* Video background */}
      <div className="hero-video absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/villa-exterior.webp"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/dfpaw573r/video/upload/v1783086460/Header_site_u1i0j9.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-primary/55" />
      </div>

      {/* Center title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 z-10 text-center">
        <h1 className="font-serif font-medium text-background leading-[0.92]">
          <span className="clip-word"><span className="hero-word block" style={{ fontSize: "clamp(40px,6vw,104px)" }}>{t("titleLine1")}</span></span>
          <span className="clip-word"><span className="hero-word block" style={{ fontSize: "clamp(40px,6vw,104px)" }}>{t("titleLine2")}</span></span>
        </h1>
        <p className="hero-fade text-background/85 mt-8 max-w-2xl text-lg md:text-xl leading-relaxed">
          {t("subtitle")}
        </p>
        <div className="hero-fade mt-12 flex flex-col sm:flex-row items-center gap-4">
          <Button asChild variant="inverse">
            <Link href="/contact">{t("ctaPrimary")}</Link>
          </Button>
          <Button asChild variant="outline-inverse">
            <Link href="/seseh">{t("ctaSecondary")}</Link>
          </Button>
        </div>
        <p className="hero-fade mt-6 max-w-xl text-sm md:text-base leading-relaxed text-background/70">
          {t("trust")}
        </p>
      </div>

    </section>
  )
}
