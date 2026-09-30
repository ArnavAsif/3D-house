-- ============================================================================
-- VILLA LUMINA ARCHITECTURAL 3D SHOWROOM
-- Complete Production Seed Data (Supabase PostgreSQL)
-- ============================================================================

-- Clean existing data
TRUNCATE TABLE public.order_items CASCADE;
TRUNCATE TABLE public.orders CASCADE;
TRUNCATE TABLE public.cart_items CASCADE;
TRUNCATE TABLE public.carts CASCADE;
TRUNCATE TABLE public.showroom_products CASCADE;
TRUNCATE TABLE public.inventory CASCADE;
TRUNCATE TABLE public.product_images CASCADE;
TRUNCATE TABLE public.product_variants CASCADE;
TRUNCATE TABLE public.products CASCADE;
TRUNCATE TABLE public.categories CASCADE;

-- ----------------------------------------------------------------------------
-- 1. CATEGORIES SEED DATA
-- ----------------------------------------------------------------------------
INSERT INTO public.categories (id, name, slug, description, image_url, sort_order)
VALUES
  ('c0000000-0000-0000-0000-000000000001', 'Living Room', 'living-room', 'Sculptural lounge seating, coffee tables, and contemporary rugs', '/images/categories/living.jpg', 1),
  ('c0000000-0000-0000-0000-000000000002', 'Dining Room', 'dining-room', 'Solid hardwood dining tables, tailored armchairs, and linear luminaires', '/images/categories/dining.jpg', 2),
  ('c0000000-0000-0000-0000-000000000003', 'Modern Kitchen', 'kitchen', 'Calacatta waterfall islands, leather barstools, and artisanal cookware', '/images/categories/kitchen.jpg', 3),
  ('c0000000-0000-0000-0000-000000000004', 'Showroom Suite & Bedroom', 'bedroom', 'Minimalist platform beds, organic bouclé lounge chairs, and nightstands', '/images/categories/bedroom.jpg', 4),
  ('c0000000-0000-0000-0000-000000000005', 'Spa Bathroom', 'bathroom', 'Wall-hung travertine vanities, integrated stone basins, and brass fixtures', '/images/categories/bathroom.jpg', 5),
  ('c0000000-0000-0000-0000-000000000006', 'Architectural Joinery & Lighting', 'architectural-joinery', 'Grand pivot timber doors, cantilever arc lamps, and cove LED fixtures', '/images/categories/joinery.jpg', 6);

