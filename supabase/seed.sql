-- VILLA LUMINA SHOWROOM SEED DATA (Supabase PostgreSQL)
-- Populates all 18 luxury showroom products, variants, and real-time inventory


-- Product product-01: Aura Modern Lounge Chair
INSERT INTO public.products (
  id, showroom_id, name, slug, description, category, room, display_zone, placement_type, dimensions, materials, price, rating, reviews_count
) VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'product-01',
  'Aura Modern Lounge Chair',
  'aura-modern-lounge-chair',
  'A stylish and comfortable sculptural lounge chair with premium upholstery and solid smoked wood legs. Designed for ergonomic comfort and modern luxury aesthetics.',
  'Seating',
  'Living Room',
  'Lounge Seating Zone',
  'Furniture Floor Zone',
  'W: 84cm × D: 80cm × H: 76cm',
  'Textured cream bouclé, kiln-dried FSC birch, brushed brass ferrules',
  499,
  4.9,
  38
) ON CONFLICT (showroom_id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0001-0000-000000000001',
  'a0000000-0000-0000-0000-000000000001',
  'Oatmeal Cream',
  'SKU-PRODUCT-01-01',
  499,
  '#F2EEE5',
  '15920869',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0001-0000-000000000001',
  'b0000000-0000-0001-0000-000000000001',
  15,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0001-0000-000000000002',
  'a0000000-0000-0000-0000-000000000001',
  'Saddle Leather',
  'SKU-PRODUCT-01-02',
  549,
  '#93552E',
  '9655598',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0001-0000-000000000002',
  'b0000000-0000-0001-0000-000000000002',
  16,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0001-0000-000000000003',
  'a0000000-0000-0000-0000-000000000001',
  'Charcoal Velvet',
  'SKU-PRODUCT-01-03',
  519,
  '#2E2F32',
  '3026738',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0001-0000-000000000003',
  'b0000000-0000-0001-0000-000000000003',
  17,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0001-0000-000000000004',
  'a0000000-0000-0000-0000-000000000001',
  'Olive Linen',
  'SKU-PRODUCT-01-04',
  499,
  '#5E664E',
  '6186574',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0001-0000-000000000004',
  'b0000000-0000-0001-0000-000000000004',
  18,
  0,
  3
) ON CONFLICT DO NOTHING;

-- Product product-02: Koto Dual Travertine Coffee Tables
INSERT INTO public.products (
  id, showroom_id, name, slug, description, category, room, display_zone, placement_type, dimensions, materials, price, rating, reviews_count
) VALUES (
  'a0000000-0000-0000-0000-000000000002',
  'product-02',
  'Koto Dual Travertine Coffee Tables',
  'koto-travertine-coffee-tables',
  'Set of two nesting organic low coffee tables crafted from honed natural beige Roman travertine with softened pill edges and cylindrical pedestals.',
  'Tables',
  'Living Room',
  'Central Lounge Centerpiece',
  'On Display Table',
  'Primary: 125×70×28cm | Secondary: 60×60×36cm',
  'Solid honed Roman Travertine slab',
  850,
  4.8,
  24
) ON CONFLICT (showroom_id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0002-0000-000000000001',
  'a0000000-0000-0000-0000-000000000002',
  'Roman Travertine',
  'SKU-PRODUCT-02-01',
  850,
  '#DFD6C0',
  '14669504',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0002-0000-000000000001',
  'b0000000-0000-0002-0000-000000000001',
  16,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0002-0000-000000000002',
  'a0000000-0000-0000-0000-000000000002',
  'Carrara White',
  'SKU-PRODUCT-02-02',
  920,
  '#EBEBEB',
  '15461355',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0002-0000-000000000002',
  'b0000000-0000-0002-0000-000000000002',
  17,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0002-0000-000000000003',
  'a0000000-0000-0000-0000-000000000002',
  'Nero Marquina',
  'SKU-PRODUCT-02-03',
  950,
  '#242426',
  '2368550',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0002-0000-000000000003',
  'b0000000-0000-0002-0000-000000000003',
  18,
  0,
  3
) ON CONFLICT DO NOTHING;

-- Product product-03: Artisanal Ceramic Vessel & Travertine Tray
INSERT INTO public.products (
  id, showroom_id, name, slug, description, category, room, display_zone, placement_type, dimensions, materials, price, rating, reviews_count
) VALUES (
  'a0000000-0000-0000-0000-000000000003',
  'product-03',
  'Artisanal Ceramic Vessel & Travertine Tray',
  'artisanal-ceramic-vessel-tray',
  'Sculptural hand-thrown decorative ceramic bowl presented atop a solid honed travertine catchall tray. Editorial tabletop styling piece.',
  'Decorative Objects',
  'Living Room',
  'Coffee Table Display Area',
  'On Display Tables',
  'Tray: 32×22×2cm | Bowl: Ø16×H:8cm',
  'Honed Roman Travertine, wheel-thrown stoneware with chalk matte glaze',
  185,
  4.9,
  19
) ON CONFLICT (showroom_id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0003-0000-000000000001',
  'a0000000-0000-0000-0000-000000000003',
  'Chalk White & Travertine',
  'SKU-PRODUCT-03-01',
  185,
  '#F5F3EE',
  '16118766',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0003-0000-000000000001',
  'b0000000-0000-0003-0000-000000000001',
  17,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0003-0000-000000000002',
  'a0000000-0000-0000-0000-000000000003',
  'Raw Terracotta',
  'SKU-PRODUCT-03-02',
  185,
  '#B46B4C',
  '11823948',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0003-0000-000000000002',
  'b0000000-0000-0003-0000-000000000002',
  18,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0003-0000-000000000003',
  'a0000000-0000-0000-0000-000000000003',
  'Basalt Charcoal',
  'SKU-PRODUCT-03-03',
  195,
  '#2B2B2D',
  '2829101',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0003-0000-000000000003',
  'b0000000-0000-0003-0000-000000000003',
  19,
  0,
  3
) ON CONFLICT DO NOTHING;

-- Product product-04: Archimede Cantilever Arc Floor Lamp
INSERT INTO public.products (
  id, showroom_id, name, slug, description, category, room, display_zone, placement_type, dimensions, materials, price, rating, reviews_count
) VALUES (
  'a0000000-0000-0000-0000-000000000004',
  'product-04',
  'Archimede Cantilever Arc Floor Lamp',
  'archimede-cantilever-floor-lamp',
  'Slender architectural cantilevered arc floor lamp with a brushed champagne brass stem and a heavy cylindrical honed Calacatta marble stabilizing base.',
  'Lighting',
  'Living Room',
  'Lounge Reading Corner',
  'Architectural Lighting Zone',
  'Span: 160cm × Total H: 215cm × Base: Ø36cm',
  'Solid brushed champagne brass, Calacatta marble base, spun brass dome shade',
  420,
  4.8,
  31
) ON CONFLICT (showroom_id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0004-0000-000000000001',
  'a0000000-0000-0000-0000-000000000004',
  'Brushed Champagne Brass',
  'SKU-PRODUCT-04-01',
  420,
  '#C8A462',
  '13149282',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0004-0000-000000000001',
  'b0000000-0000-0004-0000-000000000001',
  18,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0004-0000-000000000002',
  'a0000000-0000-0000-0000-000000000004',
  'Matte Black Anodized',
  'SKU-PRODUCT-04-02',
  390,
  '#1E1F22',
  '1974050',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0004-0000-000000000002',
  'b0000000-0000-0004-0000-000000000002',
  19,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0004-0000-000000000003',
  'a0000000-0000-0000-0000-000000000004',
  'Subtle Bronze',
  'SKU-PRODUCT-04-03',
  440,
  '#6E5743',
  '7231299',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0004-0000-000000000003',
  'b0000000-0000-0004-0000-000000000003',
  20,
  0,
  3
) ON CONFLICT DO NOTHING;

