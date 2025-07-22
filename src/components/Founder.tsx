import React from "react";

interface FounderProps {
  name: string;
  title: string;
  description: string;
  credentials: string[];
  photo: string;
  lang?: "es" | "de";
}

const Founder: React.FC<FounderProps> = ({
  name,
  title,
  description,
  credentials,
  photo,
  lang = "es",
}) => {
  return (
    <div className="mb-4">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Photo Section */}
          <div className="relative">
            <div className="aspect-square lg:aspect-auto lg:h-full relative overflow-hidden">
              <img
                src={photo}
                alt={name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:hidden"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">{name}</h3>
              <p className="text-xl text-blue-600 font-semibold mb-4">
                {title}
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed mb-8 text-lg">
              {description}
            </p>

            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 mb-4">
                {lang === "de" ? "Qualifikationen:" : "Credenciales:"}
              </h4>
              {credentials.map((credential, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-600">{credential}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Founder;
