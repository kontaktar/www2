"use client";
import { SessionProvider } from "next-auth/react";
import { Box, Grommet, Page, defaultProps } from "grommet";
import StyledComponentsRegistry from "@/lib/styleregistry";
import { SWRConfig } from "swr";
export default function Providers({ children }) {
  const theme = {
    global: {
      font: {
        family: "BerlingskeSans",
        size: "18px",
        height: "20px",
      },
    },
    ...defaultProps.theme,
  };

  return (
    <SessionProvider>
      <StyledComponentsRegistry>
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <Grommet theme={theme} full>
            <Box fill>{children}</Box>
          </Grommet>
        </SWRConfig>
      </StyledComponentsRegistry>
    </SessionProvider>
  );
}
