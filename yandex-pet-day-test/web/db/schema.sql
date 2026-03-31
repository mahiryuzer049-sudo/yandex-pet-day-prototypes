create extension if not exists pgcrypto;

do $$
begin
  if not exists (
    select 1
    from pg_type
    where typname = 'attendance_format'
  ) then
    create type attendance_format as enum ('offline', 'online');
  end if;
end
$$;

create table if not exists conference_events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  starts_at timestamptz not null,
  venue_name text not null,
  venue_address text not null,
  city text not null,
  stream_enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists conference_registrations (
  id uuid primary key default gen_random_uuid(),
  event_slug text not null references conference_events(slug) on update cascade on delete cascade,
  attendee_name text not null check (char_length(trim(attendee_name)) >= 2),
  email text not null,
  attendance_format attendance_format not null,
  source_variant text not null check (source_variant in ('variant-a', 'variant-b')),
  created_at timestamptz not null default now()
);

create index if not exists conference_registrations_event_slug_idx
  on conference_registrations (event_slug, created_at desc);

insert into conference_events (slug, title, starts_at, venue_name, venue_address, city, stream_enabled)
values (
  'yandex-pet-day-2025',
  'Yandex Pet Day',
  '2025-06-20 11:00:00+03',
  'Академия',
  'Ленинградский проспект 36',
  'Москва',
  true
)
on conflict (slug) do nothing;
