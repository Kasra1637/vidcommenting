/*
  # Create initial schema for Rumora video commenting platform

  1. New Tables
    - `brands`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text, not null)
      - `description` (text)
      - `target_audience` (text)
      - `unique_value` (text)
      - `keywords` (text array)
      - `industry` (text)
      - `brand_type` (text)
      - `reach` (integer, default 0)
      - `videos` (integer, default 0)
      - `performing` (integer, default 0)
      - `stagnated` (integer, default 0)
      - `needs_boost` (integer, default 0)
      - `inactive` (integer, default 0)
      - `created_at` (timestamptz, default now())

    - `videos`
      - `id` (uuid, primary key)
      - `brand_id` (uuid, references brands)
      - `user_id` (uuid, references auth.users)
      - `title` (text, not null)
      - `channel` (text, not null)
      - `platform` (text, default 'youtube')
      - `url` (text)
      - `description` (text)
      - `views` (integer, default 0)
      - `likes` (integer, default 0)
      - `status` (text, default 'pending')
      - `created_at` (timestamptz, default now())

    - `comments`
      - `id` (uuid, primary key)
      - `video_id` (uuid, references videos)
      - `brand_id` (uuid, references brands)
      - `user_id` (uuid, references auth.users)
      - `text` (text, not null)
      - `tone` (text)
      - `personality` (text)
      - `authenticity_score` (integer)
      - `quality_score` (integer)
      - `relevance_score` (integer)
      - `approved` (boolean, default false)
      - `posted` (boolean, default false)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data

  3. Important Notes
    - All tables use UUID primary keys for better security
    - user_id columns link to auth.users for RLS enforcement
    - Indexes added on frequently queried foreign key columns
*/

CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  name text NOT NULL,
  description text DEFAULT '',
  target_audience text DEFAULT '',
  unique_value text DEFAULT '',
  keywords text[] DEFAULT '{}',
  industry text DEFAULT '',
  brand_type text DEFAULT '',
  reach integer DEFAULT 0,
  videos integer DEFAULT 0,
  performing integer DEFAULT 0,
  stagnated integer DEFAULT 0,
  needs_boost integer DEFAULT 0,
  inactive integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own brands"
  ON brands FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own brands"
  ON brands FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own brands"
  ON brands FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own brands"
  ON brands FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid REFERENCES brands(id),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  title text NOT NULL,
  channel text NOT NULL,
  platform text DEFAULT 'youtube',
  url text DEFAULT '',
  description text DEFAULT '',
  views integer DEFAULT 0,
  likes integer DEFAULT 0,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own videos"
  ON videos FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own videos"
  ON videos FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own videos"
  ON videos FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own videos"
  ON videos FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos(id),
  brand_id uuid REFERENCES brands(id),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  text text NOT NULL,
  tone text DEFAULT '',
  personality text DEFAULT '',
  authenticity_score integer DEFAULT 0,
  quality_score integer DEFAULT 0,
  relevance_score integer DEFAULT 0,
  approved boolean DEFAULT false,
  posted boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own comments"
  ON comments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_brands_user_id ON brands(user_id);
CREATE INDEX IF NOT EXISTS idx_videos_brand_id ON videos(brand_id);
CREATE INDEX IF NOT EXISTS idx_videos_user_id ON videos(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_video_id ON comments(video_id);
CREATE INDEX IF NOT EXISTS idx_comments_brand_id ON comments(brand_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
