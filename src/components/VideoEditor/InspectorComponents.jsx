import { useState, useCallback, memo } from 'react';
import Icon from './Icon';

/* ========== CSS ANIMATIONS ========== */
const INSPECTOR_CSS = `
  .section-collapsible {
    transition: all 0.2s ease;
  }
  
  .section-header {
    transition: all 0.15s ease;
    cursor: pointer;
    border-radius: 4px;
    margin: -4px -8px;
    padding: 4px 8px;
  }
  
  .section-header:hover {
    background: rgba(117, 170, 219, 0.08);
  }
  
  .section-toggle-icon {
    transition: transform 0.2s ease;
  }
  
  .section-toggle-icon.collapsed {
    transform: rotate(-90deg);
  }
  
  .section-content {
    overflow: hidden;
    transition: all 0.2s ease;
  }
  
  .section-content.collapsed {
    max-height: 0;
    opacity: 0;
    margin-top: 0;
  }
  
  .section-content.expanded {
    max-height: 500px;
    opacity: 1;
    margin-top: 12px;
  }
  
  .inspector-slider {
    transition: all 0.1s ease;
  }
  
  .inspector-slider:hover {
    transform: scaleY(1.2);
  }
  
  .inspector-slider:focus {
    outline: none;
  }
  
  .inspector-input {
    transition: all 0.15s ease;
  }
  
  .inspector-input:hover {
    border-color: rgba(117, 170, 219, 0.3) !important;
  }
  
  .inspector-input:focus {
    border-color: #75aadb !important;
    box-shadow: 0 0 0 2px rgba(117, 170, 219, 0.2);
  }
  
  .effect-card {
    transition: all 0.15s ease;
  }
  
  .effect-card:hover {
    background: rgba(26, 35, 50, 0.8) !important;
    border-color: rgba(117, 170, 219, 0.3) !important;
  }
  
  .effect-action-btn {
    transition: all 0.1s ease;
    opacity: 0.6;
  }
  
  .effect-action-btn:hover {
    opacity: 1;
    transform: scale(1.1);
  }
  
  .color-swatch {
    transition: transform 0.1s ease, box-shadow 0.1s ease;
    cursor: pointer;
  }
  
  .color-swatch:hover {
    transform: scale(1.1);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  }
  
  .reset-btn {
    transition: all 0.15s ease;
    opacity: 0;
  }
  
  .slider-row:hover .reset-btn {
    opacity: 1;
  }
  
  .reset-btn:hover {
    color: #75aadb !important;
  }
`;

