// Ambient declaration for side-effect CSS imports (e.g. `import "./globals.css"`).
// TypeScript 6.0 (TS2882) requires a type declaration for side-effect imports of
// non-code modules; Next.js still handles the actual CSS bundling at build time.
declare module "*.css"
