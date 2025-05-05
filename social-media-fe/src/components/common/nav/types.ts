import { ReactNode } from "react";

export interface NavigationMenu {
  title: string;
  icon: ReactNode;
  id: string;
  path?: string;
  isMobileVisible?: boolean;
}