-- Product product-05: Nordic Fluted Media Credenza
INSERT INTO public.products (
  id, showroom_id, name, slug, description, category, room, display_zone, placement_type, dimensions, materials, price, rating, reviews_count
) VALUES (
  'a0000000-0000-0000-0000-000000000005',
  'product-05',
  'Nordic Fluted Media Credenza',
  'nordic-fluted-media-console',
  'Architectural low-slung entertainment credenza featuring acoustic fluted oak tambour slats, concealed cable raceways, and a bronze shadow reveal line.',
  'Storage',
  'Living Room',
  'Architectural Media Feature Wall',
  'Built-in Wall Sections',
  'W: 260cm × D: 44cm × H: 48cm',
  'Smoked American Walnut & White Oak tambour, subtle bronze reveal',
  1250,
  4.9,
  22
) ON CONFLICT (showroom_id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0005-0000-000000000001',
  'a0000000-0000-0000-0000-000000000005',
  'Smoked Walnut',
  'SKU-PRODUCT-05-01',
  1250,
  '#4A3728',
  '4863784',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0005-0000-000000000001',
  'b0000000-0000-0005-0000-000000000001',
  19,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0005-0000-000000000002',
  'a0000000-0000-0000-0000-000000000005',
  'Natural White Oak',
  'SKU-PRODUCT-05-02',
  1190,
  '#C8AD88',
  '13151624',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0005-0000-000000000002',
  'b0000000-0000-0005-0000-000000000002',
  20,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0005-0000-000000000003',
  'a0000000-0000-0000-0000-000000000005',
  'Ebonized Black Ash',
  'SKU-PRODUCT-05-03',
  1280,
  '#232426',
  '2303014',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0005-0000-000000000003',
  'b0000000-0000-0005-0000-000000000003',
  21,
  0,
  3
) ON CONFLICT DO NOTHING;

-- Product product-06: Sculptural Bronze Horizon Object
INSERT INTO public.products (
  id, showroom_id, name, slug, description, category, room, display_zone, placement_type, dimensions, materials, price, rating, reviews_count
) VALUES (
  'a0000000-0000-0000-0000-000000000006',
  'product-06',
  'Sculptural Bronze Horizon Object',
  'sculptural-bronze-horizon-object',
  'Lost-wax cast solid bronze abstract horizontal sculpture exploring negative space and tension. Hand-finished with an organic patinated sheen.',
  'Art & Collectibles',
  'Living Room',
  'Media Console Display Shelf',
  'On Wall Shelves',
  'W: 36cm × D: 14cm × H: 18cm',
  'Cast architectural bronze with hand-applied wax patina',
  340,
  5,
  14
) ON CONFLICT (showroom_id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0006-0000-000000000001',
  'a0000000-0000-0000-0000-000000000006',
  'Dark Antique Bronze',
  'SKU-PRODUCT-06-01',
  340,
  '#6E5743',
  '7231299',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0006-0000-000000000001',
  'b0000000-0000-0006-0000-000000000001',
  20,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0006-0000-000000000002',
  'a0000000-0000-0000-0000-000000000006',
  'Polished Champagne Brass',
  'SKU-PRODUCT-06-02',
  375,
  '#C8A462',
  '13149282',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0006-0000-000000000002',
  'b0000000-0000-0006-0000-000000000002',
  21,
  0,
  3
) ON CONFLICT DO NOTHING;

-- Product product-07: Monolithic Travertine Pedestal with Urn
INSERT INTO public.products (
  id, showroom_id, name, slug, description, category, room, display_zone, placement_type, dimensions, materials, price, rating, reviews_count
) VALUES (
  'a0000000-0000-0000-0000-000000000007',
  'product-07',
  'Monolithic Travertine Pedestal with Urn',
  'monolithic-travertine-pedestal-urn',
  'Monolithic 90cm high square pedestal carved from un-filled Roman travertine, displaying an oversized artisanal ceramic vessel with dried sculptural olive branches.',
  'Architectural Pedestals',
  'Wide Entrance Hallway',
  'Central Foyer Reception Gallery',
  'On Pedestals',
  'Pedestal: 40×40×90cm | Urn: Ø28×H:48cm',
  'Honed Roman Travertine, artisanal earthenware clay with matte chalk finish',
  980,
  5,
  16
) ON CONFLICT (showroom_id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0007-0000-000000000001',
  'a0000000-0000-0000-0000-000000000007',
  'Roman Beige Travertine',
  'SKU-PRODUCT-07-01',
  980,
  '#DFD6C0',
  '14669504',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0007-0000-000000000001',
  'b0000000-0000-0007-0000-000000000001',
  21,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0007-0000-000000000002',
  'a0000000-0000-0000-0000-000000000007',
  'Nero Marquina Stone',
  'SKU-PRODUCT-07-02',
  1050,
  '#252628',
  '2434600',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0007-0000-000000000002',
  'b0000000-0000-0007-0000-000000000002',
  22,
  0,
  3
) ON CONFLICT DO NOTHING;

