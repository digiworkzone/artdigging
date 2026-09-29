import type { Artist, Artwork, Collection, Story } from "@/types";

// Sample content: the artists, works and stories below are fictional
// placeholders for layout and tone. Replace with real, consented material.

export const artists: Artist[] = [
  {
    slug: "amara-nwosu",
    name: "Amara Nwosu",
    place: "Lagos, Nigeria",
    medium: "Earth pigment on canvas",
    line: "Paints with the soil of the places she remembers.",
    bio: [
      "Amara grinds her own pigments from laterite, river clay and charcoal gathered on trips back to her family's village in the east.",
      "Her canvases are built in layers, like ground cut open: each one a record of a place, a season, a voice she was told about but never heard.",
    ],
    image: "/images/artists/amara-nwosu.svg",
    imageAlt: "Warm concentric rings, like a fingerprint pressed into red earth",
  },
  {
    slug: "kofi-mensah-asante",
    name: "Kofi Mensah-Asante",
    place: "Kumasi, Ghana",
    medium: "Carved wood and brass",
    line: "Carves only wood that has already fallen.",
    bio: [
      "Kofi learned to carve in his father's workshop and still works with the same set of adzes, re-handled three times.",
      "He refuses to cut living trees. Every piece begins with a storm, a clearing, or a building torn down, and carries that history in its grain.",
    ],
    image: "/images/artists/kofi-mensah-asante.svg",
    imageAlt: "Pale rings like the cross-section of an old tree",
  },
  {
    slug: "zanele-dube",
    name: "Zanele Dube",
    place: "Durban, South Africa",
    medium: "Glass beads and thread",
    line: "Counts time in glass beads.",
    bio: [
      "Zanele learned beadwork from her grandmother as a way of keeping her hands still while waiting.",
      "Her works are counted, never estimated. Every bead stands for something: a day, a name, a kilometre travelled.",
    ],
    image: "/images/artists/zanele-dube.svg",
    imageAlt: "Deep red rings flecked with gold, like beads on a spiral",
  },
  {
    slug: "yohannes-tesfaye",
    name: "Yohannes Tesfaye",
    place: "Addis Ababa, Ethiopia",
    medium: "Oil on parchment",
    line: "Paints over letters that never arrived.",
    bio: [
      "Yohannes trained in icon painting before turning to the archive of his own family: letters, receipts, and photographs kept in a tin.",
      "He paints on prepared parchment, letting old handwriting surface through the oil like water rising in a well.",
    ],
    image: "/images/artists/yohannes-tesfaye.svg",
    imageAlt: "Cool indigo rings with a single ember-coloured line",
  },
];

export const artworks: Artwork[] = [
  {
    slug: "what-the-river-kept",
    title: "What the River Kept",
    artistSlug: "amara-nwosu",
    year: 2025,
    medium: "Laterite, charcoal and pigment on canvas",
    dimensions: "120 × 150 cm",
    availability: "Available",
    hook: "Painted with soil from the bank where her grandmother washed cloth.",
    story: [
      "The river has moved since then. The bank where Amara's grandmother washed cloth every market day is now a field, and the water runs a hundred metres east.",
      "Amara dug there anyway. The red at the centre of this canvas is that soil, ground by hand and bound with egg. The dark line through it is river clay from where the water is now.",
      "It is a painting of two places that used to be one.",
    ],
    image: "/images/works/what-the-river-kept.svg",
    imageAlt: "Layers of red and ochre earth with a dark river line winding through them",
  },
  {
    slug: "red-earth-ledger",
    title: "Red Earth Ledger",
    artistSlug: "amara-nwosu",
    year: 2024,
    medium: "Earth pigment on linen",
    dimensions: "90 × 120 cm",
    availability: "On inquiry",
    hook: "Each band is a year of harvest, remembered aloud.",
    story: [
      "Nobody in Amara's family wrote the harvests down. Her uncle kept them in his head and could recite forty years of yams, rain and loss in a single sitting.",
      "She recorded him once, then painted one band for each year he named. Good years are wide. The famine years are almost too thin to see.",
    ],
    image: "/images/works/red-earth-ledger.svg",
    imageAlt: "Many horizontal bands of red and brown earth, some wide, some hairline",
  },
  {
    slug: "the-carvers-silence",
    title: "The Carver's Silence",
    artistSlug: "kofi-mensah-asante",
    year: 2025,
    medium: "Odum wood and brass",
    dimensions: "64 × 30 × 30 cm",
    availability: "Available",
    hook: "Cut from a tree felled by the storm that took his father's workshop.",
    story: [
      "The storm came in the night. By morning the workshop roof was in the road and the odum tree that shaded it for fifty years was lying across both.",
      "Kofi's father did not carve again. Kofi kept the tree. This vessel is the first piece he made from it, eleven years later, with the brass from the workshop's old door hinges set into the rim.",
    ],
    image: "/images/works/the-carvers-silence.svg",
    imageAlt: "A dark vessel shape half-buried in layers of brown earth, a thin gold rim glinting",
  },
  {
    slug: "stool-for-an-absent-elder",
    title: "Stool for an Absent Elder",
    artistSlug: "kofi-mensah-asante",
    year: 2023,
    medium: "Carved wood",
    dimensions: "42 × 55 × 28 cm",
    availability: "Surfacing soon",
    hook: "Made to stay empty.",
    story: [
      "A stool is where an elder sits, and in some houses it is kept after they are gone, so their place is never taken.",
      "Kofi carved this one for no one in particular: for the elders whose stools were sold, lost, or burned. It is not meant to be sat on.",
    ],
    image: "/images/works/stool-for-an-absent-elder.svg",
    imageAlt: "A simple stool silhouette resting in dark layered ground",
  },
  {
    slug: "counting-song",
    title: "Counting Song",
    artistSlug: "zanele-dube",
    year: 2025,
    medium: "Glass beads and thread on cotton",
    dimensions: "80 × 100 cm",
    availability: "Available",
    hook: "Thirty-one thousand beads, one for every day her mother was away.",
    story: [
      "Zanele's mother worked in another city for most of Zanele's childhood, coming home twice a year.",
      "Years later Zanele counted the days from old calendars and bus tickets, and threaded one bead for each. The gold beads are the days her mother came home.",
    ],
    image: "/images/works/counting-song.svg",
    imageAlt: "Rings of tiny beads spiralling outward, a few glinting gold, set in dark earth",
  },
  {
    slug: "letters-never-sent",
    title: "Letters Never Sent",
    artistSlug: "yohannes-tesfaye",
    year: 2024,
    medium: "Oil on prepared parchment",
    dimensions: "70 × 90 cm",
    availability: "On inquiry",
    hook: "Painted over letters a father wrote home and never posted.",
    story: [
      "In a tin under his grandmother's bed, Yohannes found sixty letters his grandfather wrote while working abroad in the 1970s. None had stamps.",
      "He painted over each one in thin indigo washes, leaving the handwriting to show through. You cannot read them. Neither could the people they were written to.",
    ],
    image: "/images/works/letters-never-sent.svg",
    imageAlt: "A pale page with faint lines of script, sinking into indigo layers",
  },
];

