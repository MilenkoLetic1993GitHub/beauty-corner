import React, { useCallback, useEffect, useMemo, useState } from 'react';

const assets = {
    heroBackground: `/images/studio/studio_3.webp`,
    aboutImage: `/images/logo/logo.webp`,
    studioImage1: `/images/studio/studio_6.webp`,
    studioImage2: `/images/studio/studio_5.webp`,
    studioImage3: `/images/studio/studio_4.webp`,
    studioImage4: `/images/studio/studio_1.webp`,
    logoImage: `/images/logo/logo.webp`,
};

const galleryImages = [
    `/images/gallery/gallery_1.webp`,
    `/images/gallery/gallery_2.webp`,
    `/images/gallery/gallery_3.webp`,
    `/images/gallery/gallery_4.webp`,
    `/images/gallery/gallery_5.webp`,
    `/images/gallery/gallery_6.webp`,
    `/images/gallery/gallery_7.webp`,
    `/images/gallery/gallery_8.webp`,
    `/images/gallery/gallery_9.webp`,
    `/images/gallery/gallery_10.webp`,
    `/images/gallery/gallery_11.webp`,
    `/images/gallery/gallery_12.webp`,
    `/images/gallery/gallery_13.webp`,
    `/images/gallery/gallery_14.webp`,
    `/images/gallery/gallery_15.webp`,
];

const bookingHref = 'about:blank';
const initialGalleryCount = 8;