-- Product product-08: Artisanal Stoneware Amphora
INSERT INTO public.products (
  id, showroom_id, name, slug, description, category, room, display_zone, placement_type, dimensions, materials, price, rating, reviews_count
) VALUES (
  'a0000000-0000-0000-0000-000000000008',
  'product-08',
  'Artisanal Stoneware Amphora',
  'foyer-niche-stoneware-amphora',
  'Hand-coiled monumental stoneware amphora highlighted within the illuminated travertine foyer niche under warm overhead spotlighting.',
  'Ceramics',
  'Wide Entrance Hallway',
  'Illuminated Architectural Wall Niche',
  'Inside Illuminated Cabinets',
  'W: 32cm × D: 28cm × H: 46cm',
  'High-fire stoneware, natural iron-spot slip glaze',
  260,
  4.9,
  27
) ON CONFLICT (showroom_id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0008-0000-000000000001',
  'a0000000-0000-0000-0000-000000000008',
  'Chalk Sand Slip',
  'SKU-PRODUCT-08-01',
  260,
  '#F2EDE2',
  '15920610',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0008-0000-000000000001',
  'b0000000-0000-0008-0000-000000000001',
  22,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0008-0000-000000000002',
  'a0000000-0000-0000-0000-000000000008',
  'Ochre Terra',
  'SKU-PRODUCT-08-02',
  260,
  '#B8724E',
  '12087886',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0008-0000-000000000002',
  'b0000000-0000-0008-0000-000000000002',
  23,
  0,
  3
) ON CONFLICT DO NOTHING;

-- Product product-09: Solstice 8-Seater Walnut Dining Table
INSERT INTO public.products (
  id, showroom_id, name, slug, description, category, room, display_zone, placement_type, dimensions, materials, price, rating, reviews_count
) VALUES (
  'a0000000-0000-0000-0000-000000000009',
  'product-09',
  'Solstice 8-Seater Walnut Dining Table',
  'solstice-8-seater-dining-table',
  'Commanding solid American walnut dining table featuring sculpted cylindrical pill legs and a boat-shaped beveled tabletop.',
  'Dining Tables',
  'Dining Area',
  'Formal Dining Centerpiece',
  'On Display Tables',
  'L: 260cm × W: 105cm × H: 75cm',
  'Solid FSC-certified American Walnut with silk polyurethane lacquer',
  2400,
  5,
  42
) ON CONFLICT (showroom_id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0009-0000-000000000001',
  'a0000000-0000-0000-0000-000000000009',
  'Smoked American Walnut',
  'SKU-PRODUCT-09-01',
  2400,
  '#4A3728',
  '4863784',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0009-0000-000000000001',
  'b0000000-0000-0009-0000-000000000001',
  23,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0009-0000-000000000002',
  'a0000000-0000-0000-0000-000000000009',
  'Natural White Oak',
  'SKU-PRODUCT-09-02',
  2250,
  '#C8AD88',
  '13151624',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0009-0000-000000000002',
  'b0000000-0000-0009-0000-000000000002',
  24,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0009-0000-000000000003',
  'a0000000-0000-0000-0000-000000000009',
  'Bleached Ash',
  'SKU-PRODUCT-09-03',
  2350,
  '#D5CAB8',
  '14011064',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0009-0000-000000000003',
  'b0000000-0000-0009-0000-000000000003',
  15,
  0,
  3
) ON CONFLICT DO NOTHING;

