export type ExhibitionWork = {
  slug: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  /** The artist's note on the work, from the catalogue. */
  note: string;
  image: string;
  width: number;
  height: number;
};

export type ExhibitionArtist = {
  slug: string;
  name: string;
  portrait: string;
  bio: string[];
  works: ExhibitionWork[];
};

export type Exhibition = {
  slug: string;
  number: string;
  title: string;
  line: string;
  format: string;
  period: string;
  site: string;
  address: string;
  events: { name: string; date: string; time: string }[];
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
  poster: string;
  posterAlt: string;
  enquiriesEmail: string;
  worksUrl: string;
  video?: { youtubeId: string; start?: number };
  links: { label: string; url: string }[];
};

const img = (path: string) => `/images/curatorial/refuge-in-community/${path}`;

// Content from the Refuge in Community catalogue (Nomadic Art Gallery × Art Digging, 2024).
export const exhibitions: Exhibition[] = [
  {
    slug: "refuge-in-community",
    number: "001",
    title: "Refuge in Community",
    line: "Don't be fooled by our fingerprints.",
    format: "A Lagos Biennial off-ish group exhibition",
    period: "8 – 29 February 2024",
    site: "Nomadic Art Gallery",
    address: "22 Adetokunbo Ademola Road, Victoria Island, Lagos",
    events: [{ name: "Community Banter", date: "2 March 2024", time: "4pm – 8pm" }],
    curatedBy: "Art Digging (Mercy & Sam)",
    presentedWith: "Nomadic Art Gallery",
    alongside: {
      name: "Lagos Biennial 2024",
      theme: "REFUGE",
      period: "3 – 10 February 2024",
      site: "Tafawa Balewa Square, Lagos",
      url: "https://lagos-biennial.org/lb-2024/",
    },
    questions: [
      "So what makes up a strong community?",
      "Is it their ability to provide refuge for the lost?",
      "Is it in the chants they sing, or the rules they make?",
      "Do we choose our community?",
      "And what becomes of those whom the community failed to raise right?",
    ],
    statement: [
      "Don't be fooled by our fingerprints. We may be different on our own, but when we look at the big picture, we all belong to a community.",
      "The definitions of community evoke a sense of expectation. Even when we can't put a finger on it, there is an expectation of peace, of safety, of belonging, of understanding, and most especially of refuge. It's the feeling you get when you hear “don't go there o!” from a total stranger because danger is lurking and they see themselves in you.",
      "Nomadic Art Gallery in partnership with Art Digging presents “Refuge in Community”, a Lagos Biennial off-ish group exhibition. The exhibiting artists Ekene Ngige, Tochukwu Orazulike, Ife Ofulue, Olalekan Adeyemi and Josh Egesi explore the intricacies of individuality and community, while revealing the fundamental elements of a society that thrives in harmony.",
      "With every community comes the need to preserve the shared values that bond them together. In some places, everyone is mad in complexion. In some places, there's always that one person who derives joy from digging up chaos, and in some, there are just two nobodies shouting, ‘Do you know who I am?’",
      "They say it takes a community to raise a child; but what happens when the child becomes an adult? How do the unique journeys we each undertake shape the collective narrative we share? These questions serve as mirrors and shadows reflecting the crucial influence we evoke as individuals in our community.",
    ],
    artists: [
      {
        slug: "ekene-ngige",
        name: "Ekene Ngige",
        portrait: img("artists/ekene-ngige.jpg"),
        bio: [
          "Known as “The Coffee Artist”, Ekene is from Anambra State and based in Lagos. A Fine Art graduate of Yaba College of Technology, he was a member of the final class of Professor Kolade Oshinowo. He discovered coffee painting in 2015, after a coffee spill on his notepad.",
          "From the plight of impoverished children to female empowerment and the violent attacks taking place across Nigeria, he paints to tell important African stories: art as activism for peace and unity.",
        ],
        works: [
          {
            slug: "coffee-break",
            title: "Coffee Break",
            year: 2018,
            medium: "Coffee on canvas",
            dimensions: "48 × 72 in",
            note: "The six most powerful and controversial leaders in 2018, hosted to a coffee break by the late Queen Elizabeth. A break from their differences, to embrace peace. A political version of the Last Supper.",
            image: img("works/coffee-break.jpg"),
            width: 1600,
            height: 930,
          },
          {
            slug: "black-coffee",
            title: "Black Coffee",
            year: 2023,
            medium: "Coffee on canvas",
            dimensions: "36 × 36 in",
            note: "Just as coffee awakens the senses, a black woman's presence is magnetic and powerful. In a world that often fails to appreciate the beauty of diversity, her beauty is a reminder of the richness in embracing and celebrating differences.",
            image: img("works/black-coffee.jpg"),
            width: 1580,
            height: 1600,
          },
          {
            slug: "a-cup-of-truce-ii",
            title: "A Cup of Truce II",
            year: 2018,
            medium: "Coffee and plastic tray on canvas",
            dimensions: "36 × 36 in",
            note: "About the attacks on children by bandits and terrorists. A boy from the Igbo community offers a cup of coffee to the evil proprietors as a peace offering, so the children can grow, live peacefully and achieve their dreams.",
            image: img("works/a-cup-of-truce-ii.jpg"),
            width: 1519,
            height: 1600,
          },
        ],
      },
      {
        slug: "tochukwu-orazulike",
        name: "Tochukwu Orazulike",
        portrait: img("artists/tochukwu-orazulike.jpg"),
        bio: [
          "Tochukwu makes surreal images that serve as a vehicle for raising awareness about societal issues: a juxtaposition of bliss and struggle. Waves of spray paint, marbled onto canvas, merge with oil and acrylic.",
          "“The waves of spray paint represent the relationship between man and natural resources. I invite viewers to contemplate the intricate nature of contemporary global challenges.”",
        ],
        works: [
          {
            slug: "season-of-abundance",
            title: "Season of Abundance",
            year: 2023,
            medium: "Oil, spray paint and acrylic on canvas",
            dimensions: "36 × 36 in",
            note: "The fleeting joy of heavy rain, a brief respite in our battle with water insecurity. We hurriedly place buckets to collect the precious rainfall, and in our excitement we forget to store and manage for the dry days that follow.",
            image: img("works/season-of-abundance.jpg"),
            width: 1595,
            height: 1600,
          },
          {
            slug: "water-hunt-ii",
            title: "Water Hunt II",
            year: 2023,
            medium: "Oil, spray paint and acrylic on canvas",
            dimensions: "40 × 40 in",
            note: "As the dry season unfolds, waters recede beyond the earth's reach. People unite to secure water; the community embarks on a water hunt. Once again, this communal struggle ends in water anguish.",
            image: img("works/water-hunt-ii.jpg"),
            width: 1600,
            height: 1591,
          },
        ],
      },
      {
        slug: "ife-ofulue",
        name: "Ife Ofulue",
        portrait: img("artists/ife-ofulue.jpg"),
        bio: [
          "Ife Ofulue (Ife E. Ehianu, b. 1995) is a multidisciplinary visual artist from Kaduna. Trained in architecture, with a practice spanning photography and creative direction, his work is a tribute to his homeland and the rich tapestry of its everyday life and people.",
          "He has shown at Lagos Photo Festival, Studio One Art Gallery in Cape Town, The Dada Gallery, Alliance Française and ART X Lagos.",
        ],
        works: [
          {
            slug: "okada-night-rides",
            title: "Okada Night Rides",
            year: 2021,
            medium: "Mixed media on canvas",
            dimensions: "23.4 × 16.5 in",
            note: "Nighttime bike rides through our community evoke a sense of serenity and security, as the tranquil streets become pathways to inner peace beneath the moonlit sky.",
            image: img("works/okada-night-rides.jpg"),
            width: 1131,
            height: 1600,
          },
          {
            slug: "new-narrative",
            title: "New Narrative",
            year: 2022,
            medium: "Mixed media on canvas",
            dimensions: "16.5 × 23.4 in",
            note: "In the tapestry of our shared environment, individuals weave their unique experiences, yet unite as one community, bound by the threads of diversity and collective resilience.",
            image: img("works/new-narrative.jpg"),
            width: 1131,
            height: 1600,
          },
        ],
      },
      {
        slug: "olalekan-adeyemi",
        name: "Olalekan Adeyemi",
        portrait: img("artists/olalekan-adeyemi.jpg"),
        bio: [
          "Born in 1988 in Osun State, Olalekan paints visually engaging, photo-surrealistic works rooted in Nigeria's socio-cultural landscape.",
          "He explores life as a continuous process of shedding layers, like the peeling-off of skin: capturing fleeting moments and the traces of human experience left behind.",
        ],
        works: [
          {
            slug: "abioja-ii",
            title: "Abioja II",
            year: 2019,
            medium: "Oil on canvas",
            dimensions: "40 × 40 in",
            note: "Abioja, a Yoruba term for a child born on a market day, reflects the earth as a marketplace where individuals transiently navigate life's journey, like traders in a bustling market: finding balance between individuality and community.",
            image: img("works/abioja-ii.jpg"),
            width: 1600,
            height: 1588,
          },
          {
            slug: "diversity-in-unity",
            title: "Diversity in Unity",
            year: 2022,
            medium: "Oil on canvas",
            dimensions: "40 × 45 in",
            note: "Celebrating the multitude of identities and experiences within our interconnected global community: the rich tapestry of cultures, backgrounds and perspectives that coexist in our world.",
            image: img("works/diversity-in-unity.jpg"),
            width: 1600,
            height: 1371,
          },
        ],
      },
      {
        slug: "josh-egesi",
        name: "Josh Egesi",
        portrait: img("artists/josh-egesi.jpg"),
        bio: [
          "A design artist bridging African culture and contemporary expression, Josh has moved from curating to painting, graphic design and beyond: preserving and evolving African cultural narratives.",
          "Among his recent work is an electric talking drum, fusing traditional African percussion with new technology.",
        ],
        works: [
          {
            slug: "ayo-bench",
            title: "Ayo Bench",
            year: 2022,
            medium: "Acrylic and wood",
            dimensions: "70 × 27.88 × 19 in",
            note: "Born out of the need to fix an old, unbalanced yard bench in his Lagos compound: “I remember watching people continuously trip over at the edge every time someone stood up from the other end of the bench. At first it was funny, but quickly I realised it was a problem that needed solving.”",
            image: img("works/ayo-bench.jpg"),
            width: 1066,
            height: 1600,
          },
        ],
      },
    ],
    poster: "/images/curatorial/refuge-in-community-poster.jpg",
    posterAlt:
      "Yellow poster: Community Banter, March 2nd 2024, 4pm to 8pm. Refuge in Community. Nomadic Art Gallery, 22 Adetokunbo Ademola Road, Victoria Island, Lagos. Logos of Lagos Biennial, Art Digging and Nomadic Art Gallery.",
    enquiriesEmail: "enquiries@nomadic-art.com",
    worksUrl: "https://nomadic-art.com/refuge-in-community/",
    video: { youtubeId: "FllXcEcWoPQ", start: 41 },
    links: [
      { label: "Nomadic Art", url: "https://nomadic-art.com/refuge-in-community/" },
      { label: "More on Lagos Biennial 2024", url: "https://lagos-biennial.org/lb-2024/" },
    ],
  },
];

export function getExhibition(slug: string) {
  return exhibitions.find((e) => e.slug === slug);
}

export function findWork(exhibition: Exhibition, workSlug: string) {
  for (const artist of exhibition.artists) {
    const work = artist.works.find((w) => w.slug === workSlug);
    if (work) return { artist, work };
  }
  return undefined;
}
