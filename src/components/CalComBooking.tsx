import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

import type { ConsultationData } from "../utils/consultation";

export interface CalComBookingProps {
  lang: "es" | "de";
  translations?: any;
  consultationData?: ConsultationData | null;
}



export default function CalComBooking({
  lang,
  translations,
  consultationData,
}: CalComBookingProps) {
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

  // Links hardcoded según el idioma
  const calLink =
    lang === "de" ? "argentatreuhand/beratung" : "argentatreuhand/consulta";

  const title = consultationData?.title || "";
  const description = consultationData?.description || "";
  const price = consultationData?.price;


  return (
    <div className="w-full max-w-7xl mt-2 mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 px-4">
        <div className="text-center md:text-left flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        {price && (
          <div className="bg-white border border-slate-200 shadow-sm rounded-3xl px-8 py-5 flex flex-col items-center justify-center min-w-[160px] animate-in fade-in slide-in-from-right-4 duration-700">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
              {lang === "de" ? "Preis" : "Precio"}
            </span>
            <span className="text-3xl font-black text-slate-900">{price}</span>
          </div>
        )}

      </div>

      <div className="rounded-3xl shadow-2xl shadow-blue-100/50 overflow-hidden mt-4 border border-slate-100 bg-white">
        <Cal
          key={lang}
          calLink={calLink}
          style={{ width: "100%", overflow: "auto" }}
          config={{ layout: "month_view" }}
        />
      </div>
    </div>
  );
}