-- Product product-10: Koto Dining Armchair (Set of 2)
INSERT INTO public.products (
  id, showroom_id, name, slug, description, category, room, display_zone, placement_type, dimensions, materials, price, rating, reviews_count
) VALUES (
  'a0000000-0000-0000-0000-000000000010',
  'product-10',
  'Koto Dining Armchair (Set of 2)',
  'koto-dining-armchair',
  'Tailored dining armchair with a curved steam-bent oak backrest and dense upholstered seat in performance tactile Belgian linen.',
  'Dining Chairs',
  'Dining Area',
  'Dining Suite',
  'Furniture Floor Zone',
  'W: 56cm × D: 54cm × H: 78cm (Seat H: 46cm)',
  'Solid Smoked Walnut frame, Belgian linen upholstery, high-resilience foam',
  680,
  4.8,
  16
) ON CONFLICT (showroom_id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0010-0000-000000000001',
  'a0000000-0000-0000-0000-000000000010',
  'Natural Sand Linen',
  'SKU-PRODUCT-10-01',
  680,
  '#D8CEBC',
  '14208700',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0010-0000-000000000001',
  'b0000000-0000-0010-0000-000000000001',
  24,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0010-0000-000000000002',
  'a0000000-0000-0000-0000-000000000010',
  'Slate Grey',
  'SKU-PRODUCT-10-02',
  680,
  '#5E6065',
  '6185061',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0010-0000-000000000002',
  'b0000000-0000-0010-0000-000000000002',
  15,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0010-0000-000000000003',
  'a0000000-0000-0000-0000-000000000010',
  'Cognac Saddle Leather',
  'SKU-PRODUCT-10-03',
  740,
  '#93552E',
  '9655598',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0010-0000-000000000003',
  'b0000000-0000-0010-0000-000000000003',
  16,
  0,
  3
) ON CONFLICT DO NOTHING;

-- Product product-11: Halo Architectural Linear Pendant
INSERT INTO public.products (
  id, showroom_id, name, slug, description, category, room, display_zone, placement_type, dimensions, materials, price, rating, reviews_count
) VALUES (
  'a0000000-0000-0000-0000-000000000011',
  'product-11',
  'Halo Architectural Linear Pendant',
  'halo-linear-architectural-pendant',
  'Suspended minimal architectural luminaire with dual-emission optics (direct task downlight onto table + soft indirect ambient ceiling uplight).',
  'Suspended Lighting',
  'Dining Area',
  'Overhead Dining Table Zone',
  'Architectural Lighting Zone',
  'L: 200cm × W: 5cm × H: 5cm (Drop: 90cm adjustable)',
  'Extruded aluminum, brushed champagne brass finish, frosted optical PMMA diffuser',
  790,
  4.9,
  28
) ON CONFLICT (showroom_id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0011-0000-000000000001',
  'a0000000-0000-0000-0000-000000000011',
  'Brushed Champagne Brass',
  'SKU-PRODUCT-11-01',
  790,
  '#C8A462',
  '13149282',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0011-0000-000000000001',
  'b0000000-0000-0011-0000-000000000001',
  15,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0011-0000-000000000002',
  'a0000000-0000-0000-0000-000000000011',
  'Matte Black Anodized',
  'SKU-PRODUCT-11-02',
  750,
  '#1E1F22',
  '1974050',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0011-0000-000000000002',
  'b0000000-0000-0011-0000-000000000002',
  16,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0011-0000-000000000003',
  'a0000000-0000-0000-0000-000000000011',
  'Warm Bronze',
  'SKU-PRODUCT-11-03',
  820,
  '#6E5743',
  '7231299',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0011-0000-000000000003',
  'b0000000-0000-0011-0000-000000000003',
  17,
  0,
  3
) ON CONFLICT DO NOTHING;

