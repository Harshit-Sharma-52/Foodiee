# Fast-Food

A fully responsive, single-page restaurant website for a pure vegetarian Indian fast-food experience. Built with vanilla HTML, CSS and JavaScript — no frameworks, no build step.

## Screenshot

![Fast-Food website preview](readme-images/desktop.png)

## Features

- Responsive layout for mobile, tablet and desktop
- Hero section with a themed image and prominent call-to-action
- Promo cards, food menu with category filters and prices
- About, testimonials, offers/banners and blog sections
- Book-a-table modal with validation (10-digit phone, required fields)
- Home-delivery ordering modal with live cart, quantity selectors and order summary
- Geo-location fetch for delivery address
- WhatsApp order/booking integration (`wa.me`)
- Order receipt modal with automatic PDF download (html2pdf.js)
- Back-to-top button and smooth scrolling
- Custom favicon and preloaded hero assets

## Tech Stack

- **HTML5** – semantic markup
- **CSS3** – custom properties (design tokens), grid & flexbox, media queries
- **Vanilla JavaScript** – DOM interaction, cart state, geolocation, PDF generation
- **Google Fonts** – Open Sans (variable, weights 300–800), Shadows Into Light
- **Ionicons** – icon set
- **html2pdf.js** – receipt PDF generation

## Project Structure

```
.
├── index.html              # Main page markup
├── favicon.svg             # Site favicon
├── assets/
│   ├── css/style.css       # All styles (theme tokens, sections, media queries)
│   ├── js/script.js        # Cart, modals, geolocation, receipt & PDF logic
│   └── images/             # Hero, menu, promo, banner and icon assets
├── style-guide.md          # Original design style guide
└── README.md
```

## Getting Started

The site is fully static — no installation or build required.

1. Clone the repository:
   ```bash
   git clone https://github.com/Harshit-Sharma-52/Foodiee.git
   cd Foodiee
   ```
2. Open `index.html` in a browser, or serve it locally:
   ```bash
   # Python
   python -m http.server 8000
   # or Node
   npx serve .
   ```
   Then visit `http://localhost:8000`.

## Customization

- **Theme colors** – edit the color variables in the `:root` block of `assets/css/style.css`.
- **Fonts** – the Open Sans weights are loaded via the Google Fonts `<link>` in `index.html`.
- **Menu & prices** – update the delivery items in the home-delivery modal within `index.html`.
- **WhatsApp number** – replace `919760971378` in `assets/js/script.js`.
- **Contact details** – update phone, email and address in the footer of `index.html`.

## External Dependencies

The site loads the following resources from CDNs, so an internet connection is required on first load:

- Google Fonts (`fonts.googleapis.com`)
- Ionicons (`unpkg.com`)
- html2pdf.js (`cdnjs.cloudflare.com`)

## License

This project is built and maintained by Harshit Sharma.
