/**
 * Development Validation Tool
 * 
 * This file helps catch display name issues during development.
 * Use this to validate that technical identifiers are not leaking to the UI.
 */

import { isTechnicalIdentifier, getAllModuleKeys, getDisplayName } from "./modules-display";

/**
 * Validate that all registered module keys have display names
 * Run this during development to catch configuration errors
 */
export function validateModuleDisplayNames(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const allKeys = getAllModuleKeys();

  if (allKeys.length === 0) {
    errors.push("No module keys registered in modules-display.ts");
    return { valid: false, errors };
  }

  // Check for suspicious patterns
  allKeys.forEach((key) => {
    if (!key || typeof key !== "string") {
      errors.push(`Invalid key found: ${key}`);
    }

    if (key.length > 50) {
      errors.push(`Key is too long (${key.length} chars): ${key}`);
    }
  });

  if (errors.length === 0) {
    console.log(`✅ Module display names validation passed. ${allKeys.length} modules configured.`);
  } else {
    console.error(`❌ Module display names validation failed with ${errors.length} error(s):`);
    errors.forEach((err) => console.error(`   - ${err}`));
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Check if a text appears to be a technical identifier
 * Useful for debugging where internal names might leak to UI
 */
export function auditDisplayText(elements: HTMLElement[] = []): { valid: boolean; issues: string[] } {
  const issues: string[] = [];

  if (elements.length === 0) {
    // Check all text nodes in the document
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false,
    );

    let currentNode: Node | null;
    while ((currentNode = walker.nextNode())) {
      const text = currentNode.textContent?.trim();
      if (text && isTechnicalIdentifier(text)) {
        issues.push(`Found technical identifier in UI: "${text}"`);
      }
    }
  } else {
    // Check specific elements
    elements.forEach((el) => {
      const text = el.textContent?.trim();
      if (text && isTechnicalIdentifier(text)) {
        issues.push(`Element contains technical identifier: "${text}"\nElement: ${el.outerHTML.substring(0, 100)}`);
      }
    });
  }

  if (issues.length === 0) {
    console.log("✅ No technical identifiers found in UI text");
  } else {
    console.warn(`⚠️  Found ${issues.length} potential display name issues:`);
    issues.forEach((issue) => console.warn(`   ${issue}`));
  }

  return { valid: issues.length === 0, issues };
}

/**
 * Get suggestions for fixing display names in text
 */
export function suggestDisplayNameFix(technicalText: string): string {
  const displayName = getDisplayName(technicalText);

  if (displayName === technicalText) {
    return `Could not find mapping for "${technicalText}". Add it to MODULE_DISPLAY_NAMES in modules-display.ts`;
  }

  return `Replace "${technicalText}" with "${displayName}"`;
}

/**
 * Console helper - call this in the browser console during development
 */
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  (window as any).validateDisplayNames = () => {
    console.log("🔍 Validating display names...");
    const result = validateModuleDisplayNames();
    return result;
  };

  (window as any).auditUIText = () => {
    console.log("🔍 Auditing UI text for technical identifiers...");
    const result = auditDisplayText();
    return result;
  };

  (window as any).suggestFix = (text: string) => {
    const suggestion = suggestDisplayNameFix(text);
    console.log(`💡 Suggestion: ${suggestion}`);
    return suggestion;
  };
}

// Run validation on app startup in development
if (process.env.NODE_ENV === "development") {
  // Validate configuration
  validateModuleDisplayNames();

  // Optionally audit UI after a delay (after DOM is ready)
  if (typeof window !== "undefined") {
    window.addEventListener("load", () => {
      setTimeout(() => {
        // console.log("📋 Full UI audit:");
        // auditDisplayText();
      }, 1000);
    });
  }
}
