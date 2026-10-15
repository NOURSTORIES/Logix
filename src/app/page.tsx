
export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b1020",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        padding: "40px 24px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "56px", color: "#60a5fa" }}>
        LOGIX
      </h1>

      <h2>We Build Digital Experiences</h2>

      <p style={{ fontSize: "18px", lineHeight: 1.8 }}>
        نصمم ونطور مواقع ويب احترافية تساعد أعمالك على النمو.
      </p>

      <a
        href="mailto:hello@logix.com"
        style={{
          display: "inline-block",
          marginTop: "24px",
          padding: "14px 28px",
          background: "#2563eb",
          color: "#ffffff",
          borderRadius: "10px",
          textDecoration: "none",
        }}
      >
        اطلب موقعك الآن
      </a>
    </main>
  );
}