-- ----------------------------------------------------------------------------
-- 2. PRODUCTS SEED DATA (All 18 Villa Lumina Showroom Pieces)
-- ----------------------------------------------------------------------------
INSERT INTO public.products (id, category_id, name, slug, description, short_description, base_price, status)
VALUES
  (
    'p0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'Aura Modern Lounge Chair',
    'aura-modern-lounge-chair',
    'A stylish and comfortable sculptural lounge chair with premium upholstery and solid smoked wood legs. Designed for ergonomic comfort and modern luxury aesthetics.',
    'Sculptural bouclé lounge chair with smoked wood legs',
    499.00,
    'active'
  ),
  (
    'p0000000-0000-0000-0000-000000000002',
    'c0000000-0000-0000-0000-000000000001',
    'Monolith Low Travertine Coffee Table',
    'monolith-low-travertine-coffee-table',
    'Monolithic low profile coffee table carved from authentic Roman travertine. Features dual offset cantilever tiers and a honed matte tactile finish.',
    'Dual-tier Roman travertine low coffee table',
    890.00,
    'active'
  ),
  (
    'p0000000-0000-0000-0000-000000000003',
    'c0000000-0000-0000-0000-000000000001',
    'Curved Boucle Modular Sectional Sofa',
    'curved-boucle-modular-sectional-sofa',
    'Curvilinear 3-piece modular sectional upholstered in heavy textured Italian cream bouclé. Low-slung silhouette on an architectural natural oak reveal plinth.',
    'Curved 3-piece Italian cream bouclé sectional sofa',
    3450.00,
    'active'
  ),
  (
    'p0000000-0000-0000-0000-000000000004',
    'c0000000-0000-0000-0000-000000000006',
    'Lumina Cantilever Arc Floor Lamp',
    'lumina-cantilever-arc-floor-lamp',
    'Sweeping 2.3m architectural floor lamp featuring a counterbalanced matte black steel arm anchored into a solid cylindrical Nero Marquina marble base.',
    'Sweeping cantilever floor lamp on Nero Marquina marble base',
    680.00,
    'active'
  ),
  (
    'p0000000-0000-0000-0000-000000000005',
    'c0000000-0000-0000-0000-000000000006',
    'Nordic Ribbed Ceramic Table Lamp',
    'nordic-ribbed-ceramic-table-lamp',
    'Artisanal handcrafted ribbed earthenware table lamp with warm parchment drum shade and rotary brass dimmer.',
    'Handcrafted ribbed ceramic lamp with warm parchment shade',
    240.00,
    'active'
  ),
  (
    'p0000000-0000-0000-0000-000000000006',
    'c0000000-0000-0000-0000-000000000001',
    'Acoustic Fluted Oak Wall Console & Media Shelving',
    'acoustic-fluted-oak-wall-console',
    'Full-height architectural slat wall panelling in American white oak with integrated floating walnut media credenza, bronze shadowline reveals, and warm perimeter LED backlighting.',
    'Architectural fluted white oak media console with bronze shadowline',
    2150.00,
    'active'
  ),
  (
    'p0000000-0000-0000-0000-000000000007',
    'c0000000-0000-0000-0000-000000000001',
    'Brutalist Cast Bronze Entry Pedestal',
    'brutalist-cast-bronze-entry-pedestal',
    'Monumental entry plinth in cast gunmetal bronze displaying a museum-grade patinated bronze sculptural bowl.',
    'Brutalist entry plinth in patinated cast bronze',
    1450.00,
    'active'
  ),
  (
    'p0000000-0000-0000-0000-000000000008',
    'c0000000-0000-0000-0000-000000000001',
    'Calacatta Fluted Ceramic Floor Vase',
    'calacatta-fluted-ceramic-floor-vase',
    'Grand 85cm architectural ceramic vessel featuring fine vertical fluting, raw matte chalk finish, and wild olive branches.',
    'Grand 85cm fluted ceramic floor vase with raw chalk finish',
    380.00,
    'active'
  ),
  (
    'p0000000-0000-0000-0000-000000000009',
    'c0000000-0000-0000-0000-000000000002',
    'Milano Solid Walnut 8-Seater Dining Table',
    'milano-solid-walnut-dining-table',
    'Grand dining table crafted from 50mm thick kiln-dried American black walnut with organic chamfered edge profile and architectural slab pedestals with brushed brass spacers.',
    'Kiln-dried American black walnut 8-seater dining table',
    3200.00,
    'active'
  ),
  (
    'p0000000-0000-0000-0000-000000000010',
    'c0000000-0000-0000-0000-000000000002',
    'Tailored Upholstered Dining Armchair Set',
    'tailored-upholstered-dining-armchair-set',
    'Pair of bespoke dining armchairs featuring tailored oat linen barrel backs and tapered smoked walnut timber legs with brass caps.',
    'Pair of bespoke oat linen dining armchairs with walnut legs',
    1150.00,
    'active'
  ),
  (
    'p0000000-0000-0000-0000-000000000011',
    'c0000000-0000-0000-0000-000000000006',
    'Linear Architectural Suspended Luminaire',
    'linear-architectural-suspended-luminaire',
    'Ultra-slim 2.4m suspended architectural luminaire finished in brushed champagne brass with dual direct/indirect 2700K glare-free micro-prismatic optics.',
    'Ultra-slim 2.4m linear pendant in champagne brass',
    820.00,
    'active'
  ),
  (
    'p0000000-0000-0000-0000-000000000012',
    'c0000000-0000-0000-0000-000000000003',
    'Calacatta Gold Waterfall Kitchen Island',
    'calacatta-gold-waterfall-kitchen-island',
    'Monolithic 3.2m kitchen island in honed Italian Calacatta Gold marble with mitred waterfall gables, push-to-open charcoal cabinetry, and architectural gooseneck faucet.',
    'Monolithic 3.2m Calacatta Gold marble waterfall kitchen island',
    4800.00,
    'active'
  ),
  (
    'p0000000-0000-0000-0000-000000000013',
    'c0000000-0000-0000-0000-000000000003',
    'Linea Leather Counter Barstool Set',
    'linea-leather-counter-barstool-set',
    'Set of 2 modern counter-height barstools with saddle-stitched cognac Italian leather seats, matte black steel sled frames, and integrated brass footrails.',
    'Set of 2 cognac Italian leather counter-height barstools',
    760.00,
    'active'
  ),
  (
    'p0000000-0000-0000-0000-000000000014',
    'c0000000-0000-0000-0000-000000000003',
    'Artisanal Footed Ceramic Bowl & Marble Mortar',
    'artisanal-ceramic-bowl-marble-mortar',
    'Curated culinary duo featuring an artisanal footed stoneware fruit bowl and a solid carved Calacatta marble mortar with pestle.',
    'Artisanal footed stoneware bowl with solid Calacatta marble mortar',
    195.00,
    'active'
  ),
  (
    'p0000000-0000-0000-0000-000000000015',
    'c0000000-0000-0000-0000-000000000004',
    'Kyoto Floating Oak Platform Bed',
    'kyoto-floating-oak-platform-bed',
    'Zen-inspired king size platform bed frame in rift-cut white oak featuring integrated floating nightstands, linen headboard, and under-bed floating LED nightlight.',
    'Zen rift-cut white oak floating king platform bed',
    2650.00,
    'active'
  ),
  (
    'p0000000-0000-0000-0000-000000000016',
    'c0000000-0000-0000-0000-000000000004',
    'Palma Organic Boucle Armchair & Side Table',
    'palma-organic-boucle-armchair',
    'Sculptural organic lounge chair featuring wrapped pillowed armrests, 360-degree silent swivel plinth, and a companion solid Roman travertine drink pedestal table.',
    'Sculptural swivel bouclé armchair with solid travertine pedestal',
    940.00,
    'active'
  ),
  (
    'p0000000-0000-0000-0000-000000000017',
    'c0000000-0000-0000-0000-000000000005',
    'Venezia Travertine Floating Vanity & Mirror',
    'venezia-travertine-floating-vanity',
    'Wall-hung architectural vanity featuring a solid carved Roman travertine countertop, dual integrated Calacatta stone basin troughs, and a backlit ambient LED pill mirror.',
    'Wall-hung Roman travertine double vanity with backlit LED mirror',
    1980.00,
    'active'
  ),
  (
    'p0000000-0000-0000-0000-000000000018',
    'c0000000-0000-0000-0000-000000000006',
    'Grand Pivot Architectural Timber Door',
    'grand-pivot-architectural-timber-door',
    'Monumental 2.8m oversized pivot entrance door with vertical fluted teak battens, concealed FritsJurgens pivot hinge, and 1.8m brushed brass pull.',
    'Monumental 2.8m fluted teak pivot entrance door',
    3200.00,
    'active'
  );

