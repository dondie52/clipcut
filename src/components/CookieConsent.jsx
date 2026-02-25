/**
 * ClipCut - Free, Open-Source Video Editor
 * Copyright (c) 2025 ClipCut Contributors
 * Licensed under the MIT License
 * 
 * @module components/CookieConsent
 * @description Cookie Consent Component - Displays cookie consent banner for GDPR compliance
 */

import { useState, useEffect } from "react";

const COOKIE_CONSENT_KEY = "clipcut_cookie_consent";
const COOKIE_CONSENT_VERSION = "1.0";

/**
 * Cookie Consent Banner Component
 */
const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent) {
      try {
        const consentData = JSON.parse(consent);
        if (consentData.version === COOKIE_CONSENT_VERSION && consentData.accepted) {
          setConsentGiven(true);
          return;
        }
      } catch (e) {
        // Invalid consent data, show banner again
      }
    }

    // Show banner if no consent or outdated consent
    setShowBanner(true);
  }, []);

  const handleAccept = () => {
    const consentData = {
      version: COOKIE_CONSENT_VERSION,
      accepted: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
    setConsentGiven(true);
    setShowBanner(false);

    // Initialize analytics if consent is given
    // This will be handled by the analytics utility
    window.dispatchEvent(new CustomEvent("cookieConsentAccepted"));
  };

  const handleReject = () => {
    const consentData = {
      version: COOKIE_CONSENT_VERSION,
      accepted: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
    setConsentGiven(false);
    setShowBanner(false);

    // Disable analytics if consent is rejected
    window.dispatchEvent(new CustomEvent("cookieConsentRejected"));
  };

  if (!showBanner || consentGiven) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#1a2332",
        borderTop: "1px solid rgba(117, 170, 219, 0.2)",
        padding: "20px 24px",
        zIndex: 10000,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.3)",
        fontFamily: "'Spline Sans', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h3
            style={{
              color: "#75AADB",
              fontSize: "16px",
              fontWeight: 600,
              margin: "0 0 8px 0",
            }}
          >
            Cookie Consent
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "14px",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            We use cookies to improve your experience, analyze site usage, and assist in our
            marketing efforts. By clicking "Accept", you consent to our use of cookies.{" "}
            <a
              href="/privacy-policy.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#75AADB", textDecoration: "none" }}
            >
              Learn more
            </a>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexShrink: 0,
          }}
        >
          <button
            onClick={handleReject}
            style={{
              padding: "10px 20px",
              backgroundColor: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              color: "rgba(255,255,255,0.8)",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(255,255,255,0.4)";
              e.target.style.color = "rgba(255,255,255,1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(255,255,255,0.2)";
              e.target.style.color = "rgba(255,255,255,0.8)";
            }}
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            style={{
              padding: "10px 20px",
              backgroundColor: "#75AADB",
              border: "none",
              borderRadius: "8px",
              color: "#0a0a0a",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#5a8cbf";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#75AADB";
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