function FontStyles() {
    return (
        <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Cormorant+Garamond:wght@400;500;600;700&family=Great+Vibes&display=swap');

      html {
        scroll-behavior: smooth;
      }

      .font-display {
        font-family: 'Cormorant Garamond', serif;
      }

      .font-script {
        font-family: 'Great Vibes', cursive;
      }

      .font-clean {
        font-family: 'Montserrat', sans-serif;
      }

      .scroll-offset {
        scroll-margin-top: 120px;
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
     }

     .animate-fadeIn {
        animation: fadeIn 0.3s ease-out forwards;
     }

     .animate-slideUp {
        animation: slideUp 0.4s ease-out forwards;
     }
    `}</style>
    );
}

function HeadAssets() {
    useEffect(() => {
        if (typeof document === 'undefined') {
            return;
        }

        document.title = 'Beauty Corner';

        let favicon = document.querySelector(
            "link[rel='icon']",
        ) as HTMLLinkElement | null;

        if (!favicon) {
            favicon = document.createElement('link');
            favicon.rel = 'icon';
            document.head.appendChild(favicon);
        }

        favicon.href = assets.logoImage;

        // ✅ CANONICAL
        let canonical = document.querySelector(
            "link[rel='canonical']",
        ) as HTMLLinkElement | null;

        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }

        canonical.href = 'https://darjabeautygraz.at/';
    }, []);

    return null;
}

function BrandLogo({ className = '' }: { className?: string }) {
    return (
        <img
            src={assets.logoImage}
            alt="Beauty Corner logo"
            decoding="async"
            className={className}
        />
    );
}

function SectionHeading({
    eyebrow,
    title,
    description,
    align = 'left',
}: {
    eyebrow?: string;
    title: string;
    description?: string;
    align?: 'left' | 'center';
}) {
    return (
        <div
            className={`space-y-4 ${align === 'center' ? 'text-center' : 'text-left'}`}
        >
            {eyebrow ? (
                <p className="font-script text-4xl text-[#d8bea5] md:text-5xl">
                    {eyebrow}
                </p>
            ) : null}

            <h2 className="font-display text-4xl leading-[0.95] text-stone-900 md:text-6xl">
                {title}
            </h2>

            {description ? (
                <p
                    className={`font-clean text-base leading-8 text-stone-600 ${
                        align === 'center' ? 'mx-auto max-w-3xl' : 'max-w-2xl'
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
    href,
    newTab = false,
}: {
    children: React.ReactNode;
    dark?: boolean;
    href?: string;
    newTab?: boolean;
}) {
    if (href) {
        return (
            <a
                href={href}
                target={newTab ? '_blank' : undefined}
                rel={newTab ? 'noopener noreferrer' : undefined}
                className={`font-clean inline-block rounded-none border px-8 py-4 text-[12px] tracking-[0.28em] uppercase transition ${
                    dark
                        ? 'border-white/30 text-white hover:border-[#d8bea5] hover:bg-white/5 hover:text-[#d8bea5]'
                        : 'border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white'
                }`}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            className={`font-clean rounded-none border px-8 py-4 text-[12px] tracking-[0.28em] uppercase transition ${
                dark
                    ? 'border-white/30 text-white hover:border-[#d8bea5] hover:bg-white/5 hover:text-[#d8bea5]'
                    : 'border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white'
            }`}
        >
            {children}
        </button>
    );
}

function NavLink({
    children,
    href,
}: {
    children: React.ReactNode;
    href: string;
}) {
    return (
        <a
            href={href}
            className="group font-clean relative cursor-pointer text-sm tracking-[0.08em] text-white/85 transition"
        >
            <span className="transition group-hover:text-[#d8bea5]">
                {children}
            </span>

            <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#d8bea5] transition-all duration-300 group-hover:w-full" />
        </a>
    );
}

function ImageCard({
    src,
    alt,
    className = '',
    priority = false,
}: {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
}) {
    return (
        <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            className={`h-full w-full object-cover ${className}`}
        />
    );
}

export default function Home() {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
        null,
    );
    const [showAllGalleryImages, setShowAllGalleryImages] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const visibleGalleryImages = useMemo(() => {
        if (showAllGalleryImages) {
            return galleryImages;
        }

        return galleryImages.slice(0, initialGalleryCount);
    }, [showAllGalleryImages]);

    const selectedImage = useMemo(() => {
        if (selectedImageIndex === null) {
            return null;
        }

        return galleryImages[selectedImageIndex] ?? null;
    }, [selectedImageIndex]);

    const showPrevImage = useCallback(() => {
        if (selectedImageIndex === null) {
            return;
        }

        setSelectedImageIndex(
            (selectedImageIndex - 1 + galleryImages.length) %
                galleryImages.length,
        );
    }, [selectedImageIndex]);

    const showNextImage = useCallback(() => {
        if (selectedImageIndex === null) {
            return;
        }

        setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }, [selectedImageIndex]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (selectedImageIndex === null) {
                return;
            }

            if (event.key === 'Escape') {
                setSelectedImageIndex(null);
            }

            if (event.key === 'ArrowLeft') {
                showPrevImage();
            }

            if (event.key === 'ArrowRight') {
                showNextImage();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex, showPrevImage, showNextImage]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';

        return () => (document.body.style.overflow = '');
    }, [mobileMenuOpen]);

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
                        className="absolute top-4 right-5 text-4xl text-white/80 transition hover:text-white"
                        onClick={() => setSelectedImageIndex(null)}
                        aria-label="Close gallery image"
                    >
                        ×
                    </button>

                    <button
                        className="absolute top-1/2 left-4 -translate-y-1/2 text-5xl text-white/75 transition hover:text-white md:left-8"
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
                        loading="eager"
                        decoding="async"
                        className="max-h-[92vh] max-w-[92vw] object-contain shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />

                    <button
                        className="absolute top-1/2 right-4 -translate-y-1/2 text-5xl text-white/75 transition hover:text-white md:right-8"
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

            <header className="relative sticky top-0 z-50 border-b border-white/5 bg-[url('/images/layout/layout.webp')] bg-cover bg-center text-white">
                <div className="absolute inset-0 bg-black/45" />

                <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
                    <div className="flex items-center gap-4">
                        <a href="#home" aria-label="Go to home">
                            <BrandLogo className="h-28 w-auto object-contain brightness-110 contrast-110" />
                        </a>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="relative h-6 w-8 lg:hidden"
                        >
                            <span
                                className={`absolute top-0 left-0 h-[2px] w-full bg-white transition-all duration-300 ${
                                    mobileMenuOpen ? 'top-2.5 rotate-45' : ''
                                }`}
                            />
                            <span
                                className={`absolute top-2.5 left-0 h-[2px] w-full bg-white transition-all duration-300 ${
                                    mobileMenuOpen ? 'opacity-0' : ''
                                }`}
                            />
                            <span
                                className={`absolute bottom-0 left-0 h-[2px] w-full bg-white transition-all duration-300 ${
                                    mobileMenuOpen ? 'bottom-2.5 -rotate-45' : ''
                                }`}
                            />
                        </button>
                    </div>

                    <nav className="hidden items-center gap-8 lg:flex">
                        <NavLink href="#home">Home</NavLink>
                        <NavLink href="#services">Leistungen</NavLink>
                        <NavLink href="#prices">Preise</NavLink>
                        <NavLink href="#about">Über mich</NavLink>
                        <NavLink href="#gallery">Galerie</NavLink>
                        <NavLink href="#studio">Studio</NavLink>
                        <NavLink href="#contact">Kontakt</NavLink>
                    </nav>

                    <div className="hidden items-center gap-6 lg:flex">
                        <span className="font-clean text-sm tracking-[0.06em] text-white/70">
                            +43 (0) 676 5504044
                        </span>
                        <PrimaryButton dark href={bookingHref} newTab>
                            Terminbuchung
                        </PrimaryButton>
                    </div>
                </div>
                <div
                    className={`fixed inset-0 z-[100] transition-all duration-300 ${
                        mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                >
                    {/* BACKDROP */}
                    <div
                        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
                            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* MENU WRAPPER (IMPORTANT) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* MENU BOX */}
                        <div
                            className={`relative flex flex-col items-center gap-8 text-white text-2xl font-light tracking-wide transition-all duration-300 ${
                                mobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                            }`}
                            onClick={(e) => e.stopPropagation()} // 🔥 KEY FIX
                        >
                            {/* CLOSE BUTTON */}
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="absolute -top-16 right-0 text-2xl text-white/70 transition hover:text-white"
                            >
                                ✕
                            </button>

                            {/* MENU ITEMS */}
                            {[
                                ['Home', '#home'],
                                ['Leistungen', '#services'],
                                ['Preise', '#prices'],
                                ['Über mich', '#about'],
                                ['Galerie', '#gallery'],
                                ['Studio', '#studio'],
                                ['Kontakt', '#contact'],
                            ].map(([label, href], i) => (
                                <a
                                    key={href}
                                    href={href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="animate-slideUp opacity-0"
                                    style={{ animationDelay: `${i * 0.08}s` }}
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <section
                    id="home"
                    className="scroll-offset relative h-[90vh] min-h-[600px] w-full overflow-hidden"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('/images/studio/studio_2.webp')",
                            backgroundPosition: 'center right',
                        }}
                    />

                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

                    <div className="relative z-10 flex h-full items-center">
                        <div className="mx-auto flex max-w-7xl justify-start px-6 lg:px-10">
                            <div className="max-w-xl text-left text-white">
                                <h1
                                    className="text-5xl leading-tight font-semibold md:text-6xl"
                                    style={{
                                        textShadow:
                                            '0 2px 10px rgba(0,0,0,0.5)',
                                    }}
                                >
                                    Beauty Corner
                                </h1>

                                <p className="mt-5 max-w-2xl text-lg leading-relaxed whitespace-nowrap text-white/90 md:text-xl md:whitespace-normal lg:text-2xl">
                                    Professionelle Nagelpflege & hochwertige
                                    Beauty-Behandlungen in Graz
                                </p>

                                <div className="mt-10 flex flex-wrap gap-4">
                                    <a
                                        href={bookingHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-gray-200"
                                    >
                                        Termin buchen
                                    </a>

                                    <a
                                        href="#services"
                                        className="rounded-full border border-white px-6 py-3 text-white transition hover:bg-white hover:text-black"
                                    >
                                        Leistungen ansehen
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="services"
                    className="scroll-offset border-t border-stone-200/40 bg-white py-20 lg:py-28"
                >
                    <div className="mx-auto max-w-7xl px-6 lg:px-10">
                        <SectionHeading
                            eyebrow="Leistungen"
                            title="Natürlich. Elegant. Gepflegt."
                            description="Im Beauty Corner arbeite ich ausschließlich mit moderner Geltechnik – ganz ohne Acryl. Jede Behandlung wird individuell auf dich und deine Naturnägel abgestimmt."
                            align="center"
                        />

                        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                            <div className="rounded-[2rem] bg-[#faf8f6] p-8 shadow-sm transition duration-300 hover:shadow-md">
                                <h3 className="font-display text-3xl">
                                    Naturnagelverstärkung
                                </h3>
                                <p className="mt-4 leading-7 text-stone-600">
                                    Stärkung deiner natürlichen Nägel mit
                                    hochwertigem Gel – für einen gepflegten und
                                    langlebigen Look.
                                </p>
                            </div>

                            <div className="rounded-[2rem] bg-[#faf8f6] p-8 shadow-sm transition duration-300 hover:shadow-md">
                                <h3 className="font-display text-3xl">
                                    Gel-Modellage
                                </h3>
                                <p className="mt-4 leading-7 text-stone-600">
                                    Verlängerung mit Gel für elegante, stabile
                                    Nägel – individuell geformt und perfekt
                                    angepasst.
                                </p>
                            </div>

                            <div className="rounded-[2rem] bg-[#faf8f6] p-8 shadow-sm transition duration-300 hover:shadow-md">
                                <h3 className="font-display text-3xl">
                                    Refill / Auffüllen
                                </h3>
                                <p className="mt-4 leading-7 text-stone-600">
                                    Regelmäßiges Auffüllen für dauerhaft schöne
                                    Nägel – sauber, präzise und natürlich
                                    wirkend.
                                </p>
                            </div>

                            <div className="rounded-[2rem] bg-[#faf8f6] p-8 shadow-sm transition duration-300 hover:shadow-md">
                                <h3 className="font-display text-3xl">
                                    Maniküre
                                </h3>
                                <p className="mt-4 leading-7 text-stone-600">
                                    Klassische Pflege für gesunde, gepflegte
                                    Hände – die perfekte Basis für jedes Design.
                                </p>
                            </div>

                            <div className="rounded-[2rem] bg-[#faf8f6] p-8 shadow-sm transition duration-300 hover:shadow-md">
                                <h3 className="font-display text-3xl">
                                    Nail Art & Designs
                                </h3>
                                <p className="mt-4 leading-7 text-stone-600">
                                    Individuelle Designs von elegant bis kreativ
                                    – abgestimmt auf deinen Stil und Anlass.
                                </p>
                            </div>

                            <div className="rounded-[2rem] border border-stone-200 bg-[#f5f2ee] p-8 shadow-sm transition duration-300 hover:shadow-md">
                                <h3 className="font-display text-3xl">
                                    Warum Beauty Corner?
                                </h3>

                                <ul className="mt-6 space-y-3 text-stone-600">
                                    <li>✓ HEMA-freie Produkte</li>
                                    <li>✓ Schonende Geltechnik ohne Acryl</li>
                                    <li>✓ Höchste Hygiene-Standards</li>
                                    <li>✓ Individuelle Beratung</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="prices"
                    className="scroll-offset border-t border-stone-300/40 bg-[#f4eee8] py-24"
                >
                    <div className="mx-auto max-w-3xl px-6">
                        <SectionHeading
                            eyebrow="Preise"
                            title="Transparente Preise"
                            description="Hochwertige Behandlungen mit klaren und fairen Preisen."
                            align="center"
                        />

                        <div className="mt-12 divide-y rounded-3xl bg-white shadow-md ring-1 ring-stone-200">
                            {[
                                {
                                    title: 'Naturnagelverstärkung',
                                    subtitle:
                                        'Natürlich verstärkte Nägel mit langlebigem Gel',
                                    prices: ['Kurz — ab 45€', 'Lang — ab 60€'],
                                },
                                {
                                    title: 'Gel-Modellage',
                                    subtitle:
                                        'Verlängerung mit Gel für elegante Nägel',
                                    prices: ['Kurz — ab 65€', 'Lang — ab 75€'],
                                },
                                {
                                    title: 'Shellac',
                                    subtitle: '',
                                    prices: ['ab 35€'],
                                },
                                {
                                    title: 'Refill / Auffüllen',
                                    subtitle: '',
                                    prices: ['ab 60€'],
                                },
                                {
                                    title: 'Maniküre',
                                    subtitle: '',
                                    prices: ['inklusive'],
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between gap-6 p-7 transition hover:bg-stone-50"
                                >
                                    <div>
                                        <h3 className="font-display text-xl">
                                            {item.title}
                                        </h3>

                                        {item.subtitle ? (
                                            <p className="mt-1 text-sm text-stone-500">
                                                {item.subtitle}
                                            </p>
                                        ) : null}

                                        <div className="mt-3 space-y-1 text-sm text-stone-600">
                                            {item.prices.map((p, idx) => (
                                                <div key={idx}>{p}</div>
                                            ))}
                                        </div>
                                    </div>

                                    <a
                                        href={bookingHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cursor-pointer rounded-full border border-stone-300 bg-white px-6 py-2 text-xs tracking-widest uppercase transition-all duration-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white"
                                    >
                                        Buchen
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    id="about"
                    className="scroll-offset border-t border-stone-200/40 bg-white py-24"
                >
                    <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
                        <div className="relative">
                            <img
                                src="/images/profile/profile.webp"
                                alt="Beauty Corner"
                                className="h-auto w-full rounded-[2rem] object-cover shadow-md"
                            />
                        </div>

                        <div className="max-w-xl">
                            <span className="text-sm tracking-[0.2em] text-stone-400 uppercase">
                                Über mich
                            </span>

                            <h2 className="font-display mt-4 text-4xl leading-tight md:text-5xl">
                                Schönheit beginnt mit gepflegten Details
                            </h2>

                            <p className="mt-6 leading-7 text-stone-600">
                                Mein Name ist Darja und ich habe mich auf
                                hochwertige Nagelpflege und moderne Geltechniken
                                spezialisiert. Mein Fokus liegt auf natürlichen,
                                eleganten Ergebnissen, die perfekt zu deinem
                                Stil passen.
                            </p>

                            <p className="mt-4 leading-7 text-stone-600">
                                In meinem Studio arbeite ich ausschließlich mit
                                sorgfältig ausgewählten, HEMA-freien Produkten
                                und lege größten Wert auf Hygiene, Präzision und
                                persönliche Beratung.
                            </p>

                            <div className="mt-8">
                                <a
                                    href={bookingHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block rounded-full bg-stone-900 px-8 py-3 text-sm tracking-wide text-white transition hover:bg-black"
                                >
                                    Termin buchen
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="gallery"
                    className="scroll-offset border-t border-stone-200/40 bg-[#f6f1eb] py-20 lg:py-28"
                >
                    <div className="mx-auto max-w-7xl px-6 lg:px-10">
                        <SectionHeading
                            eyebrow="Galerie"
                            title="Ausgewählte Arbeiten aus dem Studio"
                            description="Natürliche Styles, klassische French Looks und kreative Designs – ausgewählt aus Ihren echten Arbeiten für einen hochwertigen, modernen Auftritt."
                            align="center"
                        />

                        <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-4">
                            {visibleGalleryImages.map((image) => {
                                const originalIndex =
                                    galleryImages.indexOf(image);

                                return (
                                    <button
                                        key={image}
                                        type="button"
                                        className="group relative block overflow-hidden rounded-2xl shadow-sm transition duration-300 hover:shadow-md"
                                        onClick={() =>
                                            setSelectedImageIndex(originalIndex)
                                        }
                                    >
                                        <ImageCard
                                            src={image}
                                            alt={`Nail work ${originalIndex + 1}`}
                                            className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
                                        />

                                        <div className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                                        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/6" />
                                    </button>
                                );
                            })}
                        </div>

                        {!showAllGalleryImages &&
                        galleryImages.length > initialGalleryCount ? (
                            <div className="mt-10 flex justify-center">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowAllGalleryImages(true)
                                    }
                                    className="cursor-pointer rounded-full border border-stone-300 bg-white px-6 py-2 text-xs tracking-widest uppercase transition-all duration-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white"
                                >
                                    Mehr anzeigen
                                </button>
                            </div>
                        ) : null}
                    </div>
                </section>

                <section
                    id="studio"
                    className="scroll-offset border-t border-stone-200/40 bg-white py-20 lg:py-28"
                >
                    <div className="mx-auto max-w-7xl px-6 lg:px-10">
                        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                            <div className="max-w-xl space-y-8">
                                <SectionHeading
                                    eyebrow="Studio"
                                    title="Eine ruhige, elegante Atmosphäre mitten in Graz"
                                    description="Die echten Interior-Bilder zeigen den Stil des Studios: hell, sauber, hochwertig und einladend. Genau dieser Eindruck soll die Website transportieren."
                                />

                                <PrimaryButton href={bookingHref} newTab>
                                    Termin anfragen
                                </PrimaryButton>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                {[
                                    assets.studioImage1,
                                    assets.studioImage2,
                                    assets.studioImage3,
                                    assets.studioImage4,
                                ].map((img, i) => (
                                    <div
                                        key={i}
                                        className="group relative overflow-hidden rounded-2xl shadow-sm transition duration-300 hover:shadow-md"
                                    >
                                        <ImageCard
                                            src={img}
                                            alt="Studio"
                                            className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer
                id="contact"
                className="scroll-offset relative overflow-hidden bg-[url('/images/layout/layout.webp')] bg-cover bg-center py-20 text-white"
            >
                <div className="absolute inset-0 bg-black/45" />

                <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-10">
                    <BrandLogo className="mx-auto h-24 w-auto object-contain" />

                    <p className="mx-auto mt-8 max-w-xl leading-7 text-white/70">
                        Verwöhnen Sie Ihre Nägel im Beauty Corner Studio –
                        Schönheit beginnt mit perfekt gepflegten Händen und
                        eleganten Designs.
                    </p>

                    <div className="mt-10 flex flex-col items-center justify-center gap-3 text-white/80">
                        <a
                            href="tel:+436765504044"
                            className="transition hover:text-white"
                        >
                            +43 (0) 676 5504044
                        </a>
                    </div>

                    <div className="mt-10">
                        <a
                            href={bookingHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-full bg-white px-8 py-3 text-sm tracking-wide text-black transition hover:bg-gray-200"
                        >
                            Termin buchen
                        </a>
                    </div>

                    <div className="mt-10 flex justify-center gap-8 text-[#d8bea5]">
                        <a
                            href="#"
                            className="text-xl transition hover:scale-110 hover:text-white"
                        >
                            f
                        </a>
                        <a
                            href="#"
                            className="text-xl transition hover:scale-110 hover:text-white"
                        >
                            ◎
                        </a>
                    </div>

                    <div className="mt-12 h-px w-full bg-white/10" />

                    <p className="mt-6 text-sm text-white/50">
                        © {new Date().getFullYear()} Beauty Corner. All rights
                        reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
