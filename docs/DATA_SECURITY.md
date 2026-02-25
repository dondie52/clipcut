# Data Security Documentation

This document outlines ClipCut's data security measures, encryption policies, backup strategies, and data retention/deletion policies.

## Overview

ClipCut is committed to protecting user data through industry-standard security practices. This document describes the technical and organizational measures we implement to ensure data security.

## Data Encryption

### Data in Transit

All data transmitted between the ClipCut application and our servers is encrypted using **HTTPS/TLS 1.2 or higher**.

- **Protocol:** TLS 1.2+ (Transport Layer Security)
- **Certificate:** Valid SSL/TLS certificates from trusted Certificate Authorities
- **Implementation:** Enforced at the infrastructure level (Supabase, Vercel)
- **Scope:** All API requests, authentication, file uploads, and downloads

**Verification:**
- All API endpoints require HTTPS
- Mixed content (HTTP resources on HTTPS pages) is blocked
- HSTS (HTTP Strict Transport Security) headers are configured

### Data at Rest

User data stored in our databases and storage systems is encrypted:

- **Database Encryption:** Supabase PostgreSQL databases use encryption at rest
- **Storage Encryption:** Supabase Storage buckets use server-side encryption
- **Encryption Algorithm:** AES-256 (industry standard)
- **Key Management:** Managed by Supabase infrastructure

**Data Types Encrypted:**
- User account information
- Project metadata
- Media files (videos, images, audio)
- Authentication tokens (hashed passwords)

## Authentication Security

### Password Security

- **Hashing Algorithm:** bcrypt (via Supabase Auth)
- **Salt Rounds:** 10+ (industry standard)
- **Password Requirements:** Minimum 8 characters (enforced by Supabase)
- **Storage:** Passwords are never stored in plain text

### Session Management

- **Session Tokens:** JWT (JSON Web Tokens) with expiration
- **Token Refresh:** Automatic refresh before expiration
- **PKCE Flow:** Enabled for OAuth providers (Google)
- **Storage:** Secure session storage (localStorage with security headers)

### Multi-Factor Authentication (MFA)

- **Status:** Available as an optional feature
- **Implementation:** Via Supabase Auth
- **Recommendation:** Enabled for enhanced security

## Data Backup Strategy

### Automated Backups

Supabase provides automated database backups:

- **Frequency:** Daily automated backups
- **Retention:** 7 days of point-in-time backups
- **Location:** Geographically distributed backup storage
- **Recovery:** Point-in-time recovery available

### Storage Backups

- **Media Files:** Stored in Supabase Storage with redundancy
- **Replication:** Data is replicated across multiple availability zones
- **Versioning:** File versioning available for critical data

### Manual Backups

Users can export their data at any time:

- **Export Format:** JSON (machine-readable)
- **Includes:** Account data, projects, templates
- **Access:** Available through Settings > Privacy & Data > Export My Data

## Data Retention Policies

### Active Accounts

- **Retention Period:** Indefinite (while account is active)
- **Data Types:** All user data is retained while the account is active
- **Purpose:** To provide continuous service and allow users to access their projects

### Deleted Accounts

- **Retention Period:** 30 days after account deletion
- **Process:**
  1. Immediate: Account marked as deleted, access revoked
  2. 0-7 days: Data marked for deletion, soft delete
  3. 7-30 days: Data permanently deleted from active systems
  4. 30+ days: Data removed from backups (if applicable)

### Inactive Accounts

- **Definition:** No login activity for 2+ years
- **Action:** Account may be archived or deleted after notification
- **Notification:** Email sent 30 days before archival/deletion

### Logs and Analytics

- **Application Logs:** Retained for 90 days
- **Error Logs:** Retained for 180 days (via Sentry)
- **Analytics Data:** Aggregated and anonymized, retained indefinitely
- **Access Logs:** Retained for 30 days for security auditing

## Data Deletion Policies

### User-Initiated Deletion

Users can delete their data through:

1. **Account Deletion:** Settings > Privacy & Data > Delete My Account
   - Deletes all user data
   - Irreversible after 30-day grace period

2. **Project Deletion:** Individual project deletion from Dashboard
   - Deletes project and associated media files
   - Immediate deletion from active systems

### Automatic Deletion

- **Temporary Files:** Deleted after 7 days of inactivity
- **Failed Uploads:** Deleted after 24 hours
- **Expired Sessions:** Deleted automatically on expiration

### Deletion Process

1. **Immediate:** User access revoked, data marked for deletion
2. **Scheduled:** Deletion job runs daily
3. **Verification:** Deletion verified through audit logs
4. **Backup Cleanup:** Backups cleaned during next backup cycle

## Access Control

### Role-Based Access Control (RBAC)

- **User Roles:** Standard users, administrators (future)
- **Permissions:** Users can only access their own data
- **Database:** Row-Level Security (RLS) policies enforced

### API Security

- **Authentication:** Required for all protected endpoints
- **Authorization:** User ID verified for all data operations
- **Rate Limiting:** Implemented to prevent abuse
- **CORS:** Configured to allow only trusted origins

### Infrastructure Access

- **Supabase Dashboard:** Restricted to authorized administrators
- **Vercel Dashboard:** Restricted to authorized administrators
- **GitHub Repository:** Public (open-source), but sensitive data excluded

## Security Monitoring

### Error Tracking

- **Service:** Sentry
- **Purpose:** Real-time error monitoring and alerting
- **Data:** Error logs, stack traces, user context (anonymized)
- **Retention:** 90 days

### Performance Monitoring

- **Service:** Sentry Performance Monitoring
- **Purpose:** Track application performance and identify bottlenecks
- **Data:** Performance metrics, transaction traces
- **Retention:** 30 days

### Analytics

- **Service:** Google Analytics 4
- **Purpose:** Usage analytics (with user consent)
- **Data:** Aggregated, anonymized usage statistics
- **Privacy:** IP anonymization enabled, no personal data collected

## Incident Response

### Security Incident Procedure

1. **Detection:** Automated monitoring and alerts
2. **Assessment:** Severity and impact evaluation
3. **Containment:** Immediate measures to prevent further damage
4. **Investigation:** Root cause analysis
5. **Remediation:** Fix vulnerabilities and restore services
6. **Notification:** Inform affected users if required by law
7. **Documentation:** Incident report and lessons learned

### Breach Notification

- **Timeline:** Within 72 hours of discovery (GDPR requirement)
- **Method:** Email notification to affected users
- **Content:** Description of breach, affected data, mitigation steps

## Compliance

### GDPR Compliance

ClipCut complies with the General Data Protection Regulation (GDPR):

- **Right to Access:** Users can export their data
- **Right to Erasure:** Users can delete their account and data
- **Right to Rectification:** Users can update their profile information
- **Right to Data Portability:** Data export in machine-readable format
- **Privacy by Design:** Security measures built into the application
- **Data Processing Agreement:** Supabase provides GDPR-compliant infrastructure

### Data Processing Activities

- **Purpose:** Provide video editing services
- **Legal Basis:** User consent and contract performance
- **Data Categories:** Account data, project data, usage data
- **Recipients:** Supabase (infrastructure), Google Analytics (with consent), Sentry (error tracking)

## Security Best Practices for Users

### Recommendations

1. **Strong Passwords:** Use unique, complex passwords
2. **Enable MFA:** Add an extra layer of security
3. **Regular Updates:** Keep your browser updated
4. **Secure Networks:** Avoid using public Wi-Fi for sensitive operations
5. **Account Monitoring:** Regularly review your account activity

## Security Updates

This document is reviewed and updated regularly to reflect current security practices. Last updated: January 2025.

## Contact

For security concerns or to report vulnerabilities, please contact:

- **Email:** security@clipcut.app
- **GitHub:** Open a security advisory on the repository

## References

- [Supabase Security Documentation](https://supabase.com/docs/guides/platform/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GDPR Official Text](https://gdpr-info.eu/)
