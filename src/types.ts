import type { ReactNode, ButtonHTMLAttributes } from 'react';

// ─── Button ──────────────────────────────────────────────────────────────────
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

// ─── Badge ────────────────────────────────────────────────────────────────────
export interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'custom';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  className?: string;
}

// ─── Alert ────────────────────────────────────────────────────────────────────
export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  hover?: boolean;
}

// ─── Divider ──────────────────────────────────────────────────────────────────
export interface DividerProps {
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

// ─── Section ──────────────────────────────────────────────────────────────────
export interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  container?: boolean;
}

// ─── Input ────────────────────────────────────────────────────────────────────
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  inputClassName?: string;
}

// ─── Textarea ─────────────────────────────────────────────────────────────────
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  resize?: 'none' | 'y' | 'x' | 'both';
  className?: string;
}

// ─── Select ───────────────────────────────────────────────────────────────────
export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  placeholder?: string;
  className?: string;
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// ─── RadioGroup ───────────────────────────────────────────────────────────────
export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnBackdrop?: boolean;
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────
export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

// ─── Accordion ────────────────────────────────────────────────────────────────
export interface AccordionItem {
  key: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
export interface TabItem {
  key: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultKey?: string;
  onChange?: (key: string) => void;
  className?: string;
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
}

// ─── Pagination ───────────────────────────────────────────────────────────────
export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showEdges?: boolean;
  className?: string;
}

// ─── Progress ─────────────────────────────────────────────────────────────────
export interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'error' | 'secondary';
  className?: string;
  animated?: boolean;
}

// ─── StatCard ─────────────────────────────────────────────────────────────────
export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: { value: number; label?: string };
  className?: string;
}

// ─── Table ────────────────────────────────────────────────────────────────────
export interface TableColumn<T> {
  key: string;
  header: string;
  sortable?: boolean;
  className?: string;
  render?: (row: T) => ReactNode;
}

export interface TableProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  keyField: string;
  loading?: boolean;
  emptyText?: string;
  className?: string;
  onRowClick?: (row: T) => void;
}