-- Product product-12: Calacatta Gold Waterfall Kitchen Island
INSERT INTO public.products (
  id, showroom_id, name, slug, description, category, room, display_zone, placement_type, dimensions, materials, price, rating, reviews_count
) VALUES (
  'a0000000-0000-0000-0000-000000000012',
  'product-12',
  'Calacatta Gold Waterfall Kitchen Island',
  'calacatta-gold-waterfall-kitchen-island',
  'Spectacular monolithic kitchen island featuring dual waterfall bookmatched Calacatta marble mitered edges, undermount black sink, and under-counter LED glow.',
  'Kitchen Millwork',
  'Modern Kitchen',
  'Central Chef Kitchen Island',
  'On Kitchen Counters',
  'L: 320cm × W: 110cm × H: 90cm',
  'Engineered sintered Calacatta Gold stone, matte charcoal cabinets',
  4500,
  5,
  15
) ON CONFLICT (showroom_id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0012-0000-000000000001',
  'a0000000-0000-0000-0000-000000000012',
  'Calacatta Gold',
  'SKU-PRODUCT-12-01',
  4500,
  '#F8F6F0',
  '16316144',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0012-0000-000000000001',
  'b0000000-0000-0012-0000-000000000001',
  16,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0012-0000-000000000002',
  'a0000000-0000-0000-0000-000000000012',
  'Nero Marquina',
  'SKU-PRODUCT-12-02',
  4700,
  '#232426',
  '2303014',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0012-0000-000000000002',
  'b0000000-0000-0012-0000-000000000002',
  17,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0012-0000-000000000003',
  'a0000000-0000-0000-0000-000000000012',
  'Grey Armani Marble',
  'SKU-PRODUCT-12-03',
  4600,
  '#7A7773',
  '8025971',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0012-0000-000000000003',
  'b0000000-0000-0012-0000-000000000003',
  18,
  0,
  3
) ON CONFLICT DO NOTHING;

-- Product product-13: Linea Leather Counter Barstool
INSERT INTO public.products (
  id, showroom_id, name, slug, description, category, room, display_zone, placement_type, dimensions, materials, price, rating, reviews_count
) VALUES (
  'a0000000-0000-0000-0000-000000000013',
  'product-13',
  'Linea Leather Counter Barstool',
  'linea-leather-counter-barstool',
  'Sleek counter-height barstool with full-grain cognac saddle leather upholstery, ergonomic lumbar support, and a matte black steel sled base with brass footrest.',
  'Barstools',
  'Modern Kitchen',
  'Kitchen Island Counter Seating',
  'Furniture Floor Zone',
  'W: 42cm × D: 46cm × H: 88cm (Seat H: 65cm)',
  'Full-grain saddle leather, welded steel tube, brushed brass wear plate',
  360,
  4.8,
  39
) ON CONFLICT (showroom_id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0013-0000-000000000001',
  'a0000000-0000-0000-0000-000000000013',
  'Cognac Saddle Leather',
  'SKU-PRODUCT-13-01',
  360,
  '#93552E',
  '9655598',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0013-0000-000000000001',
  'b0000000-0000-0013-0000-000000000001',
  17,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0013-0000-000000000002',
  'a0000000-0000-0000-0000-000000000013',
  'Onyx Black Leather',
  'SKU-PRODUCT-13-02',
  360,
  '#1E1F22',
  '1974050',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0013-0000-000000000002',
  'b0000000-0000-0013-0000-000000000002',
  18,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0013-0000-000000000003',
  'a0000000-0000-0000-0000-000000000013',
  'Ivory Cream Bouclé',
  'SKU-PRODUCT-13-03',
  340,
  '#F2EEE5',
  '15920869',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0013-0000-000000000003',
  'b0000000-0000-0013-0000-000000000003',
  19,
  0,
  3
) ON CONFLICT DO NOTHING;

-- Product product-14: Artisanal Footed Ceramic Bowl & Marble Mortar
INSERT INTO public.products (
  id, showroom_id, name, slug, description, category, room, display_zone, placement_type, dimensions, materials, price, rating, reviews_count
) VALUES (
  'a0000000-0000-0000-0000-000000000014',
  'product-14',
  'Artisanal Footed Ceramic Bowl & Marble Mortar',
  'culinary-stone-mortar-ceramic-bowl',
  'Curated culinary duo featuring an artisanal footed stoneware fruit bowl and a solid carved Calacatta marble mortar with pestle.',
  'Kitchenware',
  'Modern Kitchen',
  'Kitchen Island Countertop',
  'On Kitchen Counters',
  'Bowl: Ø32×H:12cm | Mortar: Ø14×H:10cm',
  'Honed Calacatta marble, matte white stoneware, end-grain walnut board',
  195,
  4.9,
  21
) ON CONFLICT (showroom_id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0014-0000-000000000001',
  'a0000000-0000-0000-0000-000000000014',
  'Bianco Marble & Chalk',
  'SKU-PRODUCT-14-01',
  195,
  '#F5F3EE',
  '16118766',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0014-0000-000000000001',
  'b0000000-0000-0014-0000-000000000001',
  18,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0014-0000-000000000002',
  'a0000000-0000-0000-0000-000000000014',
  'Nero Stone & Charcoal',
  'SKU-PRODUCT-14-02',
  210,
  '#27282A',
  '2566186',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0014-0000-000000000002',
  'b0000000-0000-0014-0000-000000000002',
  19,
  0,
  3
) ON CONFLICT DO NOTHING;

