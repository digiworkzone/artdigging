import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the Art Digging website.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      updated="September 2026"
      intro="By using this site you agree to these terms. They are short, because the art should do the talking."
      sections={[
        {
          heading: "The artworks belong to the artists",
          body: [
            "All artworks, images of artworks, artist portraits and artists' statements shown on this site remain the property of the artists and rights holders. They are shown here with permission, for the purpose of presenting our exhibitions.",
            "You may share links to our pages. You may not copy, reproduce, sell or use any artwork or image from this site without the permission of the artist or rights holder.",
          ],
        },
        {
          heading: "Our content",
          body: [
            "The Art Digging name, logo, texts and site design belong to Art Digging. Please ask before reusing them, beyond quoting short passages with credit and a link back.",
          ],
        },
        {
          heading: "Buying and enquiring",
          body: [
            "Art Digging does not sell artworks through this site. Prices, availability and sales of exhibited works are handled by the presenting gallery or the artist, on their own terms.",
            "We describe works as accurately as we can, but details such as dimensions, media and availability may change. Please confirm them with the gallery before making any decision.",
          ],
        },
        {
          heading: "Other sites",
          body: [
            "We link to other websites, such as galleries, the Lagos Biennial, YouTube and Instagram. We are not responsible for their content or how they operate.",
          ],
        },
        {
          heading: "No guarantees",
          body: [
            "We work to keep the site accurate and available, but we provide it as it is and cannot guarantee it will always be complete, current or uninterrupted.",
          ],
        },
        {
          heading: "Changes and contact",
          body: [
            "We may update these terms from time to time; the date above shows the latest version.",
            `Questions? Write to us at ${site.contactEmail}.`,
          ],
        },
      ]}
    />
  );
}
