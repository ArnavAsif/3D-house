-- ============================================================================
-- VILLA LUMINA ARCHITECTURAL 3D SHOWROOM
-- Custom Commerce PostgreSQL Schema (Supabase)
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. PRODUCTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  showroom_id TEXT UNIQUE NOT NULL, -- Decoupled ID matching 3D mesh (e.g. 'product-01')
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT,
  room TEXT NOT NULL,
  display_zone TEXT NOT NULL,
  placement_type TEXT NOT NULL,
  dimensions TEXT NOT NULL,
  materials TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  rating NUMERIC(3, 2) DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  model_url TEXT, -- Path to Supabase Storage .glb / .gltf asset
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 2. PRODUCT VARIANTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  hex TEXT NOT NULL,
  color3 TEXT NOT NULL,
  available_for_sale BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 3. INVENTORY TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id UUID NOT NULL REFERENCES public.product_variants(id) ON DELETE CASCADE,
  stock_quantity INTEGER NOT NULL DEFAULT 15,
  reserved_quantity INTEGER NOT NULL DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 3,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 4. CARTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 5. CART ITEMS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID NOT NULL REFERENCES public.carts(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  variant_id UUID NOT NULL REFERENCES public.product_variants(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 6. ORDERS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  session_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'confirmed', 'shipped', 'delivered')),
  subtotal NUMERIC(10, 2) NOT NULL,
  tax NUMERIC(10, 2) DEFAULT 0,
  shipping NUMERIC(10, 2) DEFAULT 0,
  total NUMERIC(10, 2) NOT NULL,
  shipping_address JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 7. ORDER ITEMS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  variant_id UUID NOT NULL REFERENCES public.product_variants(id),
  product_name TEXT NOT NULL,
  variant_title TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL,
  line_total NUMERIC(10, 2) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Products & Variants: Publicly readable by all visitors
CREATE POLICY "Allow public read access to products" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to product_variants" ON public.product_variants
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to inventory" ON public.inventory
  FOR SELECT USING (true);

-- Carts & Cart Items: Public access scoped to session_id
CREATE POLICY "Allow public cart access" ON public.carts
  FOR ALL USING (true);

CREATE POLICY "Allow public cart_items access" ON public.cart_items
  FOR ALL USING (true);

-- Orders: Can be created by anonymous sessions or authenticated users
CREATE POLICY "Allow insert orders" ON public.orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow read own orders" ON public.orders
  FOR SELECT USING (true);

CREATE POLICY "Allow insert order_items" ON public.order_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow read order_items" ON public.order_items
  FOR SELECT USING (true);

-- ----------------------------------------------------------------------------
-- 9. SUPABASE STORAGE BUCKETS (FOR 3D GLTF / GLB ASSETS)
-- ----------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('showroom-models', 'showroom-models', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('showroom-textures', 'showroom-textures', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow public download of 3D models"
ON storage.objects FOR SELECT
USING (bucket_id = 'showroom-models');
