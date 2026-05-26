"use client";

export default function OfflinePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        padding: "2rem",
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🌿</div>
      <h1
        style={{
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "#1a1a1a",
          marginBottom: "0.75rem",
        }}
      >
        You&apos;re Offline
      </h1>
      <p
        style={{
          fontSize: "1rem",
          color: "#666",
          maxWidth: "400px",
          lineHeight: 1.6,
          marginBottom: "1.5rem",
        }}
      >
        It looks like you&apos;ve lost your internet connection. Please check
        your network and try again.
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          padding: "0.75rem 2rem",
          backgroundColor: "#00be62",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "1rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "background-color 0.2s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#00a854")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#00be62")}
      >
        Try Again
      </button>
    </div>
  );
}
