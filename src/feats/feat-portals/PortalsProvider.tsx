import * as React from 'react';
import { PortalProvider } from 'react-native-portal';

/**
 * Use BlackPortal(name) to move it content to WhitePortal(name, childrenProps, children as default content)
 *
 * @param children
 * @constructor
 */
export default function PortalsProvider({ children }: React.PropsWithChildren<any>) {
  return (
    <PortalProvider>
      { children }
    </PortalProvider>
  );
}
