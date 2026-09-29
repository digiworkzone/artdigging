export type Availability = "Available" | "On inquiry" | "Surfacing soon";

export type Artwork = {
  slug: string;
  title: string;
  artistSlug: string;
  year: number;
  medium: string;
  dimensions: string;
  availability: Availability;
  /** One line: the story buried in the work. */
  hook: string;
  story: string[];
  image: string;
  imageAlt: string;
};

export type Artist = {
  slug: string;
  name: string;
  place: string;
  medium: string;
  line: string;
  bio: string[];
  image: string;
  imageAlt: string;
};

export type Story = {
  slug: string;
  title: string;
  kind: string;
  publishedAt: string;
  artistSlug: string;
  excerpt: string;
  body: string[];
  image: string;
  imageAlt: string;
};

export type Collection = {
  slug: string;
  title: string;
  line: string;
  artworkSlugs: string[];
  image: string;
  imageAlt: string;
};
