export default function BatikBanner() {
  return (
    <div className="w-full bg-bg relative">
      <div
        className="w-full h-[28px] md:h-[36px] opacity-[0.65]"
        style={{
	          backgroundImage: "url(/batik-pattern.webp?v=4)",
          backgroundRepeat: "repeat",
          backgroundSize: "220px",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
    </div>
  )
}
