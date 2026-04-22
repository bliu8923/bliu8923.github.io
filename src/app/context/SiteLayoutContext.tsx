import { createContext, useContext, useState, type ReactNode } from 'react';

type SiteLayoutValue = {
  projectsHeaderHidden: boolean;
  setProjectsHeaderHidden: (hidden: boolean) => void;
};

const SiteLayoutContext = createContext<SiteLayoutValue | null>(null);

export function SiteLayoutProvider({ children }: { children: ReactNode }) {
  const [projectsHeaderHidden, setProjectsHeaderHidden] = useState(false);
  return (
    <SiteLayoutContext.Provider value={{ projectsHeaderHidden, setProjectsHeaderHidden }}>
      {children}
    </SiteLayoutContext.Provider>
  );
}

export function useSiteLayout() {
  const c = useContext(SiteLayoutContext);
  if (!c) {
    throw new Error('useSiteLayout must be used within SiteLayoutProvider');
  }
  return c;
}