-- Product product-15: Kyoto Floating Oak Platform Bed
INSERT INTO public.products (
  id, showroom_id, name, slug, description, category, room, display_zone, placement_type, dimensions, materials, price, rating, reviews_count
) VALUES (
  'a0000000-0000-0000-0000-000000000015',
  'product-15',
  'Kyoto Floating Oak Platform Bed',
  'kyoto-floating-oak-platform-bed',
  'Zen-inspired king size platform bed frame in rift-cut white oak featuring integrated floating nightstands, linen headboard, and under-bed floating LED nightlight.',
  'Beds',
  'Secondary Showroom / Master Suite',
  'Master Suite Sanctuary',
  'Dedicated Architectural Display Areas',
  'W: 280cm (with stands) × L: 225cm × H: 95cm',
  'Solid White Oak, Belgian linen headboard, European beech internal slats',
  2650,
  5,
  47
) ON CONFLICT (showroom_id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0015-0000-000000000001',
  'a0000000-0000-0000-0000-000000000015',
  'Warm Natural White Oak',
  'SKU-PRODUCT-15-01',
  2650,
  '#C8AD88',
  '13151624',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0015-0000-000000000001',
  'b0000000-0000-0015-0000-000000000001',
  19,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0015-0000-000000000002',
  'a0000000-0000-0000-0000-000000000015',
  'Smoked Walnut',
  'SKU-PRODUCT-15-02',
  2790,
  '#4A3728',
  '4863784',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0015-0000-000000000002',
  'b0000000-0000-0015-0000-000000000002',
  20,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0015-0000-000000000003',
  'a0000000-0000-0000-0000-000000000015',
  'Ebonized Black Ash',
  'SKU-PRODUCT-15-03',
  2720,
  '#232426',
  '2303014',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0015-0000-000000000003',
  'b0000000-0000-0015-0000-000000000003',
  21,
  0,
  3
) ON CONFLICT DO NOTHING;

-- Product product-16: Palma Organic Boucle Armchair & Side Table
INSERT INTO public.products (
  id, showroom_id, name, slug, description, category, room, display_zone, placement_type, dimensions, materials, price, rating, reviews_count
) VALUES (
  'a0000000-0000-0000-0000-000000000016',
  'product-16',
  'Palma Organic Boucle Armchair & Side Table',
  'palma-organic-boucle-armchair-table',
  'Sculptural organic lounge chair featuring wrapped pillowed armrests, 360-degree silent swivel plinth, and a companion solid Roman travertine drink pedestal table.',
  'Lounge Seating',
  'Secondary Showroom / Master Suite',
  'Suite Garden Reading Nook',
  'On Side Tables',
  'Chair: 86×80×78cm | Table: Ø36×H:48cm',
  'Textured cream bouclé, solid oak plinth, solid Roman travertine pedestal',
  940,
  4.9,
  22
) ON CONFLICT (showroom_id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0016-0000-000000000001',
  'a0000000-0000-0000-0000-000000000016',
  'Textured Cream Bouclé',
  'SKU-PRODUCT-16-01',
  940,
  '#F2EEE5',
  '15920869',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0016-0000-000000000001',
  'b0000000-0000-0016-0000-000000000001',
  20,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0016-0000-000000000002',
  'a0000000-0000-0000-0000-000000000016',
  'Terracotta Rust',
  'SKU-PRODUCT-16-02',
  980,
  '#B46B4C',
  '11823948',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0016-0000-000000000002',
  'b0000000-0000-0016-0000-000000000002',
  21,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0016-0000-000000000003',
  'a0000000-0000-0000-0000-000000000016',
  'Forest Moss',
  'SKU-PRODUCT-16-03',
  960,
  '#4A5B47',
  '4873031',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0016-0000-000000000003',
  'b0000000-0000-0016-0000-000000000003',
  22,
  0,
  3
) ON CONFLICT DO NOTHING;

