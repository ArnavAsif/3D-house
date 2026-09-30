// Decoupled Showroom Product Catalog with Shopify Storefront API Data Structure
// Note: Product metadata is strictly kept outside of 3D geometry meshes.
// Meshes only carry `userData.productId = 'product-XX'`.

export const SHOWROOM_PRODUCTS = [
  {
    id: 'product-01',
    shopifyId: 'gid://shopify/Product/9182301928401',
    handle: 'aura-modern-lounge-chair',
    name: 'Aura Modern Lounge Chair',
    title: 'Aura Modern Lounge Chair',
    vendor: 'Villa Lumina Atelier',
    productType: 'Seating',
    room: 'Living Room',
    displayZone: 'Lounge Seating Zone',
    placementType: 'Furniture Floor Zone',
    price: 499,
    priceRange: {
      minVariantPrice: { amount: '499.00', currencyCode: 'USD' }
    },
    rating: 4.9,
    reviewsCount: 38,
    description: 'A stylish and comfortable sculptural lounge chair with premium upholstery and solid smoked wood legs. Designed for ergonomic comfort and modern luxury aesthetics.',
    dimensions: 'W: 84cm × D: 80cm × H: 76cm',
    materials: 'Textured cream bouclé, kiln-dried FSC birch, brushed brass ferrules',
    clearanceRadiusM: 1.8,
    position: [-3.2, 0.38, 1.4],
    hotspotOffset: [0, 0.85, 0],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/4819203910281',
        name: 'Oatmeal Cream',
        title: 'Oatmeal Cream',
        price: '499.00',
        hex: '#F2EEE5',
        color3: 0xf2eee5,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910282',
        name: 'Saddle Leather',
        title: 'Saddle Leather',
        price: '549.00',
        hex: '#93552E',
        color3: 0x93552e,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910283',
        name: 'Charcoal Velvet',
        title: 'Charcoal Velvet',
        price: '519.00',
        hex: '#2E2F32',
        color3: 0x2e2f32,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910284',
        name: 'Olive Linen',
        title: 'Olive Linen',
        price: '499.00',
        hex: '#5E664E',
        color3: 0x5e664e,
        availableForSale: true
      }
    ],
    details: [
      'High-density foam cushion with down-blend top wrap',
      'Solid hardwood internal frame with lifetime guarantee',
      'Stain-resistant nanotech fabric treatment',
      'Handcrafted in northern Italy'
    ]
  },
  {
    id: 'product-02',
    shopifyId: 'gid://shopify/Product/9182301928402',
    handle: 'koto-travertine-coffee-tables',
    name: 'Koto Dual Travertine Coffee Tables',
    title: 'Koto Dual Travertine Coffee Tables',
    vendor: 'Villa Lumina Atelier',
    productType: 'Tables',
    room: 'Living Room',
    displayZone: 'Central Lounge Centerpiece',
    placementType: 'On Display Table',
    price: 850,
    priceRange: {
      minVariantPrice: { amount: '850.00', currencyCode: 'USD' }
    },
    rating: 4.8,
    reviewsCount: 24,
    description: 'Set of two nesting organic low coffee tables crafted from honed natural beige Roman travertine with softened pill edges and cylindrical pedestals.',
    dimensions: 'Primary: 125×70×28cm | Secondary: 60×60×36cm',
    materials: 'Solid honed Roman Travertine slab',
    clearanceRadiusM: 1.8,
    position: [-5.2, 0.28, 2.4],
    hotspotOffset: [0, 0.55, 0],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/4819203910291',
        name: 'Roman Travertine',
        title: 'Roman Travertine',
        price: '850.00',
        hex: '#DFD6C0',
        color3: 0xdfd6c0,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910292',
        name: 'Carrara White',
        title: 'Carrara White',
        price: '920.00',
        hex: '#EBEBEB',
        color3: 0xebebeb,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910293',
        name: 'Nero Marquina',
        title: 'Nero Marquina',
        price: '950.00',
        hex: '#242426',
        color3: 0x242426,
        availableForSale: true
      }
    ],
    details: [
      'Honed silk-matte finish with protective sealer against stains',
      'Unique natural veining and fossil textures in every piece',
      'Total set weight 72 kg solid stone'
    ]
  },
  {
    id: 'product-03',
    shopifyId: 'gid://shopify/Product/9182301928403',
    handle: 'artisanal-ceramic-vessel-tray',
    name: 'Artisanal Ceramic Vessel & Travertine Tray',
    title: 'Artisanal Ceramic Vessel & Travertine Tray',
    vendor: 'Kihara Pottery Studio',
    productType: 'Decorative Objects',
    room: 'Living Room',
    displayZone: 'Coffee Table Display Area',
    placementType: 'On Display Tables',
    price: 185,
    priceRange: {
      minVariantPrice: { amount: '185.00', currencyCode: 'USD' }
    },
    rating: 4.9,
    reviewsCount: 19,
    description: 'Sculptural hand-thrown decorative ceramic bowl presented atop a solid honed travertine catchall tray. Editorial tabletop styling piece.',
    dimensions: 'Tray: 32×22×2cm | Bowl: Ø16×H:8cm',
    materials: 'Honed Roman Travertine, wheel-thrown stoneware with chalk matte glaze',
    clearanceRadiusM: 1.5,
    position: [-5.3, 0.35, 2.35],
    hotspotOffset: [0, 0.45, 0],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/4819203910301',
        name: 'Chalk White & Travertine',
        title: 'Chalk White & Travertine',
        price: '185.00',
        hex: '#F5F3EE',
        color3: 0xf5f3ee,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910302',
        name: 'Raw Terracotta',
        title: 'Raw Terracotta',
        price: '185.00',
        hex: '#B46B4C',
        color3: 0xb46b4c,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910303',
        name: 'Basalt Charcoal',
        title: 'Basalt Charcoal',
        price: '195.00',
        hex: '#2B2B2D',
        color3: 0x2b2b2d,
        availableForSale: true
      }
    ],
    details: [
      'Hand-thrown on traditional Japanese potter wheel',
      'Water-tight interior for minimal floral ikebana stems',
      'Felt-backed stone tray prevents scratch marks'
    ]
  },
  {
    id: 'product-04',
    shopifyId: 'gid://shopify/Product/9182301928404',
    handle: 'archimede-cantilever-floor-lamp',
    name: 'Archimede Cantilever Arc Floor Lamp',
    title: 'Archimede Cantilever Arc Floor Lamp',
    vendor: 'Lumina Architettura',
    productType: 'Lighting',
    room: 'Living Room',
    displayZone: 'Lounge Reading Corner',
    placementType: 'Architectural Lighting Zone',
    price: 420,
    priceRange: {
      minVariantPrice: { amount: '420.00', currencyCode: 'USD' }
    },
    rating: 4.8,
    reviewsCount: 31,
    description: 'Slender architectural cantilevered arc floor lamp with a brushed champagne brass stem and a heavy cylindrical honed Calacatta marble stabilizing base.',
    dimensions: 'Span: 160cm × Total H: 215cm × Base: Ø36cm',
    materials: 'Solid brushed champagne brass, Calacatta marble base, spun brass dome shade',
    clearanceRadiusM: 1.6,
    position: [-8.2, 1.1, 0.6],
    hotspotOffset: [0, 1.2, 0],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/4819203910311',
        name: 'Brushed Champagne Brass',
        title: 'Brushed Champagne Brass',
        price: '420.00',
        hex: '#C8A462',
        color3: 0xc8a462,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910312',
        name: 'Matte Black Anodized',
        title: 'Matte Black Anodized',
        price: '390.00',
        hex: '#1E1F22',
        color3: 0x1e1f22,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910313',
        name: 'Subtle Bronze',
        title: 'Subtle Bronze',
        price: '440.00',
        hex: '#6E5743',
        color3: 0x6e5743,
        availableForSale: true
      }
    ],
    details: [
      'Full-range integrated touch dimmer with memory brightness function',
      'Warm 2700K high-CRI (95+) LED module producing 1200 Lumens',
      '360-degree swivel shade for direct or diffuse illumination'
    ]
  },
  {
    id: 'product-05',
    shopifyId: 'gid://shopify/Product/9182301928405',
    handle: 'nordic-fluted-media-console',
    name: 'Nordic Fluted Media Credenza',
    title: 'Nordic Fluted Media Credenza',
    vendor: 'Villa Lumina Atelier',
    productType: 'Storage',
    room: 'Living Room',
    displayZone: 'Architectural Media Feature Wall',
    placementType: 'Built-in Wall Sections',
    price: 1250,
    priceRange: {
      minVariantPrice: { amount: '1250.00', currencyCode: 'USD' }
    },
    rating: 4.9,
    reviewsCount: 22,
    description: 'Architectural low-slung entertainment credenza featuring acoustic fluted oak tambour slats, concealed cable raceways, and a bronze shadow reveal line.',
    dimensions: 'W: 260cm × D: 44cm × H: 48cm',
    materials: 'Smoked American Walnut & White Oak tambour, subtle bronze reveal',
    clearanceRadiusM: 2.2,
    position: [-7.15, 0.28, -1.22],
    hotspotOffset: [0, 0.75, 0],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/4819203910321',
        name: 'Smoked Walnut',
        title: 'Smoked Walnut',
        price: '1250.00',
        hex: '#4A3728',
        color3: 0x4a3728,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910322',
        name: 'Natural White Oak',
        title: 'Natural White Oak',
        price: '1190.00',
        hex: '#C8AD88',
        color3: 0xc8ad88,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910323',
        name: 'Ebonized Black Ash',
        title: 'Ebonized Black Ash',
        price: '1280.00',
        hex: '#232426',
        color3: 0x232426,
        availableForSale: true
      }
    ],
    details: [
      'Acoustically transparent slatted doors allow remote signals and speaker sound',
      'Concealed magnetic push-to-open German Blum hardware',
      'Dual rear thermal ventilation cutouts for AV receivers and consoles'
    ]
  },
  {
    id: 'product-06',
    shopifyId: 'gid://shopify/Product/9182301928406',
    handle: 'sculptural-bronze-horizon-object',
    name: 'Sculptural Bronze Horizon Object',
    title: 'Sculptural Bronze Horizon Object',
    vendor: 'Studio Aurelia Sculptures',
    productType: 'Art & Collectibles',
    room: 'Living Room',
    displayZone: 'Media Console Display Shelf',
    placementType: 'On Wall Shelves',
    price: 340,
    priceRange: {
      minVariantPrice: { amount: '340.00', currencyCode: 'USD' }
    },
    rating: 5.0,
    reviewsCount: 14,
    description: 'Lost-wax cast solid bronze abstract horizontal sculpture exploring negative space and tension. Hand-finished with an organic patinated sheen.',
    dimensions: 'W: 36cm × D: 14cm × H: 18cm',
    materials: 'Cast architectural bronze with hand-applied wax patina',
    clearanceRadiusM: 1.8,
    position: [-6.1, 0.52, -1.22],
    hotspotOffset: [0, 0.4, 0],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/4819203910331',
        name: 'Dark Antique Bronze',
        title: 'Dark Antique Bronze',
        price: '340.00',
        hex: '#6E5743',
        color3: 0x6e5743,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910332',
        name: 'Polished Champagne Brass',
        title: 'Polished Champagne Brass',
        price: '375.00',
        hex: '#C8A462',
        color3: 0xc8a462,
        availableForSale: true
      }
    ],
    details: [
      'Numbered limited edition series (100 pieces world-wide)',
      'Signed and certified by the sculptor',
      'Solid weight 6.8 kg'
    ]
  },
  {
    id: 'product-07',
    shopifyId: 'gid://shopify/Product/9182301928407',
    handle: 'monolithic-travertine-pedestal-urn',
    name: 'Monolithic Travertine Pedestal with Urn',
    title: 'Monolithic Travertine Pedestal with Urn',
    vendor: 'Villa Lumina Atelier',
    productType: 'Architectural Pedestals',
    room: 'Wide Entrance Hallway',
    displayZone: 'Central Foyer Reception Gallery',
    placementType: 'On Pedestals',
    price: 980,
    priceRange: {
      minVariantPrice: { amount: '980.00', currencyCode: 'USD' }
    },
    rating: 5.0,
    reviewsCount: 16,
    description: 'Monolithic 90cm high square pedestal carved from un-filled Roman travertine, displaying an oversized artisanal ceramic vessel with dried sculptural olive branches.',
    dimensions: 'Pedestal: 40×40×90cm | Urn: Ø28×H:48cm',
    materials: 'Honed Roman Travertine, artisanal earthenware clay with matte chalk finish',
    clearanceRadiusM: 2.4,
    position: [0.0, 0.45, 4.2],
    hotspotOffset: [0, 0.95, 0],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/4819203910341',
        name: 'Roman Beige Travertine',
        title: 'Roman Beige Travertine',
        price: '980.00',
        hex: '#DFD6C0',
        color3: 0xdfd6c0,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910342',
        name: 'Nero Marquina Stone',
        title: 'Nero Marquina Stone',
        price: '1050.00',
        hex: '#252628',
        color3: 0x252628,
        availableForSale: true
      }
    ],
    details: [
      'Freestanding architectural gallery pedestal anchor for grand foyers',
      'Solid 58 kg stone plinth with protective felt floor glides',
      'Integrated hidden recess for gallery display lighting'
    ]
  },
  {
    id: 'product-08',
    shopifyId: 'gid://shopify/Product/9182301928408',
    handle: 'foyer-niche-stoneware-amphora',
    name: 'Artisanal Stoneware Amphora',
    title: 'Artisanal Stoneware Amphora',
    vendor: 'Atelier Terra Nova',
    productType: 'Ceramics',
    room: 'Wide Entrance Hallway',
    displayZone: 'Illuminated Architectural Wall Niche',
    placementType: 'Inside Illuminated Cabinets',
    price: 260,
    priceRange: {
      minVariantPrice: { amount: '260.00', currencyCode: 'USD' }
    },
    rating: 4.9,
    reviewsCount: 27,
    description: 'Hand-coiled monumental stoneware amphora highlighted within the illuminated travertine foyer niche under warm overhead spotlighting.',
    dimensions: 'W: 32cm × D: 28cm × H: 46cm',
    materials: 'High-fire stoneware, natural iron-spot slip glaze',
    clearanceRadiusM: 1.8,
    position: [1.34, 1.15, 5.2],
    hotspotOffset: [0, 0.5, 0],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/4819203910351',
        name: 'Chalk Sand Slip',
        title: 'Chalk Sand Slip',
        price: '260.00',
        hex: '#F2EDE2',
        color3: 0xf2ede2,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910352',
        name: 'Ochre Terra',
        title: 'Ochre Terra',
        price: '260.00',
        hex: '#B8724E',
        color3: 0xb8724e,
        availableForSale: true
      }
    ],
    details: [
      'Sculpted using ancestral coil-building pottery technique',
      'Fired in a wood-burning reduction kiln for organic color gradation',
      'Fitted with silicone foot pads'
    ]
  },
  {
    id: 'product-09',
    shopifyId: 'gid://shopify/Product/9182301928409',
    handle: 'solstice-8-seater-dining-table',
    name: 'Solstice 8-Seater Walnut Dining Table',
    title: 'Solstice 8-Seater Walnut Dining Table',
    vendor: 'Villa Lumina Atelier',
    productType: 'Dining Tables',
    room: 'Dining Area',
    displayZone: 'Formal Dining Centerpiece',
    placementType: 'On Display Tables',
    price: 2400,
    priceRange: {
      minVariantPrice: { amount: '2400.00', currencyCode: 'USD' }
    },
    rating: 5.0,
    reviewsCount: 42,
    description: 'Commanding solid American walnut dining table featuring sculpted cylindrical pill legs and a boat-shaped beveled tabletop.',
    dimensions: 'L: 260cm × W: 105cm × H: 75cm',
    materials: 'Solid FSC-certified American Walnut with silk polyurethane lacquer',
    clearanceRadiusM: 2.2,
    position: [5.8, 0.45, 4.0],
    hotspotOffset: [0, 0.9, 0],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/4819203910361',
        name: 'Smoked American Walnut',
        title: 'Smoked American Walnut',
        price: '2400.00',
        hex: '#4A3728',
        color3: 0x4a3728,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910362',
        name: 'Natural White Oak',
        title: 'Natural White Oak',
        price: '2250.00',
        hex: '#C8AD88',
        color3: 0xc8ad88,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910363',
        name: 'Bleached Ash',
        title: 'Bleached Ash',
        price: '2350.00',
        hex: '#D5CAB8',
        color3: 0xd5cab8,
        availableForSale: true
      }
    ],
    details: [
      'Comfortably seats 8 to 10 guests with expansive legroom',
      'Concealed internal steel reinforcement truss prevents seasonal deflection',
      'Heat, water and alcohol stain-resistant protective surface treatment'
    ]
  },
  {
    id: 'product-10',
    shopifyId: 'gid://shopify/Product/9182301928410',
    handle: 'koto-dining-armchair',
    name: 'Koto Dining Armchair (Set of 2)',
    title: 'Koto Dining Armchair (Set of 2)',
    vendor: 'Villa Lumina Atelier',
    productType: 'Dining Chairs',
    room: 'Dining Area',
    displayZone: 'Dining Suite',
    placementType: 'Furniture Floor Zone',
    price: 680,
    priceRange: {
      minVariantPrice: { amount: '680.00', currencyCode: 'USD' }
    },
    rating: 4.8,
    reviewsCount: 16,
    description: 'Tailored dining armchair with a curved steam-bent oak backrest and dense upholstered seat in performance tactile Belgian linen.',
    dimensions: 'W: 56cm × D: 54cm × H: 78cm (Seat H: 46cm)',
    materials: 'Solid Smoked Walnut frame, Belgian linen upholstery, high-resilience foam',
    clearanceRadiusM: 1.6,
    position: [5.8, 0.42, 4.75],
    hotspotOffset: [0, 0.8, 0],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/4819203910371',
        name: 'Natural Sand Linen',
        title: 'Natural Sand Linen',
        price: '680.00',
        hex: '#D8CEBC',
        color3: 0xd8cebc,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910372',
        name: 'Slate Grey',
        title: 'Slate Grey',
        price: '680.00',
        hex: '#5E6065',
        color3: 0x5e6065,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910373',
        name: 'Cognac Saddle Leather',
        title: 'Cognac Saddle Leather',
        price: '740.00',
        hex: '#93552E',
        color3: 0x93552e,
        availableForSale: true
      }
    ],
    details: [
      'Commercial grade durability rating (100,000 double rubs Martindale)',
      'Steam-bent solid hardwood ergonomic lumbar curvature',
      'Protective felt floor gliders included for hardwood and marble protection'
    ]
  },
  {
    id: 'product-11',
    shopifyId: 'gid://shopify/Product/9182301928411',
    handle: 'halo-linear-architectural-pendant',
    name: 'Halo Architectural Linear Pendant',
    title: 'Halo Architectural Linear Pendant',
    vendor: 'Lumina Architettura',
    productType: 'Suspended Lighting',
    room: 'Dining Area',
    displayZone: 'Overhead Dining Table Zone',
    placementType: 'Architectural Lighting Zone',
    price: 790,
    priceRange: {
      minVariantPrice: { amount: '790.00', currencyCode: 'USD' }
    },
    rating: 4.9,
    reviewsCount: 28,
    description: 'Suspended minimal architectural luminaire with dual-emission optics (direct task downlight onto table + soft indirect ambient ceiling uplight).',
    dimensions: 'L: 200cm × W: 5cm × H: 5cm (Drop: 90cm adjustable)',
    materials: 'Extruded aluminum, brushed champagne brass finish, frosted optical PMMA diffuser',
    clearanceRadiusM: 2.0,
    position: [5.8, 2.3, 4.0],
    hotspotOffset: [0, 0.35, 0],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/4819203910381',
        name: 'Brushed Champagne Brass',
        title: 'Brushed Champagne Brass',
        price: '790.00',
        hex: '#C8A462',
        color3: 0xc8a462,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910382',
        name: 'Matte Black Anodized',
        title: 'Matte Black Anodized',
        price: '750.00',
        hex: '#1E1F22',
        color3: 0x1e1f22,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910383',
        name: 'Warm Bronze',
        title: 'Warm Bronze',
        price: '820.00',
        hex: '#6E5743',
        color3: 0x6e5743,
        availableForSale: true
      }
    ],
    details: [
      'TRIAC and 0-10V dimmable with smooth dim-to-warm curve',
      'Dual optical circuit: independent up/down lumen balancing',
      'Invisible ultra-thin aircraft wire suspension'
    ]
  },
  {
    id: 'product-12',
    shopifyId: 'gid://shopify/Product/9182301928412',
    handle: 'calacatta-gold-waterfall-kitchen-island',
    name: 'Calacatta Gold Waterfall Kitchen Island',
    title: 'Calacatta Gold Waterfall Kitchen Island',
    vendor: 'Villa Lumina Atelier',
    productType: 'Kitchen Millwork',
    room: 'Modern Kitchen',
    displayZone: 'Central Chef Kitchen Island',
    placementType: 'On Kitchen Counters',
    price: 4500,
    priceRange: {
      minVariantPrice: { amount: '4500.00', currencyCode: 'USD' }
    },
    rating: 5.0,
    reviewsCount: 15,
    description: 'Spectacular monolithic kitchen island featuring dual waterfall bookmatched Calacatta marble mitered edges, undermount black sink, and under-counter LED glow.',
    dimensions: 'L: 320cm × W: 110cm × H: 90cm',
    materials: 'Engineered sintered Calacatta Gold stone, matte charcoal cabinets',
    clearanceRadiusM: 1.8,
    position: [5.8, 0.46, -1.8],
    hotspotOffset: [0, 1.05, 0],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/4819203910391',
        name: 'Calacatta Gold',
        title: 'Calacatta Gold',
        price: '4500.00',
        hex: '#F8F6F0',
        color3: 0xf8f6f0,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910392',
        name: 'Nero Marquina',
        title: 'Nero Marquina',
        price: '4700.00',
        hex: '#232426',
        color3: 0x232426,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910393',
        name: 'Grey Armani Marble',
        title: 'Grey Armani Marble',
        price: '4600.00',
        hex: '#7A7773',
        color3: 0x7a7773,
        availableForSale: true
      }
    ],
    details: [
      'Thermal, stain and scratch-resistant sintered porcelain stone surface',
      'Overhang cantilever bar counter accommodating 4 guests',
      'Integrated undermount workstation sink and concealed soft-close pullout drawers'
    ]
  },
  {
    id: 'product-13',
    shopifyId: 'gid://shopify/Product/9182301928413',
    handle: 'linea-leather-counter-barstool',
    name: 'Linea Leather Counter Barstool',
    title: 'Linea Leather Counter Barstool',
    vendor: 'Villa Lumina Atelier',
    productType: 'Barstools',
    room: 'Modern Kitchen',
    displayZone: 'Kitchen Island Counter Seating',
    placementType: 'Furniture Floor Zone',
    price: 360,
    priceRange: {
      minVariantPrice: { amount: '360.00', currencyCode: 'USD' }
    },
    rating: 4.8,
    reviewsCount: 39,
    description: 'Sleek counter-height barstool with full-grain cognac saddle leather upholstery, ergonomic lumbar support, and a matte black steel sled base with brass footrest.',
    dimensions: 'W: 42cm × D: 46cm × H: 88cm (Seat H: 65cm)',
    materials: 'Full-grain saddle leather, welded steel tube, brushed brass wear plate',
    clearanceRadiusM: 1.6,
    position: [5.8, 0.44, -1.05],
    hotspotOffset: [0, 0.85, 0],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/4819203910401',
        name: 'Cognac Saddle Leather',
        title: 'Cognac Saddle Leather',
        price: '360.00',
        hex: '#93552E',
        color3: 0x93552e,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910402',
        name: 'Onyx Black Leather',
        title: 'Onyx Black Leather',
        price: '360.00',
        hex: '#1E1F22',
        color3: 0x1e1f22,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910403',
        name: 'Ivory Cream Bouclé',
        title: 'Ivory Cream Bouclé',
        price: '340.00',
        hex: '#F2EEE5',
        color3: 0xf2eee5,
        availableForSale: true
      }
    ],
    details: [
      'Custom seat height calibrated for standard 90cm kitchen counter islands',
      'Protective brushed brass footrest wear plate prevents scuffs',
      'High-resilience foam padding for extended cocktail or dining comfort'
    ]
  },
  {
    id: 'product-14',
    shopifyId: 'gid://shopify/Product/9182301928414',
    handle: 'culinary-stone-mortar-ceramic-bowl',
    name: 'Artisanal Footed Ceramic Bowl & Marble Mortar',
    title: 'Artisanal Footed Ceramic Bowl & Marble Mortar',
    vendor: 'Cucina Toscana Lab',
    productType: 'Kitchenware',
    room: 'Modern Kitchen',
    displayZone: 'Kitchen Island Countertop',
    placementType: 'On Kitchen Counters',
    price: 195,
    priceRange: {
      minVariantPrice: { amount: '195.00', currencyCode: 'USD' }
    },
    rating: 4.9,
    reviewsCount: 21,
    description: 'Curated culinary duo featuring an artisanal footed stoneware fruit bowl and a solid carved Calacatta marble mortar with pestle.',
    dimensions: 'Bowl: Ø32×H:12cm | Mortar: Ø14×H:10cm',
    materials: 'Honed Calacatta marble, matte white stoneware, end-grain walnut board',
    clearanceRadiusM: 1.5,
    position: [6.4, 0.94, -1.8],
    hotspotOffset: [0, 0.45, 0],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/4819203910411',
        name: 'Bianco Marble & Chalk',
        title: 'Bianco Marble & Chalk',
        price: '195.00',
        hex: '#F5F3EE',
        color3: 0xf5f3ee,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910412',
        name: 'Nero Stone & Charcoal',
        title: 'Nero Stone & Charcoal',
        price: '210.00',
        hex: '#27282A',
        color3: 0x27282a,
        availableForSale: true
      }
    ],
    details: [
      'Carved from a single block of Italian Calacatta marble',
      'Footed pedestal stoneware bowl with subtle grooved rim',
      'Food-safe natural beeswax finish'
    ]
  },
  {
    id: 'product-15',
    shopifyId: 'gid://shopify/Product/9182301928415',
    handle: 'kyoto-floating-oak-platform-bed',
    name: 'Kyoto Floating Oak Platform Bed',
    title: 'Kyoto Floating Oak Platform Bed',
    vendor: 'Villa Lumina Atelier',
    productType: 'Beds',
    room: 'Secondary Showroom / Master Suite',
    displayZone: 'Master Suite Sanctuary',
    placementType: 'Dedicated Architectural Display Areas',
    price: 2650,
    priceRange: {
      minVariantPrice: { amount: '2650.00', currencyCode: 'USD' }
    },
    rating: 5.0,
    reviewsCount: 47,
    description: 'Zen-inspired king size platform bed frame in rift-cut white oak featuring integrated floating nightstands, linen headboard, and under-bed floating LED nightlight.',
    dimensions: 'W: 280cm (with stands) × L: 225cm × H: 95cm',
    materials: 'Solid White Oak, Belgian linen headboard, European beech internal slats',
    clearanceRadiusM: 2.2,
    position: [-6.0, 0.45, -5.4],
    hotspotOffset: [0, 1.1, 0],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/4819203910421',
        name: 'Warm Natural White Oak',
        title: 'Warm Natural White Oak',
        price: '2650.00',
        hex: '#C8AD88',
        color3: 0xc8ad88,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910422',
        name: 'Smoked Walnut',
        title: 'Smoked Walnut',
        price: '2790.00',
        hex: '#4A3728',
        color3: 0x4a3728,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910423',
        name: 'Ebonized Black Ash',
        title: 'Ebonized Black Ash',
        price: '2720.00',
        hex: '#232426',
        color3: 0x232426,
        availableForSale: true
      }
    ],
    details: [
      'Concealed cantilever base creates effortless floating visual effect',
      'Dual wireless Qi charging pads built flush into floating nightstand surfaces',
      'Solid wooden slat system engineered for breathability and zero squeaks'
    ]
  },
  {
    id: 'product-16',
    shopifyId: 'gid://shopify/Product/9182301928416',
    handle: 'palma-organic-boucle-armchair-table',
    name: 'Palma Organic Boucle Armchair & Side Table',
    title: 'Palma Organic Boucle Armchair & Side Table',
    vendor: 'Villa Lumina Atelier',
    productType: 'Lounge Seating',
    room: 'Secondary Showroom / Master Suite',
    displayZone: 'Suite Garden Reading Nook',
    placementType: 'On Side Tables',
    price: 940,
    priceRange: {
      minVariantPrice: { amount: '940.00', currencyCode: 'USD' }
    },
    rating: 4.9,
    reviewsCount: 22,
    description: 'Sculptural organic lounge chair featuring wrapped pillowed armrests, 360-degree silent swivel plinth, and a companion solid Roman travertine drink pedestal table.',
    dimensions: 'Chair: 86×80×78cm | Table: Ø36×H:48cm',
    materials: 'Textured cream bouclé, solid oak plinth, solid Roman travertine pedestal',
    clearanceRadiusM: 1.8,
    position: [-3.0, 0.42, -3.2],
    hotspotOffset: [0, 0.9, 0],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/4819203910431',
        name: 'Textured Cream Bouclé',
        title: 'Textured Cream Bouclé',
        price: '940.00',
        hex: '#F2EEE5',
        color3: 0xf2eee5,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910432',
        name: 'Terracotta Rust',
        title: 'Terracotta Rust',
        price: '980.00',
        hex: '#B46B4C',
        color3: 0xb46b4c,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910433',
        name: 'Forest Moss',
        title: 'Forest Moss',
        price: '960.00',
        hex: '#4A5B47',
        color3: 0x4a5b47,
        availableForSale: true
      }
    ],
    details: [
      'Full 360-degree smooth concealed heavy-duty bearing swivel',
      'Solid travertine drink pedestal includes micro-bevel chamfer edge',
      'High-martindale curl bouclé treated against liquid stains'
    ]
  },
  {
    id: 'product-17',
    shopifyId: 'gid://shopify/Product/9182301928417',
    handle: 'venezia-travertine-floating-vanity-mirror',
    name: 'Venezia Travertine Floating Vanity & Mirror',
    title: 'Venezia Travertine Floating Vanity & Mirror',
    vendor: 'Villa Lumina Atelier',
    productType: 'Bathroom Fixtures',
    room: 'Luxury Bathroom',
    displayZone: 'Spa Vanity Wall',
    placementType: 'Built-in Wall Sections',
    price: 1980,
    priceRange: {
      minVariantPrice: { amount: '1980.00', currencyCode: 'USD' }
    },
    rating: 4.8,
    reviewsCount: 14,
    description: 'Wall-hung architectural vanity featuring a solid carved Roman travertine countertop, dual integrated Calacatta stone basin troughs, and a backlit ambient LED pill mirror.',
    dimensions: 'Vanity: 180×54×35cm | Mirror: 160×95×3cm',
    materials: 'Roman Travertine, Calacatta Gold marble, matte black brass fixtures',
    clearanceRadiusM: 1.8,
    position: [-0.25, 0.6, -7.2],
    hotspotOffset: [0, 1.0, 0],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/4819203910441',
        name: 'Beige Roman Travertine',
        title: 'Beige Roman Travertine',
        price: '1980.00',
        hex: '#DFD6C0',
        color3: 0xdfd6c0,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910442',
        name: 'Nero Marquina Stone',
        title: 'Nero Marquina Stone',
        price: '2150.00',
        hex: '#232426',
        color3: 0x232426,
        availableForSale: true
      }
    ],
    details: [
      'Integrated ramp basin slopes to concealed stainless linear drains',
      'Mirror features 360-degree perimeter indirect 2700K architectural glow',
      'Heavy-duty concealed in-wall steel mounting brackets tested up to 250 kg'
    ]
  },
  {
    id: 'product-18',
    shopifyId: 'gid://shopify/Product/9182301928418',
    handle: 'grand-pivot-architectural-timber-door',
    name: 'Grand Pivot Architectural Timber Door',
    title: 'Grand Pivot Architectural Timber Door',
    vendor: 'Villa Lumina Atelier',
    productType: 'Architectural Joinery',
    room: 'Main Entrance & Porch',
    displayZone: 'Main Architectural Entry Portico',
    placementType: 'Dedicated Architectural Display Areas',
    price: 3200,
    priceRange: {
      minVariantPrice: { amount: '3200.00', currencyCode: 'USD' }
    },
    rating: 5.0,
    reviewsCount: 29,
    description: 'Monumental 2.8m oversized pivot entrance door with vertical fluted teak battens, concealed FritsJurgens pivot hinge, and 1.8m brushed brass pull.',
    dimensions: 'W: 164cm × H: 276cm × D: 8cm',
    materials: 'Solid Burmese Teak, insulated thermal core, brushed champagne brass pull',
    clearanceRadiusM: 2.5,
    position: [0.0, 1.4, 6.34],
    hotspotOffset: [0, 1.45, 0],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/4819203910451',
        name: 'Warm Natural Teak',
        title: 'Warm Natural Teak',
        price: '3200.00',
        hex: '#A7784E',
        color3: 0xa7784e,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910452',
        name: 'Charred Yakisugi Black',
        title: 'Charred Yakisugi Black',
        price: '3350.00',
        hex: '#222325',
        color3: 0x222325,
        availableForSale: true
      },
      {
        id: 'gid://shopify/ProductVariant/4819203910453',
        name: 'Dark Smoked Walnut',
        title: 'Dark Smoked Walnut',
        price: '3300.00',
        hex: '#4B382A',
        color3: 0x4b382a,
        availableForSale: true
      }
    ],
    details: [
      'Concealed heavy-duty pivot hinge with self-closing damper and 90-degree hold open',
      'Quadruple perimeter acoustic and thermal weather seals',
      'Solid 1.8m brushed brass architectural pull with double standoff mounting'
    ]
  }
];

// Helper to lookup a product by ID
export function getProductById(id) {
  return SHOWROOM_PRODUCTS.find((p) => p.id === id);
}

// Helper to lookup products by display zone / placement type
export function getProductsByPlacementType(type) {
  return SHOWROOM_PRODUCTS.filter((p) => p.placementType === type);
}
