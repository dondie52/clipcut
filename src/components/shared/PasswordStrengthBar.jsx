import { memo } from "react";
import { validatePassword, getPasswordStrengthInfo } from "../../utils/validation";

/**
 * Compute password strength info from a raw password string.
 * @param {string} pwd - Password to evaluate
 * @returns {{ segments: number, color: string, label: string, isValid: boolean, error: string|undefined }}
 */
export function getStrength(pwd) {
  if (!pwd) return { segments: 0, color: "#333", label: "" };
  const result = validatePassword(pwd);
  const info = getPasswordStrengthInfo(result.strength);
  return {
    segments: result.strength,
    color: info.color,
    label: info.label,
    isValid: result.valid,
    error: result.error,
  };
}

/**
 * Visual 4-segment password strength bar with label.
 * @param {{ password: string }} props
 */
const PasswordStrengthBar = memo(({ password }) => {
  if (!password) return null;
  const strength = getStrength(password);

  return (
    <div aria-live="polite">
      <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: "3px",
              borderRadius: "2px",
              background:
                strength.segments >= i
                  ? strength.color
                  : "rgba(255,255,255,0.06)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
      <span
        style={{
          fontSize: "11px",
          color: strength.color,
          marginTop: "4px",
          display: "block",
        }}
      >
        {strength.label}
        {strength.error && !strength.isValid && (
          <span style={{ display: "block", marginTop: "2px" }}>
            {strength.error}
          </span>
        )}
      </span>
    </div>
  );
});
PasswordStrengthBar.displayName = "PasswordStrengthBar";

export default PasswordStrengthBar;
