export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning';
  duration: number;
}
