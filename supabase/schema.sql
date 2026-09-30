-- ============================================================================
-- VILLA LUMINA ARCHITECTURAL 3D SHOWROOM
-- Complete Production Database Architecture (Supabase PostgreSQL)
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Clean schema teardown for fresh migrations (cascade safely)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.set_updated_at() CASCADE;
DROP FUNCTION IF EXISTS public.create_order_atomic(UUID, TEXT, NUMERIC, NUMERIC, JSONB) CASCADE;

-- ----------------------------------------------------------------------------
-- 1. PROFILES TABLE (Linked to auth.users)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'staff', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.profiles IS 'User profiles synchronized with Supabase Auth';

-- ----------------------------------------------------------------------------
-- 2. CATEGORIES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.categories IS 'Product categories for luxury furniture, lighting, and architectural joinery';

-- ----------------------------------------------------------------------------
-- 3. PRODUCTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  base_price NUMERIC(10, 2) NOT NULL CHECK (base_price >= 0),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.products IS 'Master catalog products decoupled from 3D visual scene';

-- ----------------------------------------------------------------------------
-- 4. PRODUCT VARIANTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'archived')),
  hex TEXT, -- Optional hex swatch for 3D material tinting (e.g. #F2EEE5)
  color3 TEXT, -- Three.js integer/hex color representation
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.product_variants IS 'Product variations (colorways, finishes, materials, sizes)';

-- ----------------------------------------------------------------------------
-- 5. PRODUCT IMAGES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.product_images IS 'High-resolution editorial photography and studio renders';

-- ----------------------------------------------------------------------------
-- 6. INVENTORY TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id UUID UNIQUE NOT NULL REFERENCES public.product_variants(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
  reserved_quantity INTEGER NOT NULL DEFAULT 0 CHECK (reserved_quantity >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT chk_inventory_reserved CHECK (quantity >= reserved_quantity)
);

COMMENT ON TABLE public.inventory IS 'Real-time stock levels with reservation buffer for checkouts';

-- ----------------------------------------------------------------------------
-- 7. SHOWROOM PRODUCTS TABLE (Spatial 3D Placement & Digital Twin)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.showroom_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID UNIQUE NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  model_url TEXT, -- Path to Supabase Storage .glb / .gltf asset
  position_x NUMERIC(8, 3) NOT NULL DEFAULT 0.000,
  position_y NUMERIC(8, 3) NOT NULL DEFAULT 0.000,
  position_z NUMERIC(8, 3) NOT NULL DEFAULT 0.000,
  rotation_x NUMERIC(8, 3) NOT NULL DEFAULT 0.000,
  rotation_y NUMERIC(8, 3) NOT NULL DEFAULT 0.000,
  rotation_z NUMERIC(8, 3) NOT NULL DEFAULT 0.000,
  scale NUMERIC(8, 3) NOT NULL DEFAULT 1.000,
  interaction_radius NUMERIC(8, 3) NOT NULL DEFAULT 1.800,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.showroom_products IS '3D spatial coordinates, interaction envelopes, and GLTF models for WebGL showroom';

-- ----------------------------------------------------------------------------
-- 8. CARTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'abandoned', 'converted')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.carts IS 'Shopping carts supporting both authenticated users and anonymous sessions';

-- ----------------------------------------------------------------------------
-- 9. CART ITEMS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID NOT NULL REFERENCES public.carts(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  variant_id UUID NOT NULL REFERENCES public.product_variants(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_cart_variant UNIQUE (cart_id, variant_id)
);

COMMENT ON TABLE public.cart_items IS 'Line items in active shopping carts';

-- ----------------------------------------------------------------------------
-- 10. ORDERS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  order_number TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'completed', 'cancelled')),
  subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),
  total NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.orders IS 'Completed customer purchases with server-verified totals';

-- ----------------------------------------------------------------------------
-- 11. ORDER ITEMS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  variant_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.order_items IS 'Immutable line items of confirmed orders';

-- ============================================================================
-- INDEXES FOR QUERY OPTIMIZATION
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);

CREATE INDEX IF NOT EXISTS idx_variants_product ON public.product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_variants_sku ON public.product_variants(sku);
CREATE INDEX IF NOT EXISTS idx_variants_status ON public.product_variants(status);

CREATE INDEX IF NOT EXISTS idx_images_product ON public.product_images(product_id, sort_order);

CREATE INDEX IF NOT EXISTS idx_inventory_variant ON public.inventory(variant_id);

