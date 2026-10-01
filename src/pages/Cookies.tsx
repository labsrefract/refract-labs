import { Link } from "react-router";
import LegalPage from "../components/LegalPage";
import Reveal from "../components/Reveal";
import { site } from "../content/site";

export default function Cookies() {
  return (
    <LegalPage
      title="Cookie policy"
      description="How Refract Labs uses cookies and similar technologies on sites and products we operate."
      path="/cookies"
      subtitle="This policy explains cookies, local storage, and similar technologies on websites and products we operate."
    >
      <Reveal as="section">
        <h2>What these are</h2>
        <p>
          Cookies are small files stored on your device. We also use similar tools such as local storage and pixels. They
          help a site remember settings, keep a session, stay secure, or understand how it is used. Some are set by us
          (first-party). Some may be set by providers who help us operate (third-party).
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Types we may use</h2>
        <div className="legal-copy-body">
          <p>
            Strictly necessary cookies make a site or product work: security, load balancing, abuse protection, and keeping
            you signed in where there is an account. You cannot opt out of these and still use the service normally.
          </p>
          <p>
            Functional cookies remember choices such as theme, language, or dismissed notices. Analytics cookies help us
            understand traffic and which pages are useful, in aggregate. Marketing cookies — if we ever use them — would
            measure campaigns. We do not have to use every type.
          </p>
        </div>
      </Reveal>
      <Reveal as="section">
        <h2>What we use today</h2>
        <div className="legal-copy-body">
          <p>
            On our studio site we store a theme preference in local storage when you switch light or dark mode. That stays
            on your device. Our hosting and security providers may set strictly necessary cookies to serve the site and
            protect it from abuse. Submitting a form or requesting a call does not drop an advertising cookie.
          </p>
          <p>
            We do not currently run advertising or retargeting cookies on the studio site. Type and media may be loaded from
            third-party networks, which can see that your browser requested a file.
          </p>
        </div>
      </Reveal>
      <Reveal as="section">
        <h2>Products we operate</h2>
        <p>
          A product we operate may set additional cookies or local storage to keep you signed in, remember settings, prevent
          fraud, or measure use. If that product uses analytics or marketing cookies, it will say so on that product or in an
          update to this page.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>What we may add</h2>
        <p>
          We may introduce analytics or other tools later so we can improve the services. If we do, we will update this
          page. Where the law requires consent before a non-essential cookie is set, we will ask.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>How you can control them</h2>
        <div className="legal-copy-body">
          <p>
            You can clear cookies and site data in your browser, including for {site.url.replace("https://", "")}. You can
            also block cookies in browser settings. Blocking strictly necessary cookies may break sign-in, forms, or
            security features. Clearing site data removes the studio theme preference; the theme will follow your system
            until you choose again.
          </p>
          <p>
            Industry opt-out tools and browser controls for analytics or advertising, if we use those cookies, will be
            described here when they apply.
          </p>
        </div>
      </Reveal>
      <Reveal as="section">
        <h2>Changes</h2>
        <p>
          We may update this policy when our technology changes. The date at the bottom of the page is the version in force.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Related</h2>
        <p>
          Personal information is covered in the <Link to="/privacy">privacy policy</Link>. Using our sites and products is
          covered by the <Link to="/terms">terms of service</Link>. Questions:{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Reveal>
    </LegalPage>
  );
}
