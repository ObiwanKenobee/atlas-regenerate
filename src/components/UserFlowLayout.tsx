import { ReactNode } from 'react';
import EcosystemNavigation from './EcosystemNavigation';

interface UserFlowLayoutProps {
  children: ReactNode;
}

export default function UserFlowLayout({ children }: UserFlowLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <EcosystemNavigation />
      <div className="md:ml-80">
        {children}
      </div>
    </div>
  );
}