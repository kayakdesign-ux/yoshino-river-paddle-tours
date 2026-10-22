CREATE TABLE public.booking_requests (
 id uuid PRIMARY KEY,
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL,
 contact text NOT NULL,
 preferred_date date NOT NULL,
 departure text NOT NULL CHECK (departure IN ('09:30', '13:30')),
 participants jsonb NOT NULL,
 weight80 integer NOT NULL CHECK (weight80 BETWEEN 0 AND 10),
 total integer NOT NULL CHECK (total BETWEEN 1 AND 60),
 message text NOT NULL
);
GRANT ALL ON public.booking_requests TO service_role;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.booking_requests IS 'Booking enquiries: server-only writes and owner access through Lovable Cloud; no visitor access.';