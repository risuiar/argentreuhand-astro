export default function EnvTest() {
  return (
    <div style={{ padding: 20, background: "#eee", color: "#222" }}>
      VITE_CMS_URL: {import.meta.env.PUBLIC_CMS_URL || "NO DEFINIDA"}
    </div>
  );
}