export const stories: Story[] = [
  {
    slug: "the-soil-remembers",
    title: "The soil remembers",
    kind: "Studio",
    publishedAt: "2026-08-12",
    artistSlug: "amara-nwosu",
    excerpt: "A day digging pigment with Amara Nwosu on a riverbank that is no longer a riverbank.",
    body: [
      "We leave before light. Amara drives with a shovel, six empty rice sacks and a flask of tea in the boot.",
      "The field she stops at looks like any other. She walks it slowly, head down, until she finds a place where the ground turns from brown to red. \"Here,\" she says. \"The water was here.\"",
      "She digs for an hour. Every few minutes she stops, rubs a little of the soil between her fingers, and either keeps it or throws it back. I ask how she decides. \"Some of it has something to say,\" she says. \"Some of it is just dirt.\"",
      "Back in the studio, the red becomes paint. It takes three days of grinding. She says that part is the listening.",
    ],
    image: "/images/works/what-the-river-kept.svg",
    imageAlt: "Layers of red earth with a dark river line",
  },
  {
    slug: "wood-that-was-already-speaking",
    title: "Wood that was already speaking",
    kind: "Essay",
    publishedAt: "2026-07-03",
    artistSlug: "kofi-mensah-asante",
    excerpt: "Why Kofi Mensah-Asante will only carve a tree that has already fallen.",
    body: [
      "Kofi's rule is simple: he does not cut living trees. Everything in his workshop fell first.",
      "It makes the work slow and unpredictable. Some years there is no wood. Some years a whole school building comes down and he has more than he can carve in a decade.",
      "But the rule is not really about sustainability, he says. It is about what the wood already carries. \"A tree that fell in a storm has a storm in it. I don't have to put anything in. I just have to take the extra away.\"",
    ],
    image: "/images/works/the-carvers-silence.svg",
    imageAlt: "A dark vessel half-buried in brown earth",
  },
  {
    slug: "counting-in-glass",
    title: "Counting in glass",
    kind: "Conversation",
    publishedAt: "2026-05-20",
    artistSlug: "zanele-dube",
    excerpt: "Zanele Dube on waiting, counting, and thirty-one thousand beads.",
    body: [
      "\"People think beadwork is decorative,\" Zanele says. \"For me it's arithmetic.\"",
      "She keeps a ledger for every piece: how many beads, what each one stands for, which colour means what. Nobody sees the ledger. It stays in a drawer.",
      "Counting Song took her fourteen months. She says the counting was the easy part. The hard part was the gold beads, the days her mother came home, because there were so few of them.",
    ],
    image: "/images/works/counting-song.svg",
    imageAlt: "Spiralling rings of beads in dark earth",
  },
];

export const collections: Collection[] = [
  {
    slug: "earth-and-memory",
    title: "Earth & Memory",
    line: "Works made from, or about, the ground itself.",
    artworkSlugs: ["what-the-river-kept", "red-earth-ledger", "letters-never-sent"],
    image: "/images/works/red-earth-ledger.svg",
    imageAlt: "Bands of red and brown earth",
  },
  {
    slug: "things-made-to-hold",
    title: "Things Made to Hold",
    line: "Vessels, seats and surfaces that carry what isn't there.",
    artworkSlugs: ["the-carvers-silence", "stool-for-an-absent-elder", "counting-song"],
    image: "/images/works/stool-for-an-absent-elder.svg",
    imageAlt: "A stool silhouette in dark layered ground",
  },
  {
    slug: "inheritances",
    title: "Inheritances",
    line: "What gets passed down, and what gets lost on the way.",
    artworkSlugs: [
      "red-earth-ledger",
      "stool-for-an-absent-elder",
      "counting-song",
      "letters-never-sent",
    ],
    image: "/images/works/letters-never-sent.svg",
    imageAlt: "A faint handwritten page sinking into indigo",
  },
];

export function getArtist(slug: string) {
  return artists.find((a) => a.slug === slug);
}

export function getArtwork(slug: string) {
  return artworks.find((a) => a.slug === slug);
}

export function getStory(slug: string) {
  return stories.find((s) => s.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function worksBy(artistSlug: string) {
  return artworks.filter((a) => a.artistSlug === artistSlug);
}

export function worksIn(collection: Collection) {
  return collection.artworkSlugs
    .map(getArtwork)
    .filter((a): a is Artwork => Boolean(a));
}
