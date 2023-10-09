'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { FC, useState } from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const StyledComponentsRegistry: FC<Props> = ({ children }) => {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') {
    return <>{children}</>;
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
};

export default StyledComponentsRegistry;
