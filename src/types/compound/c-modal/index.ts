export interface ICModal {
  children: React.ReactNode;
  title?: string;
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
}
