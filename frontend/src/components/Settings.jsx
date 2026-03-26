/**
 * ClipCut - Free, Open-Source Video Editor
 * Copyright (c) 2025 ClipCut Contributors
 * Licensed under the MIT License
 * 
 * @module components/Settings
 * @description Settings Page Component - User settings and GDPR compliance features
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../supabase/AuthContext";
import {
  exportUserData,
  downloadUserDataExport,
  deleteUserData,
} from "../services/gdprService";
import { supabase } from "../supabase/supabaseClient";

const SETTINGS_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&display=swap');

  * { box-sizing: border-box; }

  .settings-root {
    width: 100vw; height: 100vh; background: #0a0a0a;
    font-family: 'Spline Sans', sans-serif; display: flex;
    overflow: hidden; color: white;
  }

  .settings-sidebar {
    width: 200px; min-width: 200px; background: #0e1218;
    border-right: 1px solid rgba(255,255,255,0.06);
    display: flex; flex-direction: column; padding: 20px 0;
  }

  .settings-sidebar-header {
    padding: 0 20px 20px; border-bottom: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 20px;
  }

  .settings-sidebar-header h2 {
    font-size: 18px; font-weight: 700; margin: 0;
    color: #75AADB;
  }

  .settings-nav {
    padding: 0 8px;
  }

  .settings-nav-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 14px; border-radius: 8px;
    cursor: pointer; font-size: 14px; font-weight: 500;
    color: rgba(255,255,255,0.55); transition: all 0.15s ease;
    border: none; background: none; width: 100%; text-align: left;
    margin-bottom: 4px;
  }

  .settings-nav-item:hover {
    background: rgba(255,255,255,0.05);
    color: rgba(255,255,255,0.8);
  }

  .settings-nav-item.active {
    background: rgba(117,170,219,0.1);
    color: white; font-weight: 600;
  }

  .settings-nav-item .material-symbols-outlined {
    font-size: 22px;
  }

  .settings-main {
    flex: 1; overflow-y: auto; padding: 40px;
    scrollbar-width: thin; scrollbar-color: #1e293b transparent;
  }

  .settings-main::-webkit-scrollbar { width: 6px; }
  .settings-main::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 3px; }

  .settings-section {
    max-width: 700px; margin-bottom: 40px;
  }

  .settings-section h1 {
    font-size: 28px; font-weight: 700; margin: 0 0 8px;
    color: #75AADB;
  }

  .settings-section p {
    color: rgba(255,255,255,0.6); font-size: 14px;
    margin: 0 0 24px; line-height: 1.6;
  }

  .settings-card {
    background: #1a2332; border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px; padding: 24px; margin-bottom: 16px;
  }

  .settings-card h3 {
    font-size: 18px; font-weight: 600; margin: 0 0 12px;
    color: white;
  }

  .settings-card p {
    color: rgba(255,255,255,0.6); font-size: 14px;
    margin: 0 0 16px; line-height: 1.6;
  }

  .settings-button {
    padding: 10px 20px; border-radius: 8px;
    font-size: 14px; font-weight: 600; cursor: pointer;
    font-family: inherit; transition: all 0.2s ease;
    border: none;
  }

  .settings-button-primary {
    background: #75AADB; color: #0a0a0a;
  }

  .settings-button-primary:hover {
    background: #5a8cbf;
  }

  .settings-button-danger {
    background: #ef4444; color: white;
  }

  .settings-button-danger:hover {
    background: #dc2626;
  }

  .settings-button-secondary {
    background: rgba(26,35,50,0.5);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.8);
  }

  .settings-button-secondary:hover {
    background: rgba(26,35,50,0.8);
    border-color: rgba(255,255,255,0.2);
  }

  .settings-input {
    width: 100%; padding: 10px 14px;
    background: rgba(26,35,50,0.5);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px; color: white; font-size: 14px;
    font-family: inherit; outline: none;
  }

  .settings-input:focus {
    border-color: rgba(117,170,219,0.4);
  }

  .settings-loading {
    display: inline-block; width: 16px; height: 16px;
    border: 2px solid rgba(117,170,219,0.2);
    border-top-color: #75AADB; border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-left: 8px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .settings-warning {
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.3);
    border-radius: 8px; padding: 16px;
    margin: 16px 0; color: rgba(255,255,255,0.9);
    font-size: 14px;
  }

  .settings-warning strong {
    color: #ef4444;
  }
`;

const I = ({ i, s = 20, c, fill = false, style: sx }) => (
  <span
    className="material-symbols-outlined"
    style={{
      fontSize: s,
      color: c,
      fontVariationSettings: fill ? "'FILL' 1" : "'FILL' 0",
      ...sx,
    }}
  >
    {i}
  </span>
);

const Settings = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("account");
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      await downloadUserDataExport(user?.id);
      alert("Data export downloaded successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export data. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "DELETE") {
      alert('Please type "DELETE" to confirm account deletion.');
      return;
    }

    if (
      !window.confirm(
        "Are you absolutely sure? This will permanently delete your account and all your data. This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteUserData(user?.id);
      // Sign out and redirect to login
      await signOut();
      navigate("/login");
      alert("Your account and all data have been deleted.");
    } catch (error) {
      console.error("Deletion failed:", error);
      alert(
        "Failed to delete account. Some data may require manual deletion. Please contact support."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="settings-root">
      <style>{SETTINGS_CSS}</style>

      {/* Sidebar */}
      <aside className="settings-sidebar">
        <div className="settings-sidebar-header">
          <h2>Settings</h2>
        </div>
        <nav className="settings-nav">
          <button
            className={`settings-nav-item ${activeTab === "account" ? "active" : ""}`}
            onClick={() => setActiveTab("account")}
          >
            <I i="person" s={22} />
            <span>Account</span>
          </button>
          <button
            className={`settings-nav-item ${activeTab === "privacy" ? "active" : ""}`}
            onClick={() => setActiveTab("privacy")}
          >
            <I i="privacy_tip" s={22} />
            <span>Privacy & Data</span>
          </button>
          <button
            className={`settings-nav-item ${activeTab === "legal" ? "active" : ""}`}
            onClick={() => setActiveTab("legal")}
          >
            <I i="gavel" s={22} />
            <span>Legal</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="settings-main">
        {activeTab === "account" && (
          <div className="settings-section">
            <h1>Account Settings</h1>
            <p>Manage your account information and preferences.</p>

            <div className="settings-card">
              <h3>Account Information</h3>
              <p>
                <strong>Email:</strong> {user?.email || "Not available"}
              </p>
              <p>
                <strong>User ID:</strong> {user?.id || "Not available"}
              </p>
              <p style={{ marginTop: "16px", color: "rgba(255,255,255,0.5)" }}>
                To change your email or password, please use the authentication provider's
                settings or contact support.
              </p>
            </div>

            <div className="settings-card">
              <h3>Sign Out</h3>
              <p>Sign out of your ClipCut account on this device.</p>
              <button
                className="settings-button settings-button-secondary"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {activeTab === "privacy" && (
          <div className="settings-section">
            <h1>Privacy & Data</h1>
            <p>
              Manage your privacy settings and exercise your data rights under GDPR and other
              privacy regulations.
            </p>

            <div className="settings-card">
              <h3>Export Your Data</h3>
              <p>
                Download a copy of all your data stored in ClipCut, including your account
                information, projects, and templates. The data will be provided in JSON format.
              </p>
              <button
                className="settings-button settings-button-primary"
                onClick={handleExportData}
                disabled={isExporting}
              >
                {isExporting ? (
                  <>
                    Exporting...
                    <span className="settings-loading" />
                  </>
                ) : (
                  <>
                    <I i="download" s={18} c="#0a0a0a" style={{ marginRight: "8px" }} />
                    Export My Data
                  </>
                )}
              </button>
            </div>

            <div className="settings-card">
              <h3>Delete Your Account</h3>
              <p>
                Permanently delete your ClipCut account and all associated data. This action
                cannot be undone.
              </p>
              <div className="settings-warning">
                <strong>Warning:</strong> This will permanently delete:
                <ul style={{ marginTop: "8px", marginLeft: "20px" }}>
                  <li>Your account and profile</li>
                  <li>All your projects and media files</li>
                  <li>All your templates</li>
                  <li>All your preferences and settings</li>
                </ul>
              </div>
              <p style={{ marginTop: "16px" }}>
                Type <strong>DELETE</strong> to confirm:
              </p>
              <input
                type="text"
                className="settings-input"
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                placeholder="Type DELETE to confirm"
                style={{ marginBottom: "16px" }}
              />
              <button
                className="settings-button settings-button-danger"
                onClick={handleDeleteAccount}
                disabled={isDeleting || deleteConfirm !== "DELETE"}
              >
                {isDeleting ? (
                  <>
                    Deleting...
                    <span className="settings-loading" />
                  </>
                ) : (
                  <>
                    <I i="delete_forever" s={18} c="white" style={{ marginRight: "8px" }} />
                    Delete My Account
                  </>
                )}
              </button>
            </div>

            <div className="settings-card">
              <h3>Cookie Preferences</h3>
              <p>
                Manage your cookie preferences. You can change these settings at any time.
              </p>
              <button
                className="settings-button settings-button-secondary"
                onClick={() => {
                  localStorage.removeItem("clipcut_cookie_consent");
                  window.location.reload();
                }}
              >
                Reset Cookie Consent
              </button>
            </div>
          </div>
        )}

        {activeTab === "legal" && (
          <div className="settings-section">
            <h1>Legal</h1>
            <p>Review our legal documents and policies.</p>

            <div className="settings-card">
              <h3>Privacy Policy</h3>
              <p>
                Learn how we collect, use, and protect your personal information.
              </p>
              <a
                href="/privacy-policy.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <button className="settings-button settings-button-secondary">
                  <I i="privacy_tip" s={18} c="rgba(255,255,255,0.8)" style={{ marginRight: "8px" }} />
                  View Privacy Policy
                </button>
              </a>
            </div>

            <div className="settings-card">
              <h3>Terms of Service</h3>
              <p>
                Read our terms of service and user responsibilities.
              </p>
              <a
                href="/terms-of-service.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <button className="settings-button settings-button-secondary">
                  <I i="description" s={18} c="rgba(255,255,255,0.8)" style={{ marginRight: "8px" }} />
                  View Terms of Service
                </button>
              </a>
            </div>

            <div className="settings-card">
              <h3>Open Source License</h3>
              <p>
                ClipCut is released under the MIT License. View the full license text.
              </p>
              <a
                href="https://github.com/dondie52/clipcut/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <button className="settings-button settings-button-secondary">
                  <I i="code" s={18} c="rgba(255,255,255,0.8)" style={{ marginRight: "8px" }} />
                  View License
                </button>
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Settings;
