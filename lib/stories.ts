export type StoryChapter = {
  question: string;
  /** A work from the story's exhibition. */
  workSlug: string;
  /** The work read as one person. */
  one: string;
  /** The same work read as all of us. */
  many: string;
};

export type Story = {
  slug: string;
  title: string;
  kind: string;
  publishedAt: string;
  excerpt: string;
  body: string[];
  chapters?: StoryChapter[];
  outro?: string[];
  /** Links the story back to a curatorial dig. */
  exhibitionSlug?: string;
  image?: string;
  imageAlt?: string;
};

export const stories: Story[] = [
  {
    slug: "dont-be-fooled-by-our-fingerprints",
    title: "Don't be fooled by our fingerprints",
    kind: "Curatorial",
    publishedAt: "2024-02-08",
    excerpt: "Who are we now: as one, and as many? Refuge in Community, read twice.",
    body: [
      "Press your thumb to glass and you leave a mark no one else can leave. It is the most individual thing a body makes.",
      "Refuge in Community asked what happens to that mark in a crowd. Who are we, now, as a society: each of us on our own, and all of us together?",
      "Five artists answered with ten works. Read each one twice. Once as I. Then again as we.",
    ],
    chapters: [
      {
        question: "Do we choose our community?",
        workSlug: "abioja-ii",
        one: "I was born on a market day.",
        many: "We are all traders here, passing through the same market.",
      },
      {
        question: "Is it the ability to provide refuge for the lost?",
        workSlug: "a-cup-of-truce-ii",
        one: "I hold out a cup of coffee to the ones who came to hurt us.",
        many: "We are only asking to be allowed to grow.",
      },
      {
        question: "Is it in the rules we make?",
        workSlug: "season-of-abundance",
        one: "I put my bucket out in the rain.",
        many: "We forget, together, to save for the dry days.",
      },
      {
        question: "What happens when one of us stands up?",
        workSlug: "ayo-bench",
        one: "I get up from my end of the bench.",
        many: "Everyone at the other end tips over.",
      },
      {
        question: "How do our own journeys shape the story we share?",
        workSlug: "okada-night-rides",
        one: "I ride home alone under the moon, and feel safe.",
        many: "We are the quiet streets that let me.",
      },
      {
        question: "Can we sit at the same table?",
        workSlug: "coffee-break",
        one: "I would pour a cup for my enemy.",
        many: "We could all take a break from our differences.",
      },
      {
        question: "So who are we now?",
        workSlug: "diversity-in-unity",
        one: "My face, in the crowd.",
        many: "Our faces: the crowd.",
      },
    ],
    outro: [
      "Somewhere in Lagos, right now, a stranger is shouting “don't go there o!” at someone they have never met, because danger is lurking and they see themselves in them.",
      "That is the refuge. Not the one, and not the many, but the moment one recognises themselves in the many.",
    ],
    exhibitionSlug: "refuge-in-community",
    image: "/images/curatorial/refuge-in-community/works/diversity-in-unity.jpg",
    imageAlt: "Diversity in Unity by Olalekan Adeyemi: a painting of a dense crowd of faces",
  },
  {
    slug: "community-banter",
    title: "Community Banter",
    kind: "Gathering",
    publishedAt: "2024-03-02",
    excerpt: "An afternoon of conversation inside Refuge in Community.",
    body: [
      "On 2 March 2024, from 4pm to 8pm, Refuge in Community opened its doors for Community Banter: an afternoon given over to talk, among the works, at Nomadic Art Gallery on Adetokunbo Ademola Road, Victoria Island.",
      "The exhibition asked what holds a community together. Community Banter answered the only way a community can: by gathering one.",
      "Presented by Art Digging and Nomadic Art Gallery, in collaboration with the Lagos Biennial.",
    ],
    exhibitionSlug: "refuge-in-community",
    image: "/images/curatorial/refuge-in-community-poster.jpg",
    imageAlt: "The yellow Community Banter poster for Refuge in Community",
  },
];

export function getStory(slug: string) {
  return stories.find((s) => s.slug === slug);
}
