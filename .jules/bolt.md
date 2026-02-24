## 2025-05-15 - [React 19 Context & Component Memoization]
**Learning:** In e-commerce apps with long lists (e.g., Products), consuming a Cart Context directly in a list item component (ProductCard) causes O(N) re-renders when the cart changes. Splitting the context or lifting the hook to the parent and passing stable actions as props reduces this to O(1).
**Action:** Always lift context consumers from list items to parents if they only need stable actions.

## 2025-05-15 - [Cascading Renders Lint Error in Next.js]
**Learning:** React 19 / Modern ESLint rules flag synchronous 'setState' inside 'useEffect' as an error ("cascading renders"). This is common when initializing state from 'localStorage' in Client Components.
**Action:** Consolidate multiple state variables into a single object and wrap the initialization in a nested function within 'useEffect' to satisfy the linter and improve atomicity.
