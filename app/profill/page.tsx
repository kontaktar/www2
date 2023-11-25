import {
  Main,
  Heading,
  Paragraph,
  Footer,
  Header,
  Button,
  Grid,
  Box,
} from "grommet";
import ProfileLayout from "@/components/Profile/Layout";
import { ProfileProvider } from "@/components/Profile/ContextProvider";

export default function Profile() {
  return (
    <>
      <Header background="light-3" pad="medium">
        <Box background="brand">
          <Heading>K</Heading>
        </Box>
        <Button primary label="Innskrá"></Button>
      </Header>
      <Main pad="medium" fill="horizontal" direction="column" flex="grow">
        <ProfileProvider>
          <ProfileLayout />
        </ProfileProvider>
      </Main>
      <Footer
        background="dark-1"
        pad={{ horizontal: "medium", vertical: "small" }}
      >
        <Grid
          rows={["xsmall"]}
          columns={["xsmall", "small"]}
          gap="none"
          areas={[
            { name: "nav", start: [0, 0], end: [0, 0] },
            { name: "main", start: [1, 0], end: [1, 0] },
          ]}
        >
          <Paragraph>Something</Paragraph>
          <Paragraph>Contact info</Paragraph>
          {/* <Box gridArea="nav" background="light-5" />
          <Box gridArea="main" background="light-2" /> */}
        </Grid>
      </Footer>
    </>
  );
}
