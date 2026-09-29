export type Story = {
  slug: string;
  title: string;
  kind: string;
  publishedAt: string;
  excerpt: string;
  body: string[];
  /** Links the story back to a curatorial dig. */
  exhibitionSlug?: string;
  image?: string;
  imageAlt?: string;
};

export const stories: Story[] = [
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
