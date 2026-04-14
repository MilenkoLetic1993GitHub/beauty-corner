<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <link
            rel="preload"
            as="image"
            href="/images/studio/studio_2_mobile.webp"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com">

        <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Cormorant+Garamond:wght@400;500;600;700&family=Great+Vibes&display=swap"
        />

        <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Cormorant+Garamond:wght@400;500;600;700&family=Great+Vibes&display=swap"
            rel="stylesheet"
        />
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>Beauty Corner Graz – Nagelstudio</title>

        <link rel="icon" type="image/webp" sizes="32x32" href="/images/logo/logo.webp">
        <link rel="icon" type="image/webp" sizes="16x16" href="/images/logo/logo.webp">
        <link rel="apple-touch-icon" href="/images/logo/logo.webp">

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
