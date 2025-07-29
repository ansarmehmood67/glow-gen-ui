import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function injectTailwindCSS(htmlContent: string): string {
  if (!htmlContent) return htmlContent;
  
  const tailwindScript = '<script src="https://cdn.tailwindcss.com"></script>';
  
  // Check if Tailwind is already injected
  if (htmlContent.includes('cdn.tailwindcss.com')) {
    return htmlContent;
  }
  
  // If HTML has a head tag, inject before closing </head>
  if (htmlContent.includes('</head>')) {
    return htmlContent.replace('</head>', `${tailwindScript}</head>`);
  }
  
  // If HTML has opening head tag but no closing, inject after it
  if (htmlContent.includes('<head>')) {
    return htmlContent.replace('<head>', `<head>${tailwindScript}`);
  }
  
  // If no head tag, wrap content with proper HTML structure
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${tailwindScript}
</head>
<body>
  ${htmlContent}
</body>
</html>`;
}
