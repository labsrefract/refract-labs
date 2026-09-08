import { Link } from "react-router";
import LegalPage from "../components/LegalPage";
import Reveal from "../components/Reveal";
import { site } from "../content/site";

export default function Cookies() {
  return (
    <LegalPage
      title="Cookie policy"
      description="How Refract Labs uses cookies and local storage on this website."
      path="/cookies"
      subtitle="This site does not run advertising or analytics cookies. A theme preference is stored in your browser."
    >
      <Reveal as="section">
        <h2>What we store</h2>
        <p>
          When you switch between light and dark mode we save that choice in localStorage under the key{" "}
          <code>refract-theme</code>. That is not a third-party cookie. It stays on your device so the next visit matches
          the last theme you picked.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>What we do not use</h2>
        <p>
          We do not set advertising cookies, retargeting pixels, or analytics cookies on this marketing site. Sending a
          message or requesting a discovery call does not drop a tracking cookie.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>Hosting and type</h2>
        <p>
          Vercel may set a cookie that is strictly necessary to serve the site and protect it from abuse. Those are
          operational, not marketing. Type is loaded from Google Fonts, so Google may see the request for the font files. We
          do not set a cookie for that.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>How to clear it</h2>
        <p>
          Clear site data for {site.url.replace("https://", "")} in your browser to remove the theme preference. You can
          still use the site; the theme will follow your system setting until you choose again.
        </p>
      </Reveal>
      <Reveal as="section">
        <h2>More</h2>
        <p>
          Personal data from enquiries is covered in the <Link to="/privacy">privacy policy</Link>. Using the site is
          covered by the <Link to="/terms">terms of use</Link>. Questions:{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Reveal>
    </LegalPage>
  );
}
