// Product Catalog for Villa Lumina 3D Modern Luxury Showroom

export const SHOWROOM_PRODUCTS = [
  {
    id: 'modern-lounge-chair',
    name: 'Aura Modern Lounge Chair',
    category: 'Seating',
    room: 'Living Room',
    price: 499,
    rating: 4.9,
    reviewsCount: 38,
    description: 'A stylish and comfortable sculptural lounge chair with premium upholstery and solid smoked wood legs. Designed for ergonomic comfort and modern luxury aesthetics.',
    dimensions: 'W: 88cm × D: 84cm × H: 76cm',
    materials: 'Textured boucle wool, kiln-dried FSC birch, matte brass ferrules',
    position: [-3.2, 0.45, 1.2],
    hotspotOffset: [0, 0.9, 0],
    variants: [
      { name: 'Oatmeal Cream', hex: '#EAE5D9', color3: 0xeae5d9 },
      { name: 'Saddle Leather', hex: '#9C6238', color3: 0x9c6238 },
      { name: 'Charcoal Velvet', hex: '#343538', color3: 0x343538 },
      { name: 'Olive Linen', hex: '#636953', color3: 0x636953 }
    ],
    details: [
      'High-density foam cushion with down-blend top wrap',
      'Solid hardwood internal frame with lifetime guarantee',
      'Stain-resistant nanotech fabric treatment',
      'Handcrafted in Italy'
    ]
  },
  {
    id: 'modular-sectional-sofa',
    name: 'Milano Low Modular Sectional',
    category: 'Living Room',
    room: 'Living Room',
    price: 2890,
    rating: 5.0,
    reviewsCount: 52,
    description: 'Grand scale low-profile modular sofa with generous proportions, deep lounging comfort, and bespoke double-stitched piping.',
    dimensions: 'W: 340cm × D: 220cm × H: 72cm',
    materials: 'Italian boucle fabric, high-resilience memory foam, feather fill',
    position: [-6.2, 0.45, 3.2],
    hotspotOffset: [0, 1.0, 0],
    variants: [
      { name: 'Warm Cream Boucle', hex: '#F0ECE1', color3: 0xf0ece1 },
      { name: 'Pebble Grey', hex: '#BFB9AD', color3: 0xbfb9ad },
      { name: 'Cognac Leather', hex: '#874B2A', color3: 0x874b2a }
    ],
    details: [
      'Modular configuration can be left or right oriented',
      'Removable and dry-cleanable performance slipcovers',
      'Sinuous spring suspension for lifelong contouring'
    ]
  },
  {
    id: 'travertine-coffee-table',
    name: 'Koto Dual Travertine Coffee Tables',
    category: 'Tables',
    room: 'Living Room',
    price: 850,
    rating: 4.8,
    reviewsCount: 24,
    description: 'Set of two nesting organic low coffee tables crafted from honed natural beige Roman travertine with soft rounded chamfer edges.',
    dimensions: 'Large: 120×70×34cm | Small: 80×55×40cm',
    materials: 'Solid honed Roman Travertine marble',
    position: [-5.0, 0.22, 2.5],
    hotspotOffset: [0, 0.6, 0],
    variants: [
      { name: 'Beige Travertine', hex: '#D8CCA8', color3: 0xd8cca8 },
      { name: 'Carrara White', hex: '#EBEBEB', color3: 0xebebeb },
      { name: 'Nero Marquina', hex: '#222222', color3: 0x222222 }
    ],
    details: [
      'Honed matte finish with protective sealer against stains',
      'Unique natural veining and fossil textures in every piece',
      'Solid weight 68 kg total'
    ]
  },
  {
    id: 'media-slat-credenza',
    name: 'Nordic Fluted Media Credenza',
    category: 'Storage',
    room: 'Living Room',
    price: 1250,
    rating: 4.9,
    reviewsCount: 19,
    description: 'Architectural low entertainment console featuring acoustic fluted oak tambour slats, concealed wire management, and soft-close push drawers.',
    dimensions: 'W: 240cm × D: 45cm × H: 48cm',
    materials: 'Solid White Oak & Walnut fluted tambour, bronze hardware',
    position: [-8.8, 0.4, 2.8],
    hotspotOffset: [0, 0.9, 0],
    variants: [
      { name: 'Natural White Oak', hex: '#C2A379', color3: 0xc2a379 },
      { name: 'Smoked Walnut', hex: '#584334', color3: 0x584334 },
      { name: 'Ebonized Ash', hex: '#2A2928', color3: 0x2a2928 }
    ],
    details: [
      'IR-friendly acoustic slats allow remote signals through closed doors',
      'Internal ventilation slots for AV components and gaming consoles',
      'Floating wall-mount or ground plinth installation'
    ]
  },
  {
    id: 'designer-floor-lamp',
    name: 'Archimede Brass Arc Floor Lamp',
    category: 'Lighting',
    room: 'Living Room',
    price: 420,
    rating: 4.7,
    reviewsCount: 31,
    description: 'Slender architectural cantilevered arc floor lamp with a brushed brass stem and a heavy honed marble stabilizing base.',
    dimensions: 'Span: 160cm × H: 215cm × Base: 35cm',
    materials: 'Solid brushed brass, Carrara marble base, spun brass shade',
    position: [-7.8, 1.2, 0.5],
    hotspotOffset: [0, 1.6, 0],
    variants: [
      { name: 'Brushed Brass', hex: '#C9A96E', color3: 0xc9a96e },
      { name: 'Matte Black', hex: '#1F2022', color3: 0x1f2022 },
      { name: 'Brushed Nickel', hex: '#9E9E9C', color3: 0x9e9e9c }
    ],
    details: [
      'Integrated touch dimmer with memory brightness function',
      'Warm 2700K high-CRI (95+) LED module (1200 Lumens)',
      '360-degree swivel shade for direct or diffuse illumination'
    ]
  },
  {
    id: 'dining-table-set',
    name: 'Solstice 8-Seater Walnut Dining Table',
    category: 'Dining',
    room: 'Dining Area',
    price: 2400,
    rating: 5.0,
    reviewsCount: 42,
    description: 'Commanding solid American walnut dining table featuring sculpted cylindrical pill legs and a boat-shaped beveled tabletop.',
    dimensions: 'L: 260cm × W: 110cm × H: 75cm',
    materials: 'Solid American Walnut with matte polyurethane lacquer',
    position: [5.8, 0.45, 4.0],
    hotspotOffset: [0, 0.9, 0],
    variants: [
      { name: 'American Walnut', hex: '#5E3D29', color3: 0x5e3d29 },
      { name: 'Smoked Oak', hex: '#42362F', color3: 0x42362f },
      { name: 'Bleached Ash', hex: '#D2C1AC', color3: 0xd2c1ac }
    ],
    details: [
      'Seats 8-10 comfortably with generous legroom',
      'Integrated steel sub-structure prevents warping over time',
      'Silk matte protective coating resistant to heat and water rings'
    ]
  },
  {
    id: 'dining-armchair',
    name: 'Koto Dining Armchair (Set of 2)',
    category: 'Dining',
    room: 'Dining Area',
    price: 680,
    rating: 4.8,
    reviewsCount: 16,
    description: 'Tailored dining armchair with a curved steam-bent oak backrest and dense upholstered seat in performance tactile linen.',
    dimensions: 'W: 56cm × D: 54cm × H: 78cm (Seat: 46cm)',
    materials: 'Solid Oak frame, Belgian linen upholstery',
    position: [5.8, 0.4, 4.8],
    hotspotOffset: [0, 0.8, 0],
    variants: [
      { name: 'Natural Sand', hex: '#D5CAB8', color3: 0xd5cab8 },
      { name: 'Slate Grey', hex: '#63656A', color3: 0x63656a },
      { name: 'Cognac Leather', hex: '#945831', color3: 0x945831 }
    ],
    details: [
      'Commercial grade durability rating (100,000 double rubs)',
      'Stackable up to 3 units for easy space management',
      'Felt glides included for hardwood/marble floor protection'
    ]
  },
  {
    id: 'linear-pendant-light',
    name: 'Halo Architectural Linear Pendant',
    category: 'Lighting',
    room: 'Dining Area',
    price: 790,
    rating: 4.9,
    reviewsCount: 28,
    description: 'Suspended minimal architectural luminaire with dual-emission optics (direct task downlight + soft indirect ambient ceiling uplight).',
    dimensions: 'L: 180cm × W: 6cm × H: 8cm (Drop: 150cm adjustable)',
    materials: 'Extruded aluminum, frosted optical PMMA diffuser',
    position: [5.8, 2.3, 4.0],
    hotspotOffset: [0, 0.3, 0],
    variants: [
      { name: 'Brushed Brass', hex: '#C4A265', color3: 0xc4a265 },
      { name: 'Anodized Black', hex: '#1C1C1D', color3: 0x1c1c1d },
      { name: 'Warm Bronze', hex: '#624D3D', color3: 0x624d3d }
    ],
    details: [
      'TRIAC and 0-10V dimmable with smooth dim-to-warm curve',
      'Dual optical control: independent up/down lumen balancing',
      'Invisible ultra-thin aircraft wire suspension'
    ]
  },
  {
    id: 'calacatta-kitchen-island',
    name: 'Calacatta Gold Waterfall Kitchen Island',
    category: 'Kitchen',
    room: 'Kitchen',
    price: 4500,
    rating: 5.0,
    reviewsCount: 15,
    description: 'Spectacular monolithic kitchen island featuring dual waterfall bookmatched Calacatta marble mitered edges and seamless concealed drawers.',
    dimensions: 'L: 320cm × W: 110cm × H: 92cm',
    materials: 'Engineered sintered stone / Calacatta Gold composite',
    position: [5.8, 0.46, -1.8],
    hotspotOffset: [0, 1.1, 0],
    variants: [
      { name: 'Calacatta Gold', hex: '#F4EFE6', color3: 0xf4efe6 },
      { name: 'Nero Marquina', hex: '#212123', color3: 0x212123 },
      { name: 'Grey Armani Marble', hex: '#837F7B', color3: 0x837f7b }
    ],
    details: [
      'Heat, scratch, and chemical resistant sintered porcelain stone',
      'Integrated matte black undermount sink with flush workstation ledge',
      'Overhang cantilever bar seating for 4 guests'
    ]
  },
  {
    id: 'designer-barstool',
    name: 'Linea Leather Counter Barstool',
    category: 'Kitchen',
    room: 'Kitchen',
    price: 360,
    rating: 4.8,
    reviewsCount: 39,
    description: 'Sleek counter-height barstool with full-grain saddle leather upholstery, ergonomic lumbar support, and a matte black steel sled base.',
    dimensions: 'W: 46cm × D: 48cm × H: 92cm (Seat: 65cm)',
    materials: 'Full-grain top leather, welded tubular steel',
    position: [5.8, 0.45, -0.6],
    hotspotOffset: [0, 0.9, 0],
    variants: [
      { name: 'Warm Cognac', hex: '#94532B', color3: 0x94532b },
      { name: 'Onyx Black', hex: '#1C1C1C', color3: 0x1c1c1c },
      { name: 'Ivory Cream', hex: '#E2DDD4', color3: 0xe2ddd4 }
    ],
    details: [
      'Integrated footrest with protective brass wear plate',
      'High-resilience foam padding for extended cocktail or dining comfort',
      'Slim footprint fits cleanly under island overhang'
    ]
  },
  {
    id: 'platform-bed-suite',
    name: 'Kyoto Floating Oak Platform Bed',
    category: 'Bedroom',
    room: 'Product Showroom',
    price: 2650,
    rating: 5.0,
    reviewsCount: 47,
    description: 'Zen-inspired king size platform bed frame in rift-cut white oak featuring integrated floating nightstands and a tailored upholstered headboard.',
    dimensions: 'W: 280cm (with stands) × L: 225cm × H: 95cm',
    materials: 'Solid White Oak, padded linen headboard, European beech slats',
    position: [-6.0, 0.45, -5.0],
    hotspotOffset: [0, 1.1, 0],
    variants: [
      { name: 'Natural White Oak', hex: '#CBB28D', color3: 0xcbb28d },
      { name: 'Smoked Walnut', hex: '#5A4335', color3: 0x5a4335 },
      { name: 'Ebonized Black', hex: '#262627', color3: 0x262627 }
    ],
    details: [
      'Concealed floating base with under-bed warm LED glow',
      'Integrated dual USB-C charging ports inside floating nightstands',
      'Solid wooden slat system engineered for breathability and zero squeaks'
    ]
  },
  {
    id: 'accent-bedroom-armchair',
    name: 'Palma Organic Boucle Armchair',
    category: 'Bedroom',
    room: 'Product Showroom',
    price: 740,
    rating: 4.9,
    reviewsCount: 22,
    description: 'Sculptural organic accent chair featuring wrapped pillowed armrests and textured ivory boucle fabric that creates a serene bedroom reading nook.',
    dimensions: 'W: 92cm × D: 86cm × H: 78cm',
    materials: 'Curled wool boucle, internal steel cage, solid oak legs',
    position: [-2.8, 0.45, -3.2],
    hotspotOffset: [0, 0.9, 0],
    variants: [
      { name: 'Ivory Boucle', hex: '#EDE8DE', color3: 0xede8de },
      { name: 'Terracotta Rust', hex: '#9E543C', color3: 0x9e543c },
      { name: 'Forest Moss', hex: '#4A5B47', color3: 0x4a5b47 }
    ],
    details: [
      'Full 360-degree silent concealed swivel mechanism',
      'Ergonomic lumbar pillow included',
      'Ultra-soft touch with high martindale abrasion score'
    ]
  },
  {
    id: 'floating-travertine-vanity',
    name: 'Venezia Travertine Double Vanity',
    category: 'Bathroom',
    room: 'Bathroom',
    price: 1980,
    rating: 4.8,
    reviewsCount: 14,
    description: 'Wall-hung architectural bathroom vanity featuring a solid carved travertine basin, fluted oak dual soft-close drawers, and matte black fixtures.',
    dimensions: 'W: 160cm × D: 52cm × H: 45cm',
    materials: 'Beige Roman Travertine slab, marine-grade fluted oak veneer',
    position: [-0.2, 0.5, -6.8],
    hotspotOffset: [0, 1.0, 0],
    variants: [
      { name: 'Beige Travertine', hex: '#D2C3A3', color3: 0xd2c3a3 },
      { name: 'Matte Terrazzo', hex: '#E0DDD7', color3: 0xe0ddd7 },
      { name: 'Nero Marble', hex: '#2B2B2C', color3: 0x2b2b2c }
    ],
    details: [
      'Sloped integral ramp sink with concealed linear drain',
      'Moisture-sealed interior drawers with compartmentalized bamboo trays',
      'Heavy-duty wall mounting brackets tested up to 250 kg'
    ]
  },
  {
    id: 'architectural-front-door',
    name: 'Grand Pivot Architectural Timber Door',
    category: 'Architectural',
    room: 'Main Entrance',
    price: 3200,
    rating: 5.0,
    reviewsCount: 29,
    description: 'Monumental 2.8m oversized pivot entrance door with vertical fluted teak battens, concealed FritsJurgens pivot hinge, and 1.8m brushed brass pull.',
    dimensions: 'W: 160cm × H: 280cm × D: 9cm',
    materials: 'Solid Burmese Teak, insulated thermal core, solid brass pull',
    position: [0.0, 1.4, 6.4],
    hotspotOffset: [0, 1.5, 0],
    variants: [
      { name: 'Warm Natural Teak', hex: '#A7784E', color3: 0xa7784e },
      { name: 'Charred Yakisugi', hex: '#222325', color3: 0x222325 },
      { name: 'Dark Smoked Walnut', hex: '#4B382A', color3: 0x4b382a }
    ],
    details: [
      'Heavy-duty commercial pivot system with smooth self-closing damping',
      'Concealed multi-point smart motorized locking mechanism',
      'Acoustic insulation rating Rw 42 dB with quad weather-seals'
    ]
  }
];