-- ----------------------------------------------------------------------------
-- 3. PRODUCT VARIANTS SEED DATA
-- ----------------------------------------------------------------------------
INSERT INTO public.product_variants (id, product_id, name, sku, price, status, hex, color3)
VALUES
  -- Aura Modern Lounge Chair (p01)
  ('v0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', 'Oatmeal Cream', 'AURA-OAT-01', 499.00, 'active', '#F2EEE5', '15920869'),
  ('v0000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000001', 'Saddle Leather', 'AURA-SAD-02', 549.00, 'active', '#93552E', '9655598'),
  ('v0000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000001', 'Charcoal Velvet', 'AURA-CHA-03', 519.00, 'active', '#2E2F32', '3026738'),
  ('v0000000-0000-0000-0000-000000000004', 'p0000000-0000-0000-0000-000000000001', 'Olive Linen', 'AURA-OLI-04', 499.00, 'active', '#5E664E', '6186574'),

  -- Monolith Coffee Table (p02)
  ('v0000000-0000-0000-0000-000000000005', 'p0000000-0000-0000-0000-000000000002', 'Classic Beige Travertine', 'MONO-TRAV-01', 890.00, 'active', '#DED7CA', '14604234'),
  ('v0000000-0000-0000-0000-000000000006', 'p0000000-0000-0000-0000-000000000002', 'Silver Ash Travertine', 'MONO-ASH-02', 960.00, 'active', '#B4B0A8', '11841704'),

  -- Curved Boucle Sectional (p03)
  ('v0000000-0000-0000-0000-000000000007', 'p0000000-0000-0000-0000-000000000003', 'Natural Chalk Boucle', 'SOFA-BOU-01', 3450.00, 'active', '#EFECE6', '15723750'),
  ('v0000000-0000-0000-0000-000000000008', 'p0000000-0000-0000-0000-000000000003', 'Warm Greige Texture', 'SOFA-GRE-02', 3650.00, 'active', '#C9C2B5', '13222581'),

  -- Lumina Arc Lamp (p04)
  ('v0000000-0000-0000-0000-000000000009', 'p0000000-0000-0000-0000-000000000004', 'Matte Black / Nero Marquina', 'ARC-BLK-01', 680.00, 'active', '#1E1F22', '1974050'),
  ('v0000000-0000-0000-0000-000000000010', 'p0000000-0000-0000-0000-000000000004', 'Champagne Brass / Carrara', 'ARC-BRS-02', 740.00, 'active', '#C8A462', '13149282'),

  -- Ceramic Table Lamp (p05)
  ('v0000000-0000-0000-0000-000000000011', 'p0000000-0000-0000-0000-000000000005', 'Bone White Ribbed', 'NORD-WHT-01', 240.00, 'active', '#F5F3EE', '16118766'),
  ('v0000000-0000-0000-0000-000000000012', 'p0000000-0000-0000-0000-000000000005', 'Terracotta Wash', 'NORD-TER-02', 260.00, 'active', '#B46B4C', '11823948'),

  -- Fluted Media Console (p06)
  ('v0000000-0000-0000-0000-000000000013', 'p0000000-0000-0000-0000-000000000006', 'Natural White Oak / Walnut', 'MEDIA-OAK-01', 2150.00, 'active', '#8C6747', '9201479'),

  -- Bronze Entry Pedestal (p07)
  ('v0000000-0000-0000-0000-000000000007', 'p0000000-0000-0000-0000-000000000007', 'Hand-Rubbed Statuary Bronze', 'PED-BRZ-01', 1450.00, 'active', '#483C32', '4734002'),

  -- Calacatta Ceramic Vase (p08)
  ('v0000000-0000-0000-0000-000000000008', 'p0000000-0000-0000-0000-000000000008', 'Matte Chalk White', 'VASE-WHT-01', 380.00, 'active', '#F8F6F0', '16316144'),

  -- Milano Dining Table (p09)
  ('v0000000-0000-0000-0000-000000000009', 'p0000000-0000-0000-0000-000000000009', 'Smoked American Walnut', 'MIL-WAL-01', 3200.00, 'active', '#5A3D28', '5913896'),
  ('v0000000-0000-0000-0000-000000000010', 'p0000000-0000-0000-0000-000000000009', 'Bleached European Oak', 'MIL-OAK-02', 3100.00, 'active', '#C4B49E', '12891294'),

  -- Dining Armchair Set (p10)
  ('v0000000-0000-0000-0000-000000000018', 'p0000000-0000-0000-0000-000000000010', 'Oat Linen & Smoked Walnut', 'CHAIR-OAT-01', 1150.00, 'active', '#D8CEBC', '14208700'),
  ('v0000000-0000-0000-0000-000000000019', 'p0000000-0000-0000-0000-000000000010', 'Saddle Brown & Smoked Walnut', 'CHAIR-SAD-02', 1280.00, 'active', '#8C522D', '9196077'),

  -- Linear Suspended Luminaire (p11)
  ('v0000000-0000-0000-0000-000000000020', 'p0000000-0000-0000-0000-000000000011', 'Brushed Champagne Brass', 'LIN-BRS-01', 820.00, 'active', '#C8A462', '13149282'),

  -- Kitchen Waterfall Island (p12)
  ('v0000000-0000-0000-0000-000000000021', 'p0000000-0000-0000-0000-000000000012', 'Honed Calacatta Gold Marble', 'ISL-CAL-01', 4800.00, 'active', '#EFECE6', '15723750'),

  -- Linea Leather Barstools (p13)
  ('v0000000-0000-0000-0000-000000000022', 'p0000000-0000-0000-0000-000000000013', 'Cognac Saddle Leather', 'STOOL-COG-01', 760.00, 'active', '#9A5B32', '10115890'),

  -- Ceramic Bowl & Mortar (p14)
  ('v0000000-0000-0000-0000-000000000023', 'p0000000-0000-0000-0000-000000000014', 'Calacatta & Stoneware White', 'CUL-DUO-01', 195.00, 'active', '#EFECE6', '15723750'),

  -- Kyoto Platform Bed (p15)
  ('v0000000-0000-0000-0000-000000000024', 'p0000000-0000-0000-0000-000000000015', 'Rift-Cut White Oak', 'BED-OAK-01', 2650.00, 'active', '#D2C2A8', '13812392'),
  ('v0000000-0000-0000-0000-000000000025', 'p0000000-0000-0000-0000-000000000015', 'Dark Smoked Walnut', 'BED-WAL-02', 2850.00, 'active', '#4A3728', '4863784'),

  -- Palma Swivel Armchair (p16)
  ('v0000000-0000-0000-0000-000000000026', 'p0000000-0000-0000-0000-000000000016', 'Chalk Cream Boucle', 'PALM-BOU-01', 940.00, 'active', '#EFECE6', '15723750'),

  -- Venezia Travertine Vanity (p17)
  ('v0000000-0000-0000-0000-000000000027', 'p0000000-0000-0000-0000-000000000017', 'Roman Travertine & Matte Black', 'VAN-TRAV-01', 1980.00, 'active', '#DED7CA', '14604234'),

  -- Grand Pivot Timber Door (p18)
  ('v0000000-0000-0000-0000-000000000028', 'p0000000-0000-0000-0000-000000000018', 'Vertical Fluted Burmese Teak', 'DOOR-TEAK-01', 3200.00, 'active', '#8C5A32', '9198130');

