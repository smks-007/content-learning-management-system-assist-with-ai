import { formatDistanceToNow, format } from 'date-fns';
export const formatDate = (date) => date ? format(new Date(date), 'MMM dd, yyyy') : '';
export const formatDateTime = (date) => date ? format(new Date(date), 'MMM dd, yyyy HH:mm') : '';
export const timeAgo = (date) => date ? formatDistanceToNow(new Date(date), { addSuffix: true }) : '';
export const formatDuration = (seconds) => {
  if (!seconds) return '0m';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};
export const formatPrice = (amount, currency = 'USD') => {
  if (amount === 0) return 'Free';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
};
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};
