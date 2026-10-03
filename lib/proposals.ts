// Private proposals, served at proposal.artdigging.com/<slug>.
// Each one is locked behind a code. Codes are NOT stored here: they live in
// the PROPOSAL_CODES environment variable as "slug:CODE,slug:CODE".

export type ProposalSection =
  | {
      kind: "steps";
      items: { label: string; title: string; body: string }[];
    }
  | {
      kind: "chapters";
      label: string;
      title: string;
      items: { title: string; subtitle: string; body: string }[];
    }
  | {
      kind: "cards";
      label: string;
      title: string;
      items: { title: string; body: string }[];
      note?: string;
      shaded?: boolean;
    }
  | {
      kind: "split";
      label: string;
      title: string;
      body: string[];
    };

export type ProposalGlimpse = {
  /** Shown after this section index; -1 means straight after the hero. */
  after: number;
  align?: "left" | "right";
  image: { src: string; alt: string; credit: string; width: number; height: number };
  /** Where the photograph comes from, linked in the credits. */
  source: string;
};

export type Proposal = {
  slug: string;
  number: string;
  title: string;
  place: string;
  /** Accent colour for this proposal; defaults to the site's ember. */
  accent?: string;
  hero: {
    headline: string;
    /** The lead line; `highlight` is drawn with the accent behind it. */
    lead: { before: string; highlight: string };
    body: string;
  };
  sections: ProposalSection[];
  /** Small, half-hidden photographs placed between sections. */
  glimpses?: ProposalGlimpse[];
  closing: string;
  /** Shown under the poll as the contact for questions. */
  contact: { label: string; email: string; line: string };
};

export const proposals: Proposal[] = [
  {
    slug: "trap-house-reimagined",
    number: "002",
    title: "Trap House Reimagined",
    place: "Montgomery, Alabama",
    accent: "#F2C14E",
    hero: {
      headline: "Every neighborhood in Montgomery has a house people walk past without looking.",
      lead: { before: "Trap House Reimagined asks the city to", highlight: "walk inside." },
      body: "For one week, a vacant house becomes an exhibition. Then it is rebuilt and opened to the community for good.",
    },
    sections: [
      {
        kind: "steps",
        items: [
          {
            label: "01 · One week",
            title: "Exhibit",
            body: "A vacant house opens its doors. Room by room, it tells one life from beginning to end.",
          },
          {
            label: "02 · In public view",
            title: "Rebuild",
            body: "The doors close and the real work begins. The same house is rehabilitated with the city.",
          },
          {
            label: "03 · For good",
            title: "Reopen",
            body: "It returns as a common space for the whole community, shaped by what neighbors asked for.",
          },
        ],
      },
      {
        kind: "chapters",
        label: "Inside the house",
        title:
          "Each room is one chapter. How a place shapes a person, and how one better choice begins to change both.",
        items: [
          {
            title: "Where it starts",
            subtitle: "Home, family, the block outside",
            body: "Portraits of Montgomery neighborhoods by local artists. The smell of a family kitchen.",
          },
          {
            title: "The pull",
            subtitle: "Pressure, money, the choices on offer",
            body: "Installation and sound, with a live performance each night.",
          },
          {
            title: "The cost",
            subtitle: "Loss, incarceration, time",
            body: "Work by artists who are incarcerated.",
          },
          {
            title: "The turn",
            subtitle: "A mentor, a program, one better choice",
            body: "Stories from people in reentry and youth programs.",
          },
          {
            title: "The way home",
            subtitle: "Rebuilding a life and a place",
            body: "Furniture built through reentry programs, and a wall where visitors say what the house should become.",
          },
        ],
      },
      {
        kind: "cards",
        label: "Who builds it",
        title: "The people closest to the story.",
        shaded: true,
        items: [
          { title: "Montgomery artists", body: "Local artists and performers create the work in every room." },
          { title: "Incarcerated artists", body: "Their work holds the chapter only they can tell." },
          {
            title: "Reentry programs",
            body: "People coming home build the furniture, earning paid work along the way.",
          },
        ],
        note: "Proposed arts partners, both named in the city's Creative Place Strategy: the Alabama State Council on the Arts and The King's Canvas.",
      },
      {
        kind: "cards",
        label: "What the house becomes",
        title: "A common space for the whole community.",
        items: [
          { title: "Youth programs", body: "Art workshops, mentorship, and after-school sessions." },
          { title: "Reentry support", body: "A welcoming place for people coming home, with skills and connection." },
          { title: "Arts and gathering", body: "Rotating shows, performances, and neighborhood meetings." },
        ],
      },
      {
        kind: "split",
        label: "Built for Montgomery's plans",
        title: "No new policy. Just a site and a partner.",
        body: [
          "Trap House Reimagined delivers goals the city has already adopted in Envision Montgomery 2040, the Creative Place Strategy, and Together We Rise.",
          "It returns a vacant property to use, puts local artists first, and is measured with the city's Community Vitality Index, scored before the exhibition and again after launch.",
        ],
      },
    ],
    glimpses: [
      {
        after: -1,
        align: "right",
        image: {
          src: "/images/proposals/trap-house-reimagined/grove-street.jpg",
          alt: "A vacant two-storey building on Grove Street, its windows and doors boarded up",
          credit: "863 Grove St., Centennial Hill · Chris Pruitt, CC BY-SA 4.0",
          width: 960,
          height: 720,
        },
        source: "https://commons.wikimedia.org/wiki/File:863_Grove_St._Montgomery_2024-08-22.jpg",
      },
      {
        after: 0,
        align: "left",
        image: {
          src: "/images/proposals/trap-house-reimagined/tenant-window-1937.jpg",
          alt: "A window in a weathered wooden wall, patched with paper, a thin curtain behind the glass",
          credit: "Window of a tenant farmer's home, Montgomery County, 1937 · Arthur Rothstein, Library of Congress",
          width: 932,
          height: 675,
        },
        source: "https://www.loc.gov/item/2017775904/",
      },
      {
        after: 1,
        align: "right",
        image: {
          src: "/images/proposals/trap-house-reimagined/centennial-hill.jpg",
          alt: "Houses with front porches along South Jackson Street",
          credit: "400 block of South Jackson St. · Chris Pruitt, CC BY-SA 3.0",
          width: 960,
          height: 720,
        },
        source: "https://commons.wikimedia.org/wiki/File:Centennial_Hill_Montgomery_Feb_2012_01.jpg",
      },
      {
        after: 3,
        align: "left",
        image: {
          src: "/images/proposals/trap-house-reimagined/dexter-avenue-storefront.jpg",
          alt: "An empty storefront on Dexter Avenue, its windows filled with paintings",
          credit: "Abandoned storefront with murals, lower Dexter Avenue, 2010 · Carol M. Highsmith, Library of Congress",
          width: 1100,
          height: 921,
        },
        source: "https://www.loc.gov/item/2010637424/",
      },
    ],
    closing: "A house that stood for what a neighborhood lost becomes a place for what it can build.",
    contact: {
      label: "Get involved",
      email: "hello@artdigging.com",
      line: "Sam · Producer · hello@artdigging.com",
    },
  },
];

export function getProposal(slug: string) {
  return proposals.find((p) => p.slug === slug);
}
