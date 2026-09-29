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
          Refract Labs is a software studio in {site.location}. For this marketing site we are the data controller. Questions
          about this policy: <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>What we collect</h2>
        <p>
          If you use the contact form we receive your name, email address, the service you are asking about, and message so we can
          reply. If you request a discovery call we also receive the weekday and time you asked for (Africa/Nairobi). If you
          email us directly we keep that correspondence. The site stores a theme preference (light or dark) in your browser with
          localStorage. We do not use advertising cookies or analytics pixels on this site today.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Why we use it</h2>
        <p>
          We use enquiry details to reply, to confirm a discovery call, and — if we take the work — to start an engagement. That
          is processing at your request, before any contract. We do not profile you, run ads against this data, or make automated
          decisions about you. The theme preference never leaves your browser.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Where it goes</h2>
        <p>
          The site is hosted on Vercel. Contact messages and call requests are sent with Resend to our inbox. The studio mark,
          team portraits, and selected work shots are served from Cloudinary. Type is loaded from Google Fonts and Fontshare.
          Those providers process what they need to host the page, deliver mail, or serve an asset. We do not sell that data.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Transfers outside Kenya</h2>
        <p>
          Vercel, Resend, Cloudinary, Google, and Fontshare may process that information outside Kenya. We use them only to run
          this site and to receive mail. If that is not acceptable, write to us at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> instead of using the forms.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>How long we keep it</h2>
        <p>
          We keep enquiry mail long enough to reply and to run the studio. If we work together, the file follows that engagement.
          You can ask us to delete an enquiry that did not become a project. Theme preference stays on your device until you
          clear it.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Security</h2>
        <p>
          The site is served over HTTPS. Enquiry mail lands in our inbox; we do not run a public database of contacts on this
          site. No setup is perfect. If you think a message went to the wrong place, write to{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Your rights</h2>
        <p>
          Under the Kenya Data Protection Act you can ask what we hold, ask for a copy, ask us to correct it, object to how we
          use it, ask us to restrict it, or ask us to erase it — subject to what the law still requires us to keep. Email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Complaints</h2>
        <p>
          If you are not satisfied with how we handle a request, you can complain to the Office of the Data Protection
          Commissioner (Kenya) at{" "}
          <a href="https://www.odpc.go.ke/" target="_blank" rel="noreferrer">
            odpc.go.ke
          </a>
          . We would rather hear from you first at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Children</h2>
        <p>This site is written for people who can enter a software engagement. We do not knowingly collect personal data from children.</p>
      </Reveal>
      <Reveal as="section">
        <h2>Changes</h2>
        <p>If we change this policy we update the date at the bottom of this page.</p>
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
