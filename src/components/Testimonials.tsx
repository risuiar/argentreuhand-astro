import { Star, Quote } from "lucide-react";
import { buildSrcset, getImageData, type StrapiImage } from "../utils/imageHelpers";

interface TestimonialItem {
  id: number;
  name: string;
  position: string;
  quote: string;
  photo: StrapiImage | null;
}

interface TestimonialsData {
  id: number;
  title: string;
  description: string;
  testimonialItem: TestimonialItem[];
}

interface TestimonialsProps {
  lang: "es" | "de";
  testimonialsData: TestimonialsData;
}

export default function Testimonials({
  lang,
  testimonialsData,
}: TestimonialsProps) {
  return (
    <section className="py-20 bg-brand-blue/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {testimonialsData.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {testimonialsData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.testimonialItem.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 relative"
            >
              <div className="absolute top-6 right-6 w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center">
                <Quote className="h-6 w-6 text-brand-blue" />
              </div>

              <div className="flex items-center mb-6">
                {testimonial.photo ? (() => {
                  const photoData = getImageData(testimonial.photo);
                  if (!photoData) return null;
                  const srcset = buildSrcset(testimonial.photo);
                  return (
                    <img
                      src={photoData.url}
                      srcSet={srcset}
                      sizes="64px"
                      alt={photoData.alternativeText || testimonial.name}
                      width={photoData.width}
                      height={photoData.height}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                      loading="lazy"
                      decoding="async"
                    />
                  );
                })() : (
                  <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mr-4">
                    <span className="text-brand-blue font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-slate-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-slate-600 text-sm">
                    {testimonial.position}
                  </p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed italic">
                {testimonial.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