-- ----------------------------------------------------------------------------
-- 4. PRODUCT IMAGES SEED DATA
-- ----------------------------------------------------------------------------
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order)
SELECT
  gen_random_uuid(),
  id,
  '/images/products/' || slug || '-main.jpg',
  name || ' - Architectural Visualization',
  1
FROM public.products;

-- ----------------------------------------------------------------------------
-- 5. INVENTORY SEED DATA
-- ----------------------------------------------------------------------------
INSERT INTO public.inventory (id, variant_id, quantity, reserved_quantity)
SELECT
  gen_random_uuid(),
  id,
  20, -- 20 in stock
  0   -- 0 reserved
FROM public.product_variants;

-- ----------------------------------------------------------------------------
-- 6. SHOWROOM PRODUCTS SEED DATA (3D Digital Twin Coordinates & Interaction)
-- ----------------------------------------------------------------------------
INSERT INTO public.showroom_products (
  id,
  product_id,
  model_url,
  position_x,
  position_y,
  position_z,
  rotation_x,
  rotation_y,
  rotation_z,
  scale,
  interaction_radius,
  is_active
)
VALUES
  ('s0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', '/models/aura-chair.glb', -3.200, 0.380, 1.400, 0.000, 0.000, 0.000, 1.000, 1.800, true),
  ('s0000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000002', '/models/monolith-table.glb', -5.200, 0.280, 2.400, 0.000, 0.000, 0.000, 1.000, 1.600, true),
  ('s0000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000003', '/models/curved-sofa.glb', -6.200, 0.400, 3.200, 0.000, 0.000, 0.000, 1.000, 2.600, true),
  ('s0000000-0000-0000-0000-000000000004', 'p0000000-0000-0000-0000-000000000004', '/models/arc-lamp.glb', -7.800, 1.150, 4.200, 0.000, 0.000, 0.000, 1.000, 1.800, true),
  ('s0000000-0000-0000-0000-000000000005', 'p0000000-0000-0000-0000-000000000005', '/models/ceramic-lamp.glb', -5.300, 0.350, 2.350, 0.000, 0.000, 0.000, 1.000, 1.400, true),
  ('s0000000-0000-0000-0000-000000000006', 'p0000000-0000-0000-0000-000000000006', '/models/media-wall.glb', -7.150, 1.400, -1.400, 0.000, 0.000, 0.000, 1.000, 2.200, true),
  ('s0000000-0000-0000-0000-000000000007', 'p0000000-0000-0000-0000-000000000007', '/models/bronze-pedestal.glb', 1.400, 0.550, 5.200, 0.000, 0.000, 0.000, 1.000, 1.800, true),
  ('s0000000-0000-0000-0000-000000000008', 'p0000000-0000-0000-0000-000000000008', '/models/ceramic-vase.glb', -1.400, 0.420, 5.200, 0.000, 0.000, 0.000, 1.000, 1.800, true),
  ('s0000000-0000-0000-0000-000000000009', 'p0000000-0000-0000-0000-000000000009', '/models/dining-table.glb', 5.800, 0.380, 4.000, 0.000, 0.000, 0.000, 1.000, 2.400, true),
  ('s0000000-0000-0000-0000-000000000010', 'p0000000-0000-0000-0000-000000000010', '/models/dining-chair.glb', 4.500, 0.420, 3.400, 0.000, 0.000, 0.000, 1.000, 1.600, true),
  ('s0000000-0000-0000-0000-000000000011', 'p0000000-0000-0000-0000-000000000011', '/models/linear-pendant.glb', 5.800, 2.300, 4.000, 0.000, 0.000, 0.000, 1.000, 2.200, true),
  ('s0000000-0000-0000-0000-000000000012', 'p0000000-0000-0000-0000-000000000012', '/models/kitchen-island.glb', 5.800, 0.460, -1.800, 0.000, 0.000, 0.000, 1.000, 2.600, true),
  ('s0000000-0000-0000-0000-000000000013', 'p0000000-0000-0000-0000-000000000013', '/models/leather-barstool.glb', 5.500, 0.350, -1.050, 0.000, 0.000, 0.000, 1.000, 1.600, true),
  ('s0000000-0000-0000-0000-000000000014', 'p0000000-0000-0000-0000-000000000014', '/models/mortar-bowl.glb', 6.400, 0.940, -1.800, 0.000, 0.000, 0.000, 1.000, 1.500, true),
  ('s0000000-0000-0000-0000-000000000015', 'p0000000-0000-0000-0000-000000000015', '/models/kyoto-bed.glb', -6.000, 0.450, -5.400, 0.000, 0.000, 0.000, 1.000, 2.200, true),
  ('s0000000-0000-0000-0000-000000000016', 'p0000000-0000-0000-0000-000000000016', '/models/palma-chair.glb', -3.000, 0.420, -3.200, 0.000, 0.000, 0.000, 1.000, 1.800, true),
  ('s0000000-0000-0000-0000-000000000017', 'p0000000-0000-0000-0000-000000000017', '/models/travertine-vanity.glb', -0.250, 0.600, -7.200, 0.000, 0.000, 0.000, 1.000, 1.800, true),
  ('s0000000-0000-0000-0000-000000000018', 'p0000000-0000-0000-0000-000000000018', '/models/pivot-door.glb', 0.000, 1.400, 6.340, 0.000, 0.000, 0.000, 1.000, 2.500, true);
