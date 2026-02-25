import { memo } from 'react';

/* ========== ICON COMPONENT ========== */
const Icon = memo(({ 
  i, 
  s = 18, 
  c = "currentColor", 
  style = {},
  filled = false,
  weight = 400,
  ...props 
}) => (
  <span 
    className="material-symbols-outlined" 
    style={{ 
      fontSize: `${s}px`, 
      color: c,
      fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}`,
      transition: 'color 0.15s ease',
      userSelect: 'none',
      lineHeight: 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style 
    }}
    aria-hidden="true"
    {...props}
  >
    {i}
  </span>
));

Icon.displayName = 'Icon';

export default Icon;
