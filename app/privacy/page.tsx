import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Art Digging handles your information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      updated="September 2026"
      intro="We dig up stories about art, not about you. Here is the little we collect, and why."
      sections={[
        {
          heading: "What we collect",
          body: [
            "If you join our list, we collect your email address. That is the only personal information we ask for.",
            "Like most websites, our hosting provider automatically records basic technical information when you visit, such as your IP address, browser type and the pages you view. This is used to keep the site running and secure.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "We use your email address only to send you news from Art Digging: new exhibitions, stories and previews. Every email includes a way to unsubscribe, or you can write to us and we will remove you.",
            "We do not sell, rent or trade your information.",
          ],
        },
        {
          heading: "Cookies and third parties",
          body: [
            "We do not use advertising or tracking cookies.",
            "Some pages include videos embedded from YouTube in privacy-enhanced mode. YouTube may set cookies once you press play; its own privacy policy applies to that.",
            "The site is hosted by Vercel. If we use a mailing-list service to send our emails, your address is stored with that service on our behalf.",
            "Links to other sites, such as Nomadic Art Gallery, the Lagos Biennial or Instagram, are governed by those sites' own policies.",
          ],
        },
        {
          heading: "Enquiries about works",
          body: [
            "When you enquire about an exhibited work, your email goes to the gallery named on that work (for Refuge in Community, Nomadic Art Gallery), which handles the enquiry under its own policies.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            `You can ask us what information we hold about you, ask us to correct it, or ask us to delete it, at any time, by writing to ${site.contactEmail}.`,
          ],
        },
        {
          heading: "Changes",
          body: [
            "If we change how we handle information, we will update this page and the date above.",
          ],
        },
      ]}
    />
  );
}
