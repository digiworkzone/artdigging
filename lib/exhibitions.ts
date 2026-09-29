export type ExhibitionWork = {
  title: string;
  year?: number;
  medium?: string;
  dimensions?: string;
  image?: string;
  imageAlt?: string;
};

export type ExhibitionArtist = {
  name: string;
  works: ExhibitionWork[];
};

export type Exhibition = {
  slug: string;
  number: string;
  title: string;
  line: string;
  period: string;
  site: string;
  curatedBy: string;
  presentedWith: string;
  alongside: {
    name: string;
    theme: string;
    period: string;
    site: string;
    url: string;
  };
  questions: string[];
  statement: string[];
  artists: ExhibitionArtist[];
  image: string;
  links: { label: string; url: string }[];
};

export const exhibitions: Exhibition[] = [
  {
    slug: "refuge-in-community",
    number: "001",
    title: "Refuge in Community",
    line: "Where does a community keep its shelter?",
    period: "8 – 29 February 2024",
    site: "Nomadic Art Gallery, Victoria Island, Lagos",
    curatedBy: "Art Digging",
    presentedWith: "Nomadic Art Gallery",
    alongside: {
      name: "Lagos Biennial 2024",
      theme: "REFUGE",
      period: "3 – 10 February 2024",
      site: "Tafawa Balewa Square, Lagos",
      url: "https://lagos-biennial.org/lb-2024/",
    },
    questions: [
      "Is a community strong because it shelters the lost?",
      "Because of the chants it sings?",
      "Because of the rules it makes?",
      "And what happens when it fails to raise its own?",
    ],
    statement: [
      "Refuge in Community brought together contemporary artists working in the space between the one and the many: what a community gives, what it asks for in return, and what it keeps out of sight.",
      "It opened at Nomadic Art Gallery in Victoria Island while the Lagos Biennial's REFUGE edition filled Tafawa Balewa Square, the ground where Nigerian independence was celebrated in 1960.",
    ],
    // Add each artist's pieces to `works` (title, year, medium, image in
    // public/images/curatorial/...). Artists with no works listed still
    // appear by name.
    artists: [
      { name: "Ekene Ngige", works: [] },
      { name: "Tochukwu Orazulike", works: [] },
      { name: "Ife Ofulue", works: [] },
      { name: "Olalekan Adeyemi", works: [] },
      { name: "Josh Egesi", works: [] },
    ],
    image: "/images/curatorial/refuge-in-community.svg",
    links: [
      { label: "Nomadic Art", url: "https://nomadic-art.com/refuge-in-community/" },
      { label: "Lagos Biennial 2024", url: "https://lagos-biennial.org/lb-2024/" },
    ],
  },
];

export function getExhibition(slug: string) {
  return exhibitions.find((e) => e.slug === slug);
}