/* ========== COLLAPSIBLE SECTION COMPONENT ========== */
export const Section = memo(({ t, children, defaultExpanded = true, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  const handleToggle = useCallback(() => {
    setIsExpanded(prev => !prev);
    onToggle?.(!isExpanded);
  }, [isExpanded, onToggle]);
  
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  }, [handleToggle]);
  
  return (
    <div className="section-collapsible">
      <style>{INSPECTOR_CSS}</style>
      
      <div 
        className="section-header"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={`section-${t.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between"
        }}>
          <h3 style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}>
            <span 
              className={`section-toggle-icon ${isExpanded ? '' : 'collapsed'}`}
              style={{ display: 'flex' }}
            >
              <Icon i="expand_more" s={16} c="#64748b" />
            </span>
            {t}
          </h3>
        </div>
      </div>
      
      <div 
        id={`section-${t.toLowerCase().replace(/\s+/g, '-')}`}
        className={`section-content ${isExpanded ? 'expanded' : 'collapsed'}`}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}
      >
        {children}
      </div>
    </div>
  );
});

Section.displayName = 'Section';

/* ========== ROW COMPONENT ========== */
export const Row = memo(({ l, v, vc = "#cbd5e1", editable = false, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(v);
  
  const handleDoubleClick = useCallback(() => {
    if (editable) {
      setIsEditing(true);
      setEditValue(v);
    }
  }, [editable, v]);
  
  const handleBlur = useCallback(() => {
    setIsEditing(false);
    if (editValue !== v && onChange) {
      onChange(editValue);
    }
  }, [editValue, v, onChange]);
  
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(v);
    }
  }, [handleBlur, v]);
  
  return (
    <div 
      style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center" 
      }}
      role="group"
      aria-label={`${l}: ${v}`}
    >
      <span style={{ fontSize: "12px", color: "#cbd5e1" }}>{l}</span>
      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className="inspector-input"
          style={{
            background: '#1e293b',
            border: '1px solid #75aadb',
            borderRadius: '4px',
            padding: '2px 6px',
            fontSize: '12px',
            fontWeight: 500,
            color: vc,
            width: '80px',
            textAlign: 'right',
            outline: 'none'
          }}
        />
      ) : (
        <span 
          style={{ 
            fontSize: "12px", 
            fontWeight: 500, 
            color: vc,
            cursor: editable ? 'pointer' : 'default'
          }}
          onDoubleClick={handleDoubleClick}
          title={editable ? 'Double-click to edit' : undefined}
        >
          {v}
        </span>
      )}
    </div>
  );
});

Row.displayName = 'Row';

/* ========== FUNCTIONAL SLIDER COMPONENT ========== */
export const Slider = memo(({ 
  l, 
  v, 
  min = 0, 
  max = 100, 
  step = 1,
  unit = '%',
  value: controlledValue,
  onChange,
  onReset,
  defaultValue = 50
}) => {
  const [internalValue, setInternalValue] = useState(
    controlledValue !== undefined ? controlledValue : defaultValue
  );
  
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
  const displayValue = v !== undefined ? v : `${currentValue}${unit}`;
  
  const handleChange = useCallback((e) => {
    const newValue = Number(e.target.value);
    setInternalValue(newValue);
    onChange?.(newValue);
  }, [onChange]);
  
  const handleReset = useCallback((e) => {
    e.stopPropagation();
    setInternalValue(defaultValue);
    onChange?.(defaultValue);
    onReset?.();
  }, [defaultValue, onChange, onReset]);
  
  return (
    <div className="slider-row">
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "10px",
        color: "#64748b",
        marginBottom: "6px"
      }}>
        <span>{l}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ 
            color: currentValue !== defaultValue ? '#75aadb' : '#64748b',
            fontWeight: currentValue !== defaultValue ? 500 : 400
          }}>
            {displayValue}
          </span>
          {currentValue !== defaultValue && (
            <button
              onClick={handleReset}
              className="reset-btn"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label={`Reset ${l} to default`}
              title="Reset to default"
            >
              <Icon i="refresh" s={12} />
            </button>
          )}
        </div>
      </div>
      <input 
        type="range" 
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={handleChange}
        className="inspector-slider"
        style={{ 
          width: "100%", 
          accentColor: "#75aadb",
          cursor: 'pointer'
        }}
        aria-label={`${l}: ${displayValue}`}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={currentValue}
      />
    </div>
  );
});

Slider.displayName = 'Slider';

/* ========== SMALL INPUT COMPONENT ========== */
export const SmallInput = memo(({ 
  l, 
  v, 
  type = 'text',
  onChange,
  min,
  max,
  step
}) => {
  const [value, setValue] = useState(v);
  const [isFocused, setIsFocused] = useState(false);
  
  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (value !== v && onChange) {
      onChange(value);
    }
  }, [value, v, onChange]);
  
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  }, []);
  
  return (
    <div>
      <label 
        style={{
          fontSize: "10px",
          color: isFocused ? "#75aadb" : "#64748b",
          display: "block",
          marginBottom: "4px",
          transition: 'color 0.15s ease'
        }}
      >
        {l}
      </label>
      <input 
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        min={min}
        max={max}
        step={step}
        className="inspector-input"
        style={{
          width: "100%",
          background: "#1e293b",
          border: "1px solid transparent",
          borderRadius: "4px",
          fontSize: "12px",
          padding: "6px 8px",
          color: "#75aadb",
          textAlign: "center",
          outline: "none",
          boxSizing: "border-box",
          fontFamily: "'Spline Sans',sans-serif"
        }}
        aria-label={l}
      />
    </div>
  );
});

SmallInput.displayName = 'SmallInput';

/* ========== EFFECT CARD COMPONENT ========== */
export const EffectCard = memo(({ 
  number, 
  name, 
  enabled = true,
  onEdit, 
  onDelete,
  onToggle
}) => {
  return (
    <div 
      className="effect-card"
      style={{
        background: "rgba(26,35,50,0.5)",
        borderRadius: "4px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid rgba(255,255,255,0.05)",
        opacity: enabled ? 1 : 0.5
      }}
      role="listitem"
      aria-label={`${name} effect${enabled ? '' : ' (disabled)'}`}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={onToggle}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex'
          }}
          aria-label={enabled ? 'Disable effect' : 'Enable effect'}
          title={enabled ? 'Disable' : 'Enable'}
        >
          <Icon 
            i={enabled ? "visibility" : "visibility_off"} 
            s={14} 
            c={enabled ? "#75aadb" : "#64748b"} 
          />
        </button>
        <div>
          <span style={{ fontSize: "10px", color: "#94a3b8", display: "block" }}>
            NO {number}
          </span>
          <span style={{ fontSize: "12px", fontWeight: 500, color: "#e2e8f0" }}>
            {name}
          </span>
        </div>
      </div>
      <div style={{ display: "flex", gap: "6px" }}>
        <button
          onClick={onEdit}
          className="effect-action-btn"
          style={{
            background: 'none',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
          aria-label={`Edit ${name}`}
          title="Edit"
        >
          <Icon i="edit" s={16} c="#64748b" />
        </button>
        <button
          onClick={onDelete}
          className="effect-action-btn"
          style={{
            background: 'none',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
          aria-label={`Delete ${name}`}
          title="Delete"
        >
          <Icon i="delete" s={16} c="#64748b" />
        </button>
      </div>
    </div>
  );
});

EffectCard.displayName = 'EffectCard';

/* ========== COLOR PICKER COMPONENT ========== */
export const ColorPicker = memo(({ 
  label, 
  value = '#ffffff', 
  onChange,
  presets = ['#ffffff', '#000000', '#75aadb', '#ef4444', '#22c55e', '#eab308', '#a855f7', '#ec4899']
}) => {
  const [showPicker, setShowPicker] = useState(false);
  
  return (
    <div>
      <span style={{
        fontSize: "10px",
        color: "#64748b",
        display: "block",
        marginBottom: "6px"
      }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="color-swatch"
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '4px',
            background: value,
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}
          aria-label={`Selected color: ${value}`}
          title="Click to change color"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="inspector-input"
          style={{
            flex: 1,
            background: '#1e293b',
            border: '1px solid transparent',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '11px',
            color: '#94a3b8',
            fontFamily: 'monospace',
            outline: 'none'
          }}
          aria-label={`${label} color value`}
        />
      </div>
      
      {showPicker && (
        <div style={{
          display: 'flex',
          gap: '4px',
          marginTop: '8px',
          flexWrap: 'wrap'
        }}>
          {presets.map(color => (
            <button
              key={color}
              onClick={() => {
                onChange?.(color);
                setShowPicker(false);
              }}
              className="color-swatch"
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '4px',
                background: color,
                border: value === color 
                  ? '2px solid #75aadb' 
                  : '1px solid rgba(255, 255, 255, 0.1)'
              }}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      )}
    </div>
  );
});

ColorPicker.displayName = 'ColorPicker';

/* ========== HORIZONTAL RULE COMPONENT ========== */
export const Hr = memo(() => (
  <div 
    style={{ 
      height: "1px", 
      background: "rgba(255,255,255,0.05)",
      margin: "4px 0"
    }}
    role="separator"
  />
));

Hr.displayName = 'Hr';
