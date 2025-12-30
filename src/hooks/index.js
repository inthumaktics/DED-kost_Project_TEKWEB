// hooks/index.js - UPDATE SIMPLE
export { default as useKosts } from './useKosts';
export { default as useAdminKosts } from './useAdminKosts';
export { default as useCheckout } from './useCheckout';
export { default as useFetch } from './useFetch';

// Optional: Juga export semuanya sebagai object
export default {
  useKosts,
  useAdminKosts,
  useCheckout,
  useFetch
};