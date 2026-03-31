import { useEffect, useMemo, useState } from "react";

type Service = {
    id: number;
    title: string;
    short_description?: string | null;
};

type PriceItem = {
    id: number;
    name: string;
    description?: string | null;
    price?: string | number | null;
    duration_minutes?: number | null;
};

type PriceCategory = {
    id: number;
    name: string;
    items?: PriceItem[];
};

type Props = {
    services?: Service[];
    priceCategories?: PriceCategory[];
};

function formatPrice(price: string | number | null | undefined) {
    if (price === null || price === undefined || price === "") return "-";

    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice)) return `${price}`;

    return `€${numericPrice.toFixed(2)}`;
}

/**
 * Put all images inside:
 * public/images/beauty-corner/
 */
const ASSET_BASE = "/images/nail-house";

const assets = {
    heroBackground: `${ASSET_BASE}/1000201324.jpg`,
    aboutImage: `${ASSET_BASE}/1000201947.jpg`,
    studioImage1: `${ASSET_BASE}/1000201341.jpg`,
    studioImage2: `${ASSET_BASE}/1000201338.jpg`,
    studioImage3: `${ASSET_BASE}/1000201327.jpg`,
    studioImage4: `${ASSET_BASE}/1000201317.jpg`,
    logoImage: `${ASSET_BASE}/1000201947.jpg`,
};

const galleryImages = [
    `${ASSET_BASE}/1000201969.png`,
    `${ASSET_BASE}/1000201960.png`,
    `${ASSET_BASE}/1000201975.png`,
    `${ASSET_BASE}/1000201954.png`,
    `${ASSET_BASE}/1000201963.png`,
    `${ASSET_BASE}/1000201972.png`,
    `${ASSET_BASE}/1000201966.png`,
    `${ASSET_BASE}/1000201978.png`,
];

const defaultServices: Service[] = [
    {
        id: 1,
        title: "Maniküre",
        short_description: "Saubere, elegante und gepflegte Nägel für jeden Tag.",
    },
    {
        id: 2,
        title: "Nageldesign",
        short_description: "Von soft nude bis kreativ und modern – individuell abgestimmt.",
    },
    {
        id: 3,
        title: "French Look",
        short_description: "Zeitlos, feminin und hochwertig mit perfektem Finish.",
    },
    {
        id: 4,
        title: "Studio Experience",
        short_description: "Ruhige Atmosphäre, schöne Details und ein stilvoller Besuch.",
    },
];

const defaultPriceCategories: PriceCategory[] = [
    {
        id: 1,
        name: "Beliebte Behandlungen",
        items: [
            { id: 11, name: "Basic Maniküre", duration_minutes: 45, price: 35 },
            { id: 12, name: "Naturnagelverstärkung", duration_minutes: 60, price: 49 },
            { id: 13, name: "Neumodellage", duration_minutes: 90, price: 69 },
            { id: 14, name: "French / Design", duration_minutes: 75, price: 59 },
        ],
    },
    {
        id: 2,
        name: "Extras",
        items: [
            { id: 21, name: "Babyboomer / Ombre", duration_minutes: 75, price: 59 },
            { id: 22, name: "Individuelles Nail Art", duration_minutes: 20, price: 10 },
            { id: 23, name: "Auffüllen", duration_minutes: 75, price: 52 },
        ],
    },
];

