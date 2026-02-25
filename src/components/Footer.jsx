/**
 * ClipCut - Free, Open-Source Video Editor
 * Copyright (c) 2025 ClipCut Contributors
 * Licensed under the MIT License
 * 
 * @module components/Footer
 * @description Footer Component - Displays footer with legal links and copyright
 */

const FOOTER_CSS = `
  .footer {
    background: #0e1218;
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 24px 40px;
    font-family: 'Spline Sans', sans-serif;
    color: rgba(255,255,255,0.6);
    font-size: 14px;
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .footer-links {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }

  .footer-link {
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .footer-link:hover {
    color: #75AADB;
  }

  .footer-copyright {
    color: rgba(255,255,255,0.4);
    font-size: 12px;
  }

  @media (max-width: 768px) {
    .footer {
      padding: 20px 24px;
    }

    .footer-content {
      flex-direction: column;
      text-align: center;
    }

    .footer-links {
      justify-content: center;
    }
  }
`;

const Footer = () => {
  return (
    <>
      <style>{FOOTER_CSS}</style>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="footer-link">
              Privacy Policy
            </a>
            <a href="/terms-of-service.html" target="_blank" rel="noopener noreferrer" className="footer-link">
              Terms of Service
            </a>
            <a
              href="https://github.com/dondie52/clipcut"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub
            </a>
          </div>
          <div className="footer-copyright">
            © 2025 ClipCut. Open source under MIT License.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
