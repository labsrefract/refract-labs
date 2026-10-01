import { Link } from "react-router";
import LegalPage from "../components/LegalPage";
import Reveal from "../components/Reveal";
import { site } from "../content/site";

export default function Terms() {
  return (
    <LegalPage
      title="Terms of service"
      description="Terms for using websites, products, and services operated by Refract Labs."
      path="/terms"
      subtitle="These terms cover sites and products we operate. A signed engagement or product agreement, if you have one, controls if it conflicts."
    >
      <Reveal as="section">
        <h2>Agreement</h2>
        <p>
          By using a website, product, or service operated by Refract Labs, you agree to these terms and to our{" "}
          <Link to="/privacy">privacy policy</Link> and <Link to="/cookies">cookie policy</Link>. If you do not agree, do not
          use them.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Scope</h2>
        <div className="legal-copy-body">
          <p>
            Refract Labs is a software studio in {site.location}. These terms apply to our public sites and to products we
            operate under our own name. They are not a contract to design or build software for you.
          </p>
          <p>
            Custom work starts only when both sides sign an engagement. Software we build for a client remains governed by
            that engagement, not by these terms. If a product we operate has its own terms, those product terms apply to that
            product where they are more specific.
          </p>
        </div>
      </Reveal>
      <Reveal as="section">
        <h2>Eligibility</h2>
        <p>
          You must be able to form a binding contract under the laws of Kenya (or your place of residence, if stricter). You
          may not use our services if doing so would be unlawful. If you use them for an organisation, you confirm you have
          authority to bind it.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Accounts</h2>
        <p>
          Some products may require an account. You are responsible for the accuracy of the details you give us, for keeping
          credentials confidential, and for activity under the account. Tell us promptly if you think an account is
          compromised. We may refuse, suspend, or close an account if these terms are broken or if we must do so to protect
          the service or other users.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Enquiries and studio work</h2>
        <p>
          Sending a contact form, booking request, or email is a request to talk, not a confirmed booking and not an
          engagement. We will confirm calls by email. Call times are offered in Africa/Nairobi (EAT) unless we agree
          otherwise. We decide which projects we take. Fees, scope, timeline, and IP for custom work are only those in a
          signed agreement.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Products we operate</h2>
        <p>
          We may offer products on their own domains, linked from our studio site. Access, features, uptime, and support for
          a product are as described on that product or in its agreement. We may change, suspend, or discontinue a product
          with reasonable notice where we can. We do not guarantee that a product will meet a particular business outcome.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Fees</h2>
        <p>
          Studio sites are free to browse. Paid products, if any, are billed as stated at purchase or in that product’s
          agreement. Custom software is billed only under a signed engagement. Taxes are extra where they apply. Except where
          the law requires otherwise, fees are non-refundable once the relevant period or deliverable has been provided.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Acceptable use</h2>
        <p>
          You may not misuse our sites or products: no unauthorised access, no interference with security or availability, no
          malware, no scraping that harms the service, no spam or unlawful content, no infringement of others’ rights, and no
          use that would make us break the law. We may investigate and take down material or access that violates this.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Intellectual property</h2>
        <div className="legal-copy-body">
          <p>
            The marks, copy, layout, software, and other material we publish on our sites and in products we operate belong
            to Refract Labs or our licensors, unless noted. You receive a limited, revocable licence to use them only as
            needed to use the service, not to copy, resell, or build a competing product from them.
          </p>
          <p>
            Client products and brands remain those clients’. Selected work shown on our site is shown with permission. It
            is not a specification, a quote, or a promise that your project will look the same.
          </p>
        </div>
      </Reveal>
      <Reveal as="section">
        <h2>Your content</h2>
        <p>
          You keep ownership of material you submit to us (messages, account data, files you upload to a product). You grant
          us a licence to use that material only as needed to operate the service, reply, and meet the law. You confirm you
          have the right to submit it and that it is lawful. We may remove content that breaks these terms.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Third parties</h2>
        <p>
          Our sites and products may link to or rely on third-party services (including client sites, social networks, hosting,
          payments, and other tools). We do not control them. Their terms and privacy rules apply. We are not responsible for
          their availability or content.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Availability</h2>
        <p>
          We aim to keep sites and products available, but we do not warrant uninterrupted or error-free operation. We may
          perform maintenance, and outages may occur. Features may change. Nothing on a marketing page is a service-level
          commitment unless a signed agreement says so.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Disclaimers</h2>
        <p>
          Sites and products are provided as-is and as-available, to the fullest extent permitted by Kenya law. We disclaim
          implied warranties of merchantability, fitness for a particular purpose, and non-infringement. Information on our
          sites is general. It is not professional, legal, or financial advice, and it is not an offer we must accept.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Liability</h2>
        <div className="legal-copy-body">
          <p>
            To the fullest extent permitted by Kenya law, Refract Labs is not liable for indirect, incidental, special,
            consequential, or punitive loss, or for lost profits, revenue, data, or goodwill, arising from use of our sites
            or products, even if we were told it was possible.
          </p>
          <p>
            Our total liability for a claim relating to a site or product is limited to the fees you paid us for that site or
            product in the twelve months before the claim, or — if you paid none — to a refund of any amount actually paid
            for the specific item at issue. Nothing in these terms limits liability that Kenya law does not allow to be
            limited, including for fraud or death or personal injury caused by negligence.
          </p>
        </div>
      </Reveal>
      <Reveal as="section">
        <h2>Indemnity</h2>
        <p>
          You will indemnify Refract Labs against claims, losses, and reasonable costs arising from your misuse of our sites
          or products, your content, or your breach of these terms, except to the extent we caused the harm.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Suspension and termination</h2>
        <p>
          You may stop using our sites at any time. You may close a product account as that product allows. We may suspend or
          end access if you break these terms, if we discontinue a service, or if we must do so for legal or security
          reasons. Sections that should survive (including IP, liability, indemnity, and governing law) remain in force.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of Kenya. Courts in Nairobi have exclusive jurisdiction, unless a later signed
          engagement or product agreement says otherwise, or Kenya law requires a different forum.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>General</h2>
        <p>
          If a part of these terms cannot be enforced, the rest remains in force. Our failure to enforce a right is not a
          waiver. You may not assign these terms without our consent; we may assign them in connection with a reorganisation
          or transfer of the studio. These terms, together with the privacy and cookie policies and any signed agreement for
          a specific service, are the whole agreement for that service.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Changes</h2>
        <p>
          We may update these terms. The date at the bottom of the page is the version in force. Continued use after a change
          means you accept the new terms, except where the law requires us to obtain consent or give specific notice.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Contact</h2>
        <p>
          Write to <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Reveal>
    </LegalPage>
  );
}
