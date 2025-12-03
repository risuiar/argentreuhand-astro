import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

interface CalComBookingProps {
  lang: "es" | "de";
  translations?: any;
}

export default function CalComBooking({ lang, translations }: CalComBookingProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#2563eb" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  // Get the Cal.com link from environment variable or use default
  const baseCalLink = import.meta.env.PUBLIC_CALCOM_LINK || "usuario-de-tu-amiga/consulta-30min";
  const calLink = `${baseCalLink}?lang=${lang}`;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {lang === "de" ? "Beratung buchen" : "Reservar Consulta"}
        </h1>
        <p className="text-lg text-gray-600">
          {lang === "de" 
            ? "Wählen Sie einen passenden Termin für Ihre Beratung"
            : "Selecciona una fecha y hora conveniente para tu consulta"}
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <Cal
          calLink={calLink}
          style={{ width: "100%", height: "700px", overflow: "auto" }}
          config={{ layout: "month_view" }}
        />
      </div>
    </div>
  );
}

