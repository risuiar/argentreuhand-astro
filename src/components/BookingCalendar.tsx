import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Check,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingData {
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface BookingCalendarProps {
  lang: "es" | "de";
  translations: any;
}

export default function BookingCalendar({
  lang,
  translations,
}: BookingCalendarProps) {
  const t = translations;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [step, setStep] = useState<
    "date" | "time" | "form" | "payment" | "confirmation"
  >("date");
  const [bookingData, setBookingData] = useState<BookingData>({
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    service: t.booking.form.services.general,
    message: "",
  });

  // Generate available time slots
  const generateTimeSlots = (date: string): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startHour = 9;
    const endHour = 18;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        // Simulate some unavailable slots
        const available = Math.random() > 0.3;
        slots.push({ time, available });
      }
    }

    return slots;
  };

  // Get calendar days for current month
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const today = new Date();

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const isCurrentMonth = date.getMonth() === month;
      const isPast = date < today;
      const isToday = date.toDateString() === today.toDateString();
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;

      days.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        isPast,
        isToday,
        isWeekend,
        isAvailable: isCurrentMonth && !isPast && !isWeekend,
        dateString: date.toISOString().split("T")[0],
      });
    }

    return days;
  };

  const handleDateSelect = (dateString: string) => {
    setSelectedDate(dateString);
    setBookingData((prev) => ({ ...prev, date: dateString }));
    setStep("time");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setBookingData((prev) => ({ ...prev, time }));
    setStep("form");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmation");
  };

  const handlePayment = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Payment processed for booking:", bookingData);
      setStep("confirmation");
    } catch (error) {
      console.error("Payment failed:", error);
      alert(
        lang === "de"
          ? t.booking.confirmation.errorPayment_de
          : t.booking.confirmation.errorPayment
      );
    }
  };

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === "de" ? "de-DE" : "es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const monthNames =
    lang === "de"
      ? [
          "Januar",
          "Februar",
          "März",
          "April",
          "Mai",
          "Juni",
          "Juli",
          "August",
          "September",
          "Oktober",
          "November",
          "Dezember",
        ]
      : [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ];

  const weekDays =
    lang === "de"
      ? ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
      : ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  if (step === "confirmation") {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          {lang === "de"
            ? t.booking.confirmation.title_de
            : t.booking.confirmation.title}
        </h2>
        <p className="text-slate-600 mb-6">
          {lang === "de"
            ? t.booking.confirmation.message_de
            : t.booking.confirmation.message}
        </p>
        <div className="bg-slate-50 rounded-xl p-6 mb-6 text-left">
          <h3 className="font-semibold text-slate-900 mb-4">
            {lang === "de"
              ? t.booking.confirmation.details_de
              : t.booking.confirmation.details}
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">
                {lang === "de"
                  ? t.booking.confirmation.date_de
                  : t.booking.confirmation.date}
              </span>{" "}
              {formatDate(bookingData.date)}
            </p>
            <p>
              <span className="font-medium">
                {lang === "de"
                  ? t.booking.confirmation.time_de
                  : t.booking.confirmation.time}
              </span>{" "}
              {bookingData.time}
            </p>
            <p>
              <span className="font-medium">
                {lang === "de"
                  ? t.booking.confirmation.service_de
                  : t.booking.confirmation.service}
              </span>{" "}
              {bookingData.service}
            </p>
            <p>
              <span className="font-medium">
                {lang === "de"
                  ? t.booking.confirmation.name_de
                  : t.booking.confirmation.name}
              </span>{" "}
              {bookingData.name}
            </p>
            <p>
              <span className="font-medium">
                {lang === "de"
                  ? t.booking.confirmation.email_de
                  : t.booking.confirmation.email}
              </span>{" "}
              {bookingData.email}
            </p>
            <p>
              <span className="font-medium">
                {lang === "de"
                  ? t.booking.confirmation.price_de
                  : t.booking.confirmation.price}
              </span>{" "}
              {lang === "de"
                ? t.booking.confirmation.free_de
                : t.booking.confirmation.free}
            </p>
          </div>
        </div>
        <Button
          onClick={() => {
            setStep("date");
            setSelectedDate("");
            setSelectedTime("");
            setBookingData({
              date: "",
              time: "",
              name: "",
              email: "",
              phone: "",
              service: t.booking.form.services.general,
              message: "",
            });
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {lang === "de"
            ? t.booking.confirmation.bookAnother_de
            : t.booking.confirmation.bookAnother}
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t.booking.title}
          </h1>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            {t.booking.subtitle}
          </p>
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/30">
            <span className="text-2xl font-bold mr-3">{t.booking.price}</span>
            <div className="text-left">
              <div className="text-sm opacity-90 whitespace-pre-line">
                {t.booking.duration}
              </div>
              <div className="text-xs opacity-75 mt-1">
                {lang === "de"
                  ? t.booking.confirmation.additional_de
                  : t.booking.confirmation.additional}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Calendar Section */}
        <div className="lg:w-1/2 p-6 border-r border-slate-200">
          {step === "date" && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  {t.booking.steps.selectDate}
                </h3>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentDate(
                        new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth() - 1
                        )
                      )
                    }
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="font-medium text-slate-900 min-w-[120px] text-center">
                    {monthNames[currentDate.getMonth()]}{" "}
                    {currentDate.getFullYear()}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentDate(
                        new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth() + 1
                        )
                      )
                    }
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-4">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-slate-600 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {getCalendarDays().map((day, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      day.isAvailable && handleDateSelect(day.dateString)
                    }
                    disabled={!day.isAvailable}
                    className={`
                      aspect-square flex items-center justify-center text-sm rounded-lg transition-all
                      ${
                        day.isCurrentMonth ? "text-slate-900" : "text-slate-400"
                      }
                      ${
                        day.isToday
                          ? "bg-blue-100 text-blue-600 font-semibold"
                          : ""
                      }
                      ${
                        day.isAvailable
                          ? "hover:bg-blue-50 cursor-pointer"
                          : "cursor-not-allowed opacity-50"
                      }
                      ${
                        selectedDate === day.dateString
                          ? "bg-blue-600 text-white"
                          : ""
                      }
                    `}
                  >
                    {day.day}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === "time" && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {t.booking.steps.selectTime}
                  </h3>
                  <p className="text-slate-600">{formatDate(selectedDate)}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setStep("date")}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  {lang === "de"
                    ? t.booking.confirmation.changeDate_de
                    : t.booking.confirmation.changeDate}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {generateTimeSlots(selectedDate).map((slot, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      slot.available && handleTimeSelect(slot.time)
                    }
                    disabled={!slot.available}
                    className={`
                      p-3 rounded-lg border text-sm font-medium transition-all
                      ${
                        slot.available
                          ? "border-slate-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
                          : "border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed"
                      }
                      ${
                        selectedTime === slot.time
                          ? "border-blue-600 bg-blue-600 text-white"
                          : ""
                      }
                    `}
                  >
                    <Clock className="h-4 w-4 inline mr-2" />
                    {slot.time}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === "form" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {t.booking.steps.confirmBooking}
                  </h3>
                  <p className="text-slate-600">
                    {formatDate(selectedDate)}{" "}
                    {lang === "de"
                      ? t.booking.confirmation.at_de
                      : t.booking.confirmation.at}{" "}
                    {selectedTime} -{" "}
                    {lang === "de"
                      ? t.booking.confirmation.free_de
                      : t.booking.confirmation.free}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setStep("time")}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  {lang === "de"
                    ? t.booking.confirmation.changeTime_de
                    : t.booking.confirmation.changeTime}
                </Button>
              </div>
            </div>
          )}

          {step === "payment" && (
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {t.booking.steps.payment}
                </h3>
                <p className="text-slate-600">
                  {formatDate(selectedDate)}{" "}
                  {lang === "de"
                    ? t.booking.confirmation.at_de
                    : t.booking.confirmation.at}{" "}
                  {selectedTime}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-slate-900 mb-4">
                  {lang === "de"
                    ? t.booking.confirmation.summary_de
                    : t.booking.confirmation.summary}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>
                      {lang === "de"
                        ? t.booking.confirmation.professional_de
                        : t.booking.confirmation.professional}
                    </span>
                    <span>150 CHF</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      {lang === "de"
                        ? t.booking.confirmation.date_de
                        : t.booking.confirmation.date}
                    </span>
                    <span>{formatDate(selectedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      {lang === "de"
                        ? t.booking.confirmation.time_de
                        : t.booking.confirmation.time}
                    </span>
                    <span>{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      {lang === "de"
                        ? t.booking.confirmation.client_de
                        : t.booking.confirmation.client}
                    </span>
                    <span>{bookingData.name}</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>150 CHF</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handlePayment}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  {lang === "de"
                    ? t.booking.confirmation.payStripe_de
                    : t.booking.confirmation.payStripe}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setStep("form")}
                  className="w-full"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  {lang === "de"
                    ? t.booking.confirmation.backToData_de
                    : t.booking.confirmation.backToData}
                </Button>
              </div>

              <p className="text-xs text-slate-500 text-center mt-4">
                {lang === "de"
                  ? t.booking.confirmation.securePayment_de
                  : t.booking.confirmation.securePayment}
              </p>
            </div>
          )}
        </div>

        {/* Form Section */}
        <div className="lg:w-1/2 p-6">
          {step === "form" && (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  {t.booking.form.name} *
                </label>
                <input
                  type="text"
                  required
                  value={bookingData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t.booking.form.placeholders.name}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-2" />
                  {t.booking.form.email} *
                </label>
                <input
                  type="email"
                  required
                  value={bookingData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t.booking.form.placeholders.email}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Phone className="h-4 w-4 inline mr-2" />
                  {t.booking.form.phone} *
                </label>
                <input
                  type="tel"
                  required
                  value={bookingData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t.booking.form.placeholders.phone}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t.booking.form.service}
                </label>
                <select
                  value={bookingData.service}
                  onChange={(e) => handleInputChange("service", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={t.booking.form.services.general}>
                    {t.booking.form.services.general}
                  </option>
                  <option value={t.booking.form.services.taxes}>
                    {t.booking.form.services.taxes}
                  </option>
                  <option value={t.booking.form.services.company}>
                    {t.booking.form.services.company}
                  </option>
                  <option value={t.booking.form.services.planning}>
                    {t.booking.form.services.planning}
                  </option>
                  <option value={t.booking.form.services.accounting}>
                    {t.booking.form.services.accounting}
                  </option>
                  <option value={t.booking.form.services.other}>
                    {t.booking.form.services.other}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <MessageSquare className="h-4 w-4 inline mr-2" />
                  {t.booking.form.message}
                </label>
                <textarea
                  rows={4}
                  value={bookingData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t.booking.form.placeholders.message}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg"
              >
                {t.booking.form.continue}
              </Button>

              <p className="text-xs text-slate-500 text-center">
                {t.booking.form.disclaimer}
              </p>
            </form>
          )}

          {(step === "date" || step === "time") && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">
                  {t.booking.includes.title}
                </h4>
                <ul className="space-y-3 text-sm text-blue-800">
                  {t.booking.includes.items.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-blue-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-blue-900">
                      {lang === "de"
                        ? t.booking.confirmation.price_de
                        : t.booking.confirmation.price}
                    </span>
                    <span className="text-xl font-bold text-blue-900">
                      150 CHF
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                <h4 className="font-semibold text-emerald-900 mb-3">
                  {t.booking.guarantee.title}
                </h4>
                <p className="text-sm text-emerald-800 mb-3">
                  {t.booking.guarantee.description}
                </p>
                <div className="flex items-center text-sm text-emerald-800">
                  <Check className="h-4 w-4 mr-2 text-emerald-600" />
                  {t.booking.guarantee.period}
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-3">
                  {t.booking.info.title}
                </h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  {t.booking.info.items.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