-- Product product-17: Venezia Travertine Floating Vanity & Mirror
INSERT INTO public.products (
  id, showroom_id, name, slug, description, category, room, display_zone, placement_type, dimensions, materials, price, rating, reviews_count
) VALUES (
  'a0000000-0000-0000-0000-000000000017',
  'product-17',
  'Venezia Travertine Floating Vanity & Mirror',
  'venezia-travertine-floating-vanity-mirror',
  'Wall-hung architectural vanity featuring a solid carved Roman travertine countertop, dual integrated Calacatta stone basin troughs, and a backlit ambient LED pill mirror.',
  'Bathroom Fixtures',
  'Luxury Bathroom',
  'Spa Vanity Wall',
  'Built-in Wall Sections',
  'Vanity: 180×54×35cm | Mirror: 160×95×3cm',
  'Roman Travertine, Calacatta Gold marble, matte black brass fixtures',
  1980,
  4.8,
  14
) ON CONFLICT (showroom_id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0017-0000-000000000001',
  'a0000000-0000-0000-0000-000000000017',
  'Beige Roman Travertine',
  'SKU-PRODUCT-17-01',
  1980,
  '#DFD6C0',
  '14669504',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0017-0000-000000000001',
  'b0000000-0000-0017-0000-000000000001',
  21,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0017-0000-000000000002',
  'a0000000-0000-0000-0000-000000000017',
  'Nero Marquina Stone',
  'SKU-PRODUCT-17-02',
  2150,
  '#232426',
  '2303014',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0017-0000-000000000002',
  'b0000000-0000-0017-0000-000000000002',
  22,
  0,
  3
) ON CONFLICT DO NOTHING;

-- Product product-18: Grand Pivot Architectural Timber Door
INSERT INTO public.products (
  id, showroom_id, name, slug, description, category, room, display_zone, placement_type, dimensions, materials, price, rating, reviews_count
) VALUES (
  'a0000000-0000-0000-0000-000000000018',
  'product-18',
  'Grand Pivot Architectural Timber Door',
  'grand-pivot-architectural-timber-door',
  'Monumental 2.8m oversized pivot entrance door with vertical fluted teak battens, concealed FritsJurgens pivot hinge, and 1.8m brushed brass pull.',
  'Architectural Joinery',
  'Main Entrance & Porch',
  'Main Architectural Entry Portico',
  'Dedicated Architectural Display Areas',
  'W: 164cm × H: 276cm × D: 8cm',
  'Solid Burmese Teak, insulated thermal core, brushed champagne brass pull',
  3200,
  5,
  29
) ON CONFLICT (showroom_id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0018-0000-000000000001',
  'a0000000-0000-0000-0000-000000000018',
  'Warm Natural Teak',
  'SKU-PRODUCT-18-01',
  3200,
  '#A7784E',
  '10975310',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0018-0000-000000000001',
  'b0000000-0000-0018-0000-000000000001',
  22,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0018-0000-000000000002',
  'a0000000-0000-0000-0000-000000000018',
  'Charred Yakisugi Black',
  'SKU-PRODUCT-18-02',
  3350,
  '#222325',
  '2237221',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0018-0000-000000000002',
  'b0000000-0000-0018-0000-000000000002',
  23,
  0,
  3
) ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (
  id, product_id, title, sku, price, hex, color3, available_for_sale
) VALUES (
  'b0000000-0000-0018-0000-000000000003',
  'a0000000-0000-0000-0000-000000000018',
  'Dark Smoked Walnut',
  'SKU-PRODUCT-18-03',
  3300,
  '#4B382A',
  '4929578',
  true
) ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.inventory (
  id, variant_id, stock_quantity, reserved_quantity, low_stock_threshold
) VALUES (
  'c0000000-0000-0018-0000-000000000003',
  'b0000000-0000-0018-0000-000000000003',
  24,
  0,
  3
) ON CONFLICT DO NOTHING;
