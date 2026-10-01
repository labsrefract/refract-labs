import { Link } from "react-router";
import LegalPage from "../components/LegalPage";
import Reveal from "../components/Reveal";
import { site } from "../content/site";

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      description="How Refract Labs collects, uses, and shares personal information across the sites and products we operate."
      path="/privacy"
      subtitle="This policy covers websites, products, and services we operate. Software we build for a client under a separate agreement is covered by that agreement."
    >
      <Reveal as="section">
        <h2>Scope</h2>
        <div className="legal-copy-body">
          <p>
            This policy applies to personal information we handle when you visit our sites, contact us, use a product we
            operate, or otherwise deal with Refract Labs as a business. It does not apply to products we build and host for a
            client under a signed engagement — those have their own terms and privacy notices.
          </p>
          <p>
            If a product we operate publishes a more specific notice, that notice applies to that product where it is
            stricter or more detailed.
          </p>
        </div>
      </Reveal>
      <Reveal as="section">
        <h2>Who we are</h2>
        <p>
          Refract Labs is a software studio in {site.location}. We are the data controller for personal information collected
          through the services this policy covers. Questions:{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Information we collect</h2>
        <div className="legal-copy-body">
          <p>
            What we collect depends on how you use us. It may include identity and contact details (name, email, phone,
            company, role); enquiry and call details (message, service of interest, preferred time); account details if a
            product requires a login; usage and device data (pages viewed, approximate location from IP address, browser and
            device type); communications you send us; and payment-related details if you buy a product we operate — handled by
            a payment processor, not stored by us as full card numbers.
          </p>
          <p>
            We also store preferences on your device, such as a theme choice. We do not collect more than we need for the
            purpose at hand.
          </p>
        </div>
      </Reveal>
      <Reveal as="section">
        <h2>How we collect it</h2>
        <p>
          We collect information you give us (forms, email, calls, accounts), information created by your use of our sites
          and products (logs, cookies, and similar technologies — see the <Link to="/cookies">cookie policy</Link>), and
          information from service providers who help us run those services. We do not buy marketing lists.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Why we use it</h2>
        <div className="legal-copy-body">
          <p>
            We use personal information to operate and secure our sites and products; to reply to enquiries and confirm
            calls; to provide, bill for, and support products you use; to improve what we ship; to send service messages; and
            to meet legal duties. Where the law requires a basis, that is typically that you asked us to take a step (an
            enquiry, an account, a purchase), that we have a legitimate interest in running a studio, or that we must comply
            with the law.
          </p>
          <p>
            We do not sell personal information. We do not use it to make solely automated decisions that produce legal or
            similarly significant effects.
          </p>
        </div>
      </Reveal>
      <Reveal as="section">
        <h2>Who we share it with</h2>
        <div className="legal-copy-body">
          <p>
            We share information with service providers who host infrastructure, deliver email, process payments, store
            files, serve media or type, provide analytics or security, or otherwise help us operate. They may process data
            only for those tasks. We may also share information if the law requires it, to protect our rights or users, or
            if we restructure or transfer the studio — with appropriate safeguards.
          </p>
          <p>We do not sell your information to advertisers or data brokers.</p>
        </div>
      </Reveal>
      <Reveal as="section">
        <h2>Transfers outside Kenya</h2>
        <p>
          Some providers operate outside Kenya. When we use them, personal information may be processed in other countries.
          We use them only to run our services. If that is not acceptable, contact us at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> before submitting information, or stop using the relevant
          product.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>How long we keep it</h2>
        <p>
          We keep information only as long as needed for the purpose we collected it, including to reply, run a product
          account, complete an engagement, resolve disputes, and meet legal or accounting duties. Device preferences stay on
          your device until you clear them. You can ask us to delete an enquiry that did not become a project or an account
          that is no longer needed, subject to what the law requires us to keep.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Security</h2>
        <p>
          We use reasonable technical and organisational measures to protect personal information, including encrypted
          transport (HTTPS) and limiting access to people who need it. No method of storage or transmission is completely
          secure. If you believe personal information has been compromised, write to{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Your rights</h2>
        <p>
          Under the Kenya Data Protection Act you may ask what we hold, ask for a copy, ask us to correct it, object to
          processing, ask us to restrict it, or ask us to erase it — subject to what the law still requires us to keep. Where
          we rely on consent, you may withdraw it. Email <a href={`mailto:${site.email}`}>{site.email}</a>. We may need to
          verify who you are before we act.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Complaints</h2>
        <p>
          If you are not satisfied with how we handle a request, you may complain to the Office of the Data Protection
          Commissioner (Kenya) at{" "}
          <a href="https://www.odpc.go.ke/" target="_blank" rel="noreferrer">
            odpc.go.ke
          </a>
          . We would rather hear from you first at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Marketing</h2>
        <p>
          We may send you information about our work or products if you have asked for it or if the law allows. You can opt
          out of marketing at any time using the link in the message or by emailing us. Service messages about an enquiry,
          account, or purchase are not marketing and we may still send those.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Cookies</h2>
        <p>
          We use cookies and similar technologies as described in the <Link to="/cookies">cookie policy</Link>.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Children</h2>
        <p>
          Our sites and products are aimed at people who can enter a business relationship. We do not knowingly collect
          personal information from children. If you believe we have, contact us and we will delete it.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Third-party sites</h2>
        <p>
          Our sites and products may link to services we do not operate. Their privacy practices apply once you leave. We
          are not responsible for those services.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Changes</h2>
        <p>
          We may update this policy. The date at the bottom of the page is the version in force. Material changes will be
          reflected here. Continued use after a change means you accept the updated policy, except where the law requires
          something more.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Also see</h2>
        <p>
          Use of our sites and products is also covered by the <Link to="/terms">terms of service</Link>. Questions:{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Reveal>
    </LegalPage>
  );
}
