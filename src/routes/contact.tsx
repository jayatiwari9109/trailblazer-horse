import {
  createFileRoute,
} from "@tanstack/react-router";
import {
  useState,
  type FormEvent,
} from "react";
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";

import { SiteLayout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title: "Contact — Horse Trails",
      },
      {
        name: "description",
        content:
          "Get in touch with our concierge, ranch partnerships, or press team.",
      },
    ],
  }),
  component: Contact,
});

const contactDetails = [
  {
    icon: Phone,
    title: "Call us",
    value: "+1 (415) 555-0140",
    href: "tel:+14155550140",
  },
  {
    icon: Mail,
    title: "Email",
    value: "hello@horsetrails.co",
    href: "mailto:hello@horsetrails.co",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+1 (415) 555-0140",
    href: "https://wa.me/14155550140",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "42 Bridle Lane, Aspen CO 81611",
    href: "https://www.google.com/maps/search/?api=1&query=42+Bridle+Lane+Aspen+CO+81611",
  },
  {
    icon: Clock,
    title: "Hours",
    value: "Mon–Sat, 08:00–20:00 MT",
  },
];

function Contact() {
  const [submitted, setSubmitted] =
    useState(false);

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const firstName = String(
      formData.get("firstName") ?? "",
    ).trim();

    const lastName = String(
      formData.get("lastName") ?? "",
    ).trim();

    const phone = String(
      formData.get("phone") ?? "",
    ).replace(/\D/g, "");

    const firstNameInput =
      form.querySelector<HTMLInputElement>(
        'input[name="firstName"]',
      );

    const lastNameInput =
      form.querySelector<HTMLInputElement>(
        'input[name="lastName"]',
      );

    const phoneInput =
      form.querySelector<HTMLInputElement>(
        'input[name="phone"]',
      );

    const namePattern =
      /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$/;

    if (!namePattern.test(firstName)) {
      firstNameInput?.setCustomValidity(
        "Please enter a valid first name using letters only.",
      );

      firstNameInput?.reportValidity();
      return;
    }

    firstNameInput?.setCustomValidity("");

    if (!namePattern.test(lastName)) {
      lastNameInput?.setCustomValidity(
        "Please enter a valid last name using letters only.",
      );

      lastNameInput?.reportValidity();
      return;
    }

    lastNameInput?.setCustomValidity("");

    if (
      phone.length < 7 ||
      phone.length > 15
    ) {
      phoneInput?.setCustomValidity(
        "Please enter a valid phone number using 7 to 15 digits.",
      );

      phoneInput?.reportValidity();
      return;
    }

    phoneInput?.setCustomValidity("");

    setSubmitted(true);
    form.reset();
  };

  return (
    <SiteLayout>
      <section className="container-wide">
        <SectionHeading
          eyebrow="Say hello"
          title="We'd love to hear from you"
          subtitle="Concierge, partnerships, press — we usually reply within 24 hours."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Contact details */}
          <div className="space-y-4">
            {contactDetails.map(
              (contact, index) => {
                const CardContent = (
                  <>
                    <div className="gradient-forest grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-forest-foreground shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <contact.icon className="h-5 w-5" />
                    </div>

                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                        {contact.title}
                      </div>

                      <div className="mt-1 font-medium text-forest transition-colors group-hover:text-saddle">
                        {contact.value}
                      </div>
                    </div>
                  </>
                );

                return (
                  <motion.div
                    key={contact.title}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.06,
                    }}
                    whileHover={{
                      y: -4,
                    }}
                  >
                    {contact.href ? (
                      <a
                        href={contact.href}
                        target={
                          contact.title ===
                            "WhatsApp" ||
                          contact.title ===
                            "Office"
                            ? "_blank"
                            : undefined
                        }
                        rel="noreferrer"
                        className="glass group flex items-center gap-4 rounded-2xl border border-border/60 p-5 transition-shadow duration-300 hover:shadow-lg"
                      >
                        {CardContent}
                      </a>
                    ) : (
                      <div className="glass group flex items-center gap-4 rounded-2xl border border-border/60 p-5 transition-shadow duration-300 hover:shadow-lg">
                        {CardContent}
                      </div>
                    )}
                  </motion.div>
                );
              },
            )}

            {/* Google map */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="glass group overflow-hidden rounded-3xl border border-border/60 shadow-elegant"
            >
              <iframe
                title="Horse Trails office location"
                src="https://www.google.com/maps?q=42%20Bridle%20Lane%20Aspen%20CO%2081611&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full border-0 transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </motion.div>
          </div>

          {/* Contact form */}
          <motion.div
            initial={{
              opacity: 0,
              x: 25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            {!submitted ? (
              <form
                className="glass space-y-5 rounded-3xl border border-border/60 p-6 shadow-elegant md:p-8"
                onSubmit={handleSubmit}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saddle">
                    Contact form
                  </p>

                  <h2 className="mt-2 font-display text-2xl font-bold text-forest md:text-3xl">
                    Tell us how we can help
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Fill in your details and our team
                    will contact you shortly.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* First name */}
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First name{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </Label>

                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      inputMode="text"
                      autoComplete="given-name"
                      minLength={2}
                      maxLength={50}
                      pattern="[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}"
                      placeholder="Elena"
                      required
                      className="h-11 rounded-xl bg-card"
                      onInput={(event) => {
                        const input =
                          event.currentTarget;

                        input.value =
                          input.value
                            .replace(
                              /[^A-Za-zÀ-ÖØ-öø-ÿ' -]/g,
                              "",
                            )
                            .replace(
                              /\s{2,}/g,
                              " ",
                            )
                            .slice(0, 50);

                        input.setCustomValidity(
                          "",
                        );
                      }}
                      onInvalid={(event) => {
                        event.currentTarget.setCustomValidity(
                          "Please enter your first name using letters only.",
                        );
                      }}
                    />

                    <p className="text-xs text-muted-foreground">
                      Numbers are not allowed.
                    </p>
                  </div>

                  {/* Last name */}
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last name{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </Label>

                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      inputMode="text"
                      autoComplete="family-name"
                      minLength={2}
                      maxLength={50}
                      pattern="[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}"
                      placeholder="Marchetti"
                      required
                      className="h-11 rounded-xl bg-card"
                      onInput={(event) => {
                        const input =
                          event.currentTarget;

                        input.value =
                          input.value
                            .replace(
                              /[^A-Za-zÀ-ÖØ-öø-ÿ' -]/g,
                              "",
                            )
                            .replace(
                              /\s{2,}/g,
                              " ",
                            )
                            .slice(0, 50);

                        input.setCustomValidity(
                          "",
                        );
                      }}
                      onInvalid={(event) => {
                        event.currentTarget.setCustomValidity(
                          "Please enter your last name using letters only.",
                        );
                      }}
                    />

                    <p className="text-xs text-muted-foreground">
                      Numbers are not allowed.
                    </p>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </Label>

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@email.com"
                      required
                      className="h-11 rounded-xl bg-card"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone number{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </Label>

                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      minLength={7}
                      maxLength={15}
                      pattern="[0-9]{7,15}"
                      placeholder="Enter phone number"
                      required
                      className="h-11 rounded-xl bg-card"
                      onInput={(event) => {
                        const input =
                          event.currentTarget;

                        input.value =
                          input.value
                            .replace(/\D/g, "")
                            .slice(0, 15);

                        input.setCustomValidity(
                          "",
                        );
                      }}
                      onInvalid={(event) => {
                        event.currentTarget.setCustomValidity(
                          "Please enter a valid phone number using 7 to 15 digits.",
                        );
                      }}
                    />

                    <p className="text-xs text-muted-foreground">
                      Only numbers are allowed.
                    </p>
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject">
                    Subject{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </Label>

                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    maxLength={100}
                    placeholder="How can we help?"
                    required
                    className="h-11 rounded-xl bg-card"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">
                    Message{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </Label>

                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    minLength={10}
                    maxLength={1000}
                    placeholder="Tell us about your dream ride..."
                    required
                    className="resize-none rounded-xl bg-card"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2 rounded-full bg-forest text-forest-foreground shadow-glow hover:bg-forest/90"
                >
                  <Send className="h-4 w-4" />
                  Send message
                </Button>
              </form>
            ) : (
              <div className="glass flex min-h-[520px] flex-col items-center justify-center rounded-3xl border border-border/60 p-8 text-center shadow-elegant">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 className="h-11 w-11 text-emerald-700" />
                </div>

                <h2 className="mt-6 font-display text-3xl font-bold text-forest">
                  Message sent!
                </h2>

                <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                  Thank you for contacting Horse
                  Trails. Our team will get back to
                  you within 24 hours.
                </p>

                <Button
                  type="button"
                  onClick={() =>
                    setSubmitted(false)
                  }
                  className="mt-7 rounded-full bg-forest px-8 text-forest-foreground hover:bg-forest/90"
                >
                  Send another message
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </SiteLayout>
  );
}