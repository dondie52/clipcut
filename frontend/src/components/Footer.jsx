/**
 * ClipCut - Free, Open-Source Video Editor
 * Copyright (c) 2026 ClipCut Contributors / Bokas Technologies (Pty) Ltd
 * Licensed under the MIT License
 *
 * @module components/Footer
 * @description Footer with legal links and copyright
 */

const FOOTER_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&display=swap');

  .cc-footer {
    background: #0e1218;
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 22px 40px;
    font-family: 'Spline Sans', sans-serif;
    color: rgba(255,255,255,0.5);
    font-size: 13px;
  }

  .cc-footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .cc-footer-links {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }

  .cc-footer-link {
    color: rgba(255,255,255,0.45);
    text-decoration: none;
    transition: color 0.2s ease;
    position: relative;
    font-weight: 500;
  }

  .cc-footer-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: #75AADB;
    transition: width 0.25s ease;
  }

  .cc-footer-link:hover {
    color: #75AADB;
  }

  .cc-footer-link:hover::after {
    width: 100%;
  }

  .cc-footer-copy {
    color: rgba(255,255,255,0.25);
    font-size: 12px;
  }

  @media (max-width: 768px) {
    .cc-footer {
      padding: 18px 24px;
    }

    .cc-footer-content {
      flex-direction: column;
      text-align: center;
    }

    .cc-footer-links {
      justify-content: center;
    }
  }
`;

const Footer = () => {
  return (
    <>
      <style>{FOOTER_CSS}</style>
      <footer className="cc-footer">
        <div className="cc-footer-content">
          <div className="cc-footer-links">
            <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="cc-footer-link">
              Privacy Policy
            </a>
            <a href="/terms-of-service.html" target="_blank" rel="noopener noreferrer" className="cc-footer-link">
              Terms of Service
            </a>
            <a href="https://github.com/dondie52/clipcut" target="_blank" rel="noopener noreferrer" className="cc-footer-link">
              GitHub
            </a>
          </div>
          <div className="cc-footer-copy">
            © 2026 ClipCut. Open source under MIT License.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