function FontStyles() {
    return (
        <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Cormorant+Garamond:wght@400;500;600;700&family=Great+Vibes&display=swap');

      .font-display {
        font-family: 'Cormorant Garamond', serif;
      }

      .font-script {
        font-family: 'Great Vibes', cursive;
      }

      .font-clean {
        font-family: 'Montserrat', sans-serif;
      }
    `}</style>
    );
}

function HeadAssets() {
    useEffect(() => {
        if (typeof document === "undefined") return;

        document.title = "Beauty Corner";

        let favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
        if (!favicon) {
            favicon = document.createElement("link");
            favicon.rel = "icon";
            document.head.appendChild(favicon);
        }

        favicon.href = assets.logoImage;
    }, []);

    return null;
}

function BrandLogo({ className = "" }: { className?: string }) {
    return <img src={assets.logoImage} alt="Beauty Corner logo" className={className} />;
}

function SectionHeading({
                            eyebrow,
                            title,
                            description,
                            align = "left",
                        }: {
    eyebrow?: string;
    title: string;
    description?: string;
    align?: "left" | "center";
}) {
    return (
        <div className={`space-y-4 ${align === "center" ? "text-center" : "text-left"}`}>
            {eyebrow ? (
                <p className="font-script text-4xl text-[#d8bea5] md:text-5xl">{eyebrow}</p>
            ) : null}

            <h2 className="font-display text-4xl leading-[0.95] text-stone-900 md:text-6xl">
                {title}
            </h2>

            {description ? (
                <p
                    className={`font-clean text-base leading-8 text-stone-600 ${
                        align === "center" ? "mx-auto max-w-3xl" : "max-w-2xl"
                    }`}
                >
                    {description}
                </p>
            ) : null}
        </div>
    );
}

function PrimaryButton({
                           children,
                           dark = false,
                       }: {
    children: React.ReactNode;
    dark?: boolean;
}) {
    return (
        <button
            className={`font-clean rounded-none border px-8 py-4 text-[12px] uppercase tracking-[0.28em] transition ${
                dark
                    ? "border-white/30 text-white hover:border-[#d8bea5] hover:text-[#d8bea5]"
                    : "border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white"
            }`}
        >
            {children}
        </button>
    );
}

function NavLink({ children }: { children: React.ReactNode }) {
    return (
        <a
            href="#"
            className="font-clean cursor-pointer text-sm tracking-[0.08em] text-white/90 transition hover:text-[#d8bea5]"
        >
            {children}
        </a>
    );
}

function ImageCard({
                       src,
                       alt,
                       className = "",
                   }: {
    src: string;
    alt: string;
    className?: string;
}) {
    return (
        <img
            src={src}
            alt={alt}
            className={`h-full w-full object-cover ${className}`}
            loading="lazy"
        />
    );
}

export default function Home({
                                 services = defaultServices,
                                 priceCategories = defaultPriceCategories,
                             }: Props) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const selectedImage = useMemo(() => {
        if (selectedImageIndex === null) return null;
        return galleryImages[selectedImageIndex] ?? null;
    }, [selectedImageIndex]);

    const showPrevImage = () => {
        if (selectedImageIndex === null) return;
        setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
    };

    const showNextImage = () => {
        if (selectedImageIndex === null) return;
        setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (selectedImageIndex === null) return;

            if (event.key === "Escape") setSelectedImageIndex(null);
            if (event.key === "ArrowLeft") showPrevImage();
            if (event.key === "ArrowRight") showNextImage();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedImageIndex]);

    return (
        <div className="font-clean flex min-h-screen flex-col bg-[#f6f0eb] text-stone-900">
            <FontStyles />
            <HeadAssets />

            {selectedImage ? (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 md:p-6"
                    onClick={() => setSelectedImageIndex(null)}
                >
                    <button
                        className="absolute right-5 top-4 text-4xl text-white/80 transition hover:text-white"
                        onClick={() => setSelectedImageIndex(null)}
                        aria-label="Close gallery image"
                    >
                        ×
                    </button>

                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-5xl text-white/75 transition hover:text-white md:left-8"
                        onClick={(e) => {
                            e.stopPropagation();
                            showPrevImage();
                        }}
                        aria-label="Previous image"
                    >
                        ‹
                    </button>

                    <img
                        src={selectedImage}
                        alt="Gallery preview"
                        className="max-h-[92vh] max-w-[92vw] object-contain shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />

                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl text-white/75 transition hover:text-white md:right-8"
                        onClick={(e) => {
                            e.stopPropagation();
                            showNextImage();
                        }}
                        aria-label="Next image"
                    >
                        ›
                    </button>
                </div>
            ) : null}

            <header className="sticky top-0 z-50 border-b border-white/10 bg-black text-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
                    <div className="flex items-center">
                        <BrandLogo className="h-20 w-auto object-contain" />
                    </div>

                    <nav className="hidden items-center gap-8 lg:flex">
                        <NavLink>Milenko test stuff</NavLink>
                        <NavLink>Preise</NavLink>
                        <NavLink>Über uns</NavLink>
                        <NavLink>Galerie</NavLink>
                        <NavLink>Kontakt</NavLink>
                        <NavLink>Kunden Login</NavLink>
                    </nav>

                    <div className="hidden items-center gap-6 lg:flex">
            <span className="font-clean text-sm tracking-[0.06em] text-white/70">
              +43 (0) 676 5504044
            </span>
                        <PrimaryButton dark>Terminbuchung</PrimaryButton>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <section className="relative isolate overflow-hidden bg-black text-white">
                    <div className="absolute inset-0">
                        <img
                            src={assets.heroBackground}
                            alt="Beauty Corner hero background"
                            className="h-full w-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-black/35" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/25 to-black/45" />
                    </div>

                    <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-center justify-center px-6 py-24 text-center lg:px-10">
                        <div className="max-w-4xl">
                            <p className="font-script text-5xl text-[#d8bea5] md:text-7xl">
                                Dein Beauty Corner in
                            </p>

                            <h1 className="font-display mt-2 text-7xl uppercase leading-none tracking-[0.08em] text-white md:text-[8.5rem]">
                                Graz
                            </h1>

                            <p className="font-clean mx-auto mt-8 max-w-2xl text-base leading-8 tracking-[0.01em] text-white/80 md:text-lg">
                                Elegante Nageldesigns, modernes Studio-Ambiente und eine stilvolle
                                Beauty-Experience für Kundinnen, die gepflegte Details und hochwertige
                                Ergebnisse lieben.
                            </p>

                            <div className="mt-12 flex justify-center">
                                <PrimaryButton dark>Jetzt online Termin buchen</PrimaryButton>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                        {services.map((service) => (
                            <div key={service.id} className="rounded-[2rem] bg-[#efe4da] p-8 text-center shadow-sm">
                                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-stone-300 bg-[#f7f1ec] text-2xl">
                                    ✦
                                </div>
                                <h3 className="font-display text-4xl leading-none">{service.title}</h3>
                                <p className="font-clean mt-4 text-base leading-7 text-stone-600">
                                    {service.short_description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-[#efe4da] py-20 lg:py-28">
                    <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
                        <div className="overflow-hidden shadow-xl">
                            <ImageCard src={assets.aboutImage} alt="Beauty Corner portrait" className="max-h-[760px]" />
                        </div>

                        <div className="space-y-8">
                            <SectionHeading
                                eyebrow="Über uns"
                                title="Persönlich, stilvoll und mit viel Liebe zum Detail"
                                description="Ein modernes Beauty-Studio in Graz mit Fokus auf saubere Arbeit, schöne Formen und elegante Ergebnisse. Hier treffen ruhige Atmosphäre und sorgfältiges Nageldesign aufeinander."
                            />

                            <p className="font-clean max-w-2xl text-base leading-8 text-stone-600">
                                Von soft nude und klassischem French bis zu kreativen saisonalen Looks:
                                Jede Behandlung soll nicht nur schön aussehen, sondern sich auch hochwertig anfühlen.
                            </p>

                            <PrimaryButton>Mehr entdecken</PrimaryButton>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
                    <SectionHeading
                        eyebrow="Galerie"
                        title="Ausgewählte Arbeiten aus dem Studio"
                        description="Natürliche Styles, klassische French Looks und kreative Designs – ausgewählt aus Ihren echten Arbeiten für einen hochwertigen, modernen Auftritt."
                        align="center"
                    />

                    <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {galleryImages.map((image, index) => (
                            <button
                                key={image}
                                type="button"
                                className="group relative block overflow-hidden bg-transparent text-left"
                                onClick={() => setSelectedImageIndex(index)}
                            >
                                <ImageCard
                                    src={image}
                                    alt={`Nail work ${index + 1}`}
                                    className="aspect-[4/5] w-full transition duration-500 group-hover:scale-[1.03]"
                                />
                                <div className="pointer-events-none absolute inset-0 ring-1 ring-black/6" />
                            </button>
                        ))}
                    </div>
                </section>

                <section className="bg-black py-20 text-white lg:py-28">
                    <div className="mx-auto max-w-7xl px-6 lg:px-10">
                        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                            <div className="space-y-8">
                                <SectionHeading
                                    eyebrow="Studio"
                                    title="Eine ruhige, elegante Atmosphäre mitten in Graz"
                                    description="Die echten Interior-Bilder zeigen den Stil des Studios: hell, sauber, hochwertig und einladend. Genau dieser Eindruck soll die Website transportieren."
                                />
                                <PrimaryButton dark>Termin anfragen</PrimaryButton>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="overflow-hidden bg-white/5">
                                    <ImageCard src={assets.studioImage1} alt="Studio waiting area" className="aspect-[4/5]" />
                                </div>
                                <div className="overflow-hidden bg-white/5">
                                    <ImageCard src={assets.studioImage2} alt="Studio mirror" className="aspect-[4/5]" />
                                </div>
                                <div className="overflow-hidden bg-white/5">
                                    <ImageCard src={assets.studioImage3} alt="Studio details" className="aspect-[4/5]" />
                                </div>
                                <div className="overflow-hidden bg-white/5">
                                    <ImageCard src={assets.studioImage4} alt="Studio coffee corner" className="aspect-[4/5]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-[#efe4da] py-20 lg:py-28">
                    <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
                        <div className="space-y-8">
                            <SectionHeading
                                eyebrow="Öffnungszeiten"
                                title="Schönheit mit Ruhe, Sorgfalt und Stil"
                                description="Genießen Sie ein modernes Studioerlebnis in eleganter Atmosphäre. Kleine Details, hochwertige Produkte und ein ruhiges Ambiente machen jeden Termin besonders."
                            />
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="rounded-[2rem] bg-white p-8 shadow-sm">
                                    <p className="font-display text-3xl">Öffnungszeiten</p>
                                    <p className="mt-4 leading-8 text-stone-600">Di.–Fr. 09:00–19:00 Uhr</p>
                                </div>

                                <div className="rounded-[2rem] bg-white p-8 shadow-sm">
                                    <p className="font-display text-3xl">Standort</p>
                                    <p className="mt-4 leading-8 text-stone-600">Graz, stilvolles Beauty Studio</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-stone-200">
                            <h3 className="font-display text-4xl">Beliebte Behandlungen</h3>
                            <div className="mt-6 space-y-6">
                                {priceCategories.flatMap((category) => category.items ?? []).map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-start justify-between gap-6 border-b border-stone-200 pb-4 last:border-b-0 last:pb-0"
                                    >
                                        <div>
                                            <p className="font-clean font-medium tracking-[0.01em]">{item.name}</p>
                                            <p className="font-clean text-sm text-stone-500">
                                                {item.duration_minutes ? `${item.duration_minutes} min` : ""}
                                                {item.description ? ` • ${item.description}` : ""}
                                            </p>
                                        </div>
                                        <div className="font-clean whitespace-nowrap text-lg font-semibold">
                                            {formatPrice(item.price)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="relative overflow-hidden bg-black py-20 text-white">
                <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
                    <div className="absolute left-1/2 top-8 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-white/10" />
                    <div className="absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-white/10" />
                    <div className="absolute left-1/2 top-32 h-[320px] w-[320px] -translate-x-1/2 rounded-full border border-white/10" />
                </div>

                <div className="relative w-full px-6 lg:px-10">
                    <div className="flex flex-col items-center text-center">
                        <div>
                            <BrandLogo className="mx-auto h-28 w-auto object-contain" />
                        </div>

                        <p className="font-clean mt-8 max-w-2xl text-[17px] leading-8 text-white/70">
                            Verwöhnen Sie Ihre Nägel im Beauty Corner Studio – Schönheit beginnt
                            mit perfekt gepflegten Händen und fabelhaften Designs.
                        </p>

                        <div className="font-clean mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[14px] text-white/75">
                            <a href="#" className="cursor-pointer transition hover:text-[#d8bea5]">FAQ</a>
                            <a href="#" className="cursor-pointer transition hover:text-[#d8bea5]">Kontakt</a>
                            <a href="#" className="cursor-pointer transition hover:text-[#d8bea5]">Impressum</a>
                            <a href="#" className="cursor-pointer transition hover:text-[#d8bea5]">Datenschutz</a>
                            <a href="#" className="cursor-pointer transition hover:text-[#d8bea5]">Cookie-Richtlinie (EU)</a>
                            <a href="#" className="cursor-pointer transition hover:text-[#d8bea5]">Instagram</a>
                        </div>

                        <div className="mt-12 flex items-center gap-8 text-[#d8bea5]">
                            <a href="#" aria-label="Facebook" className="cursor-pointer text-xl transition hover:scale-110 hover:text-white">
                                f
                            </a>
                            <a href="#" aria-label="Instagram" className="cursor-pointer text-xl transition hover:scale-110 hover:text-white">
                                ◎
                            </a>
                        </div>

                        <div className="relative left-1/2 mt-14 h-px w-screen max-w-none -translate-x-1/2 bg-white/10" />

                        <p className="font-clean mt-8 text-sm tracking-[0.06em] text-white/55">
                            © All Rights Reserved - 2025
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
