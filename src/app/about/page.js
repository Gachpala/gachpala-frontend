import Container from "@/components/container";
import Link from "next/link";
import { arapey, inter, openSans } from "@/lib/fonts";
import { FaLeaf, FaTruck, FaHandshake, FaSeedling } from "react-icons/fa";

const PRINCIPLES = [
  {
    title: "Quiet Quality",
    description:
      "Every plant is selected for health, shape, and seasonal readiness before it reaches your home.",
    icon: FaLeaf,
  },
  {
    title: "Care With Clarity",
    description:
      "Simple guidance, clear after-sales support, and practical advice that helps plants thrive long-term.",
    icon: FaSeedling,
  },
  {
    title: "Reliable Delivery",
    description:
      "Protective packaging and controlled handover keep each order fresh, stable, and ready to settle in.",
    icon: FaTruck,
  },
  {
    title: "Trusted Partnership",
    description:
      "We work closely with respected nurseries and growers to preserve consistency and authenticity.",
    icon: FaHandshake,
  },
];

export default function About() {
  return (
    <main className="bg-[#f6f7f2] text-neutral-900">
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-30 md:pb-26">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(1,191,98,0.2),transparent_38%),radial-gradient(circle_at_80%_10%,rgba(2,106,55,0.18),transparent_42%),linear-gradient(180deg,#f8faf5_0%,#f3f5ee_100%)]" />
        <div className="absolute -right-16 top-14 h-64 w-64 rounded-full border border-[#acd8bf] opacity-60" />
        <div className="absolute -left-20 bottom-8 h-72 w-72 rounded-full border border-[#badfcb] opacity-50" />

        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <p
              className={`${inter.className} mb-5 inline-flex rounded-full border border-[#b7d9c5] bg-white/80 px-5 py-2 text-[11px] uppercase tracking-[0.2em] text-[#187747] backdrop-blur-sm`}
            >
              About GachPala
            </p>
            <h1
              className={`${arapey.className} text-5xl leading-[1.02] text-[#102118] sm:text-6xl md:text-7xl`}
            >
              A refined way to live
              <br className="hidden sm:block" />
              with nature
            </h1>
            <p
              className={`${openSans.className} mx-auto mt-7 max-w-2xl text-base leading-8 text-[#43524a] md:text-lg`}
            >
              GachPala curates plants and botanical essentials for modern homes.
              Every detail, from selection to delivery, is designed to feel
              calm, premium, and effortless.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-5">
            <article className="lg:col-span-3 rounded-3xl border border-[#dce6df] bg-white p-8 shadow-[0_12px_40px_-28px_rgba(16,33,24,0.35)] md:p-10">
              <p
                className={`${inter.className} text-xs uppercase tracking-[0.18em] text-[#2d7d53]`}
              >
                Our Story
              </p>
              <h2
                className={`${inter.className} mt-4 text-2xl font-bold leading-tight text-[#18291f] md:text-4xl`}
              >
                Minimal spaces deserve living elegance.
              </h2>
              <div
                className={`${openSans.className} mt-6 space-y-4 text-[15px] leading-7 text-[#4d5b53] md:text-base`}
              >
                <p>
                  We started with a simple idea: greenery should not feel noisy,
                  complicated, or random. It should feel intentional.
                </p>
                <p>
                  Today we collaborate with trusted growers and nurseries to
                  bring healthy plants, carefully chosen textures, and timeless
                  forms to homes across Bangladesh.
                </p>
                <p>
                  Our aim is not to sell more pieces. It is to help you build a
                  calmer environment that grows better with time.
                </p>
              </div>
            </article>

            <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <article className="rounded-3xl border border-[#dce6df] bg-[linear-gradient(155deg,#ffffff_0%,#edf7f0_100%)] p-7 shadow-[0_12px_36px_-28px_rgba(16,33,24,0.45)]">
                <p
                  className={`${inter.className} text-xs uppercase tracking-[0.16em] text-[#2d7d53]`}
                >
                  Since
                </p>
                <p
                  className={`${inter.className} mt-3 text-4xl font-black text-[#12251a]`}
                >
                  2025
                </p>
                <p
                  className={`${openSans.className} mt-2 text-sm text-[#4b5f54]`}
                >
                  Designing greener, softer, premium living experiences.
                </p>
              </article>

              <article className="rounded-3xl border border-[#dce6df] bg-[#102118] p-7 text-white shadow-[0_16px_40px_-24px_rgba(16,33,24,0.75)]">
                <p
                  className={`${inter.className} text-xs uppercase tracking-[0.16em] text-[#9dd3b4]`}
                >
                  Community
                </p>
                <p className={`${inter.className} mt-3 text-4xl font-black`}>
                  0
                </p>
                <p
                  className={`${openSans.className} mt-2 text-sm leading-6 text-[#d6e7dc]`}
                >
                  Homes served with healthy plants and personalized care.
                </p>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-24">
        <Container>
          <div className="mb-10 md:mb-12">
            <p
              className={`${inter.className} text-xs uppercase tracking-[0.18em] text-[#2d7d53]`}
            >
              What Defines Us
            </p>
            <h2
              className={`${inter.className} mt-3 max-w-2xl text-3xl font-bold leading-tight text-[#17271e] md:text-4xl`}
            >
              A premium standard in every step.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {PRINCIPLES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-3xl border border-[#d7e2db] bg-white p-7 transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_-30px_rgba(16,33,24,0.45)] md:p-8"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#ecf6ef] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f4eb] text-xl text-[#20784b]">
                      <Icon />
                    </div>
                    <h3
                      className={`${inter.className} text-xl font-bold text-[#1a2c22]`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`${openSans.className} mt-3 text-sm leading-7 text-[#51655a] md:text-[15px]`}
                    >
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pb-22 md:pb-28">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-[#d7e4dc] bg-[linear-gradient(120deg,#12261a_0%,#1b3d2a_52%,#26613f_100%)] px-7 py-12 text-white shadow-[0_25px_60px_-35px_rgba(16,33,24,0.8)] md:px-12 md:py-14">
            <div className="absolute -right-14 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full border border-white/25" />
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full border border-white/15" />

            <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <h3
                  className={`${inter.className} text-3xl font-bold leading-tight md:text-4xl`}
                >
                  Bring premium greenery home.
                </h3>
                <p
                  className={`${openSans.className} mt-3 text-sm leading-7 text-[#d4e9db] md:text-base`}
                >
                  Discover curated plants, elevated essentials, and calm design
                  choices made for modern living.
                </p>
              </div>

              <Link
                href="/shop"
                className={`${inter.className} inline-flex items-center rounded-xl bg-white px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#164b2f] transition hover:bg-[#ecf5ef]`}
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