CREATE INDEX IF NOT EXISTS idx_showroom_product ON public.showroom_products(product_id);
CREATE INDEX IF NOT EXISTS idx_showroom_active ON public.showroom_products(is_active);

CREATE INDEX IF NOT EXISTS idx_carts_session ON public.carts(session_id);
CREATE INDEX IF NOT EXISTS idx_carts_user ON public.carts(user_id);
CREATE INDEX IF NOT EXISTS idx_carts_status ON public.carts(status);

CREATE INDEX IF NOT EXISTS idx_cart_items_cart ON public.cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_variant ON public.cart_items(variant_id);

CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_number ON public.orders(order_number);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);

-- ============================================================================
-- AUTOMATIC UPDATED_AT TRIGGER FUNCTION
-- ============================================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_product_variants_updated_at BEFORE UPDATE ON public.product_variants FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_inventory_updated_at BEFORE UPDATE ON public.inventory FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_showroom_products_updated_at BEFORE UPDATE ON public.showroom_products FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_carts_updated_at BEFORE UPDATE ON public.carts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_cart_items_updated_at BEFORE UPDATE ON public.cart_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto create profile on auth.users sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'customer'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.showroom_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 1. Profiles: Customers can only read and edit their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 2. Categories: Public read-only
CREATE POLICY "Public can read categories"
  ON public.categories FOR SELECT
  USING (true);

-- 3. Products: Public can read active catalog products
CREATE POLICY "Public can read active products"
  ON public.products FOR SELECT
  USING (status = 'active');

-- 4. Product Variants: Public can read active variants
CREATE POLICY "Public can read active variants"
  ON public.product_variants FOR SELECT
  USING (status = 'active');

-- 5. Product Images: Public read-only
CREATE POLICY "Public can read product images"
  ON public.product_images FOR SELECT
  USING (true);

-- 6. Showroom Products: Public can read active 3D coordinates & digital twins
CREATE POLICY "Public can read active showroom products"
  ON public.showroom_products FOR SELECT
  USING (is_active = true);

-- 7. Inventory: SECURE ACCESS (Clients CANNOT directly update/insert/delete inventory)
-- Public can only inspect available quantity
CREATE POLICY "Public can read inventory availability"
  ON public.inventory FOR SELECT
  USING (true);

-- Explicitly NO client INSERT, UPDATE, or DELETE on inventory!
-- Only service_role can modify inventory during backend order processing.

-- 8. Carts: Users manage their own carts by session_id or user_id
CREATE POLICY "Users can read own cart"
  ON public.carts FOR SELECT
  USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can insert own cart"
  ON public.carts FOR INSERT
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can update own cart"
  ON public.carts FOR UPDATE
  USING (user_id = auth.uid() OR user_id IS NULL);

-- 9. Cart Items: Users manage their own cart line items
CREATE POLICY "Users can read own cart items"
  ON public.cart_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.carts
      WHERE carts.id = cart_items.cart_id
      AND (carts.user_id = auth.uid() OR carts.user_id IS NULL)
    )
  );

CREATE POLICY "Users can insert own cart items"
  ON public.cart_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.carts
      WHERE carts.id = cart_items.cart_id
      AND (carts.user_id = auth.uid() OR carts.user_id IS NULL)
    )
  );

CREATE POLICY "Users can update own cart items"
  ON public.cart_items FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.carts
      WHERE carts.id = cart_items.cart_id
      AND (carts.user_id = auth.uid() OR carts.user_id IS NULL)
    )
  );

CREATE POLICY "Users can delete own cart items"
  ON public.cart_items FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.carts
      WHERE carts.id = cart_items.cart_id
      AND (carts.user_id = auth.uid() OR carts.user_id IS NULL)
    )
  );

-- 10. Orders: STRICT SECURITY (Clients CANNOT directly insert or modify orders)
-- Customers can only read orders they own
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (user_id = auth.uid());

-- NO client INSERT, UPDATE, or DELETE on orders!
-- Orders must ONLY be generated by server-side Route Handlers/Server Actions
-- with service_role to verify catalog prices, calculate tax, and record totals securely.

-- 11. Order Items: Customers can only view items of orders they own
CREATE POLICY "Users can view own order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- NO client INSERT, UPDATE, or DELETE on order_items!

-- ============================================================================
-- STORAGE BUCKETS SETUP
-- ============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('showroom-models', 'showroom-models', true),
  ('showroom-textures', 'showroom-textures', true),
  ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access to storage buckets
CREATE POLICY "Public read for showroom models"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('showroom-models', 'showroom-textures', 'product-images'));
