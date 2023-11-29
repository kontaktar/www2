"use client";
import {
  Accordion,
  AccordionPanel,
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Page,
  PageContent,
  Paragraph,
  TextInput,
} from "grommet";
import Register from "./Register";
import { useProfile } from "./ContextProvider";
import Experiences from "./Experiences";
export default function ProfileLayout() {
  const { userDetail, isLoadingUserDetail, isReady, experience } = useProfile();
  if (!isReady || isLoadingUserDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      {!userDetail?.id ? (
        <Page>
          <PageContent>
            <Register />
          </PageContent>
        </Page>
      ) : (
        <>
          <Heading level={1}>Hæ {userDetail?.firstName}</Heading>

          <Experiences />
        </>
      )}
    </Box>
  );
}
