import { Link } from "react-router";
import LegalPage from "../components/LegalPage";
import Reveal from "../components/Reveal";
import { site } from "../content/site";

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      description="How Refract Labs collects and uses information on this website."
      path="/privacy"
      subtitle="This covers the marketing site at refractlabs.tech — not client products we build for you. Those have their own agreements."
    >
      <Reveal as="section">
        <h2>Who we are</h2>
        <p>
          Refract Labs is a software studio in {site.location}. For questions about this policy, write to{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>What we collect</h2>
        <p>
          If you use the contact form we receive your name, email address, project type, and message so we can reply. If you
          request a discovery call we also receive the weekday and time you asked for (Africa/Nairobi). If you email us
          directly we keep that correspondence. The site stores a theme preference (light or dark) in your browser with
          localStorage. We do not use advertising cookies or analytics pixels on this site today.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Where it goes</h2>
        <p>
          The site is hosted on Vercel. Contact messages and call requests are sent with Resend to our inbox. The studio
          mark, team portraits, and selected work shots are served from Cloudinary. Type is loaded from Google Fonts. Those providers process
          what they need to host the page, deliver mail, or serve an asset. We do not sell that data.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>How long we keep it</h2>
        <p>
          We keep enquiry mail as long as we need it to reply and, if we work together, to run the engagement. You can ask us
          to delete an enquiry that did not become a project.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Your rights</h2>
        <p>
          Under the Kenya Data Protection Act you can ask what we hold, ask for a correction, or ask us to erase it, subject
          to what the law still requires us to keep. Email <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Also see</h2>
        <p>
          Theme storage is in the <Link to="/cookies">cookie policy</Link>. Using the site is covered by the{" "}
          <Link to="/terms">terms of use</Link>.
        </p>
      </Reveal>
    </LegalPage>
  );
}
