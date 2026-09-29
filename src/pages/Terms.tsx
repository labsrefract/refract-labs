import { Link } from "react-router";
import LegalPage from "../components/LegalPage";
import Reveal from "../components/Reveal";
import { site } from "../content/site";

export default function Terms() {
  return (
    <LegalPage
      title="Terms of use"
      description="Terms for using the Refract Labs marketing website."
      path="/terms"
      subtitle="These terms cover this website. A software engagement is a separate signed agreement."
    >
      <Reveal as="section">
        <h2>The site</h2>
        <p>
          {site.url} is a marketing site for Refract Labs, a software studio in {site.location}. Content here is information,
          not a contract to design or build software. Paid work starts only when both sides sign an agreement.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Intellectual property</h2>
        <p>
          The mark, copy, and layout of this site belong to Refract Labs unless noted. Client products remain those clients’.
          Do not copy the site as a template for a competing studio.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Work on this site</h2>
        <p>
          Pages under Work describe selected past projects, shown with the client’s permission. They are not a specification, a
          quote, or a promise that your project will look the same.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Enquiries</h2>
        <p>
          Sending the contact form or requesting a discovery call is a request to talk, not a confirmed booking. We will confirm
          a call by email. Call times are offered in Africa/Nairobi (EAT). We decide which projects we take.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Third-party links</h2>
        <p>
          This site links to client products, LinkedIn, GitHub, and other services we do not control. Their terms and privacy
          rules apply once you leave {site.url.replace("https://", "")}.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Acceptable use</h2>
        <p>
          Do not misuse the site: no scraping that harms the service, no injecting malware, and no sending the contact form or
          call request with spam or unlawful content.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Liability</h2>
        <p>
          The site is provided as-is. We do not warrant that it will be uninterrupted or error-free. We are not liable for
          decisions you make from reading it.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of Kenya. Courts in Nairobi have exclusive jurisdiction, unless a later signed
          engagement says otherwise.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Changes</h2>
        <p>
          We may update these terms. The date at the bottom of the page is the version in force. Continued use of the site after
          a change means you accept the new terms.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Questions</h2>
        <p>
          Write to <a href={`mailto:${site.email}`}>{site.email}</a>. See also the{" "}
          <Link to="/privacy">privacy policy</Link> and <Link to="/cookies">cookie policy</Link>.
        </p>
      </Reveal>
    </LegalPage>
  );
}
