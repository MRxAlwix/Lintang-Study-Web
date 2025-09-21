-- Supabase schema core for Lintang Study
create table profiles (
  id uuid references auth.users(id) on delete cascade,
  username text unique,
  full_name text,
  role text default 'user',
  is_premium boolean default false,
  created_at timestamptz default now(),
  primary key (id)
);

create table categories (
  id serial primary key,
  name text not null
);

create table courses (
  id serial primary key,
  category_id int references categories(id),
  title text not null,
  slug text unique,
  description text,
  is_premium boolean default false,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

create table modules (
  id serial primary key,
  course_id int references courses(id) on delete cascade,
  title text not null,
  description text,
  video_url text,
  order_num int default 0,
  required boolean default true
);

create table progress (
  id serial primary key,
  user_id uuid references profiles(id) on delete cascade,
  module_id int references modules(id) on delete cascade,
  completed boolean default false,
  completed_at timestamptz
);

create table comments (
  id serial primary key,
  user_id uuid references profiles(id),
  module_id int references modules(id),
  content text,
  created_at timestamptz default now()
);
