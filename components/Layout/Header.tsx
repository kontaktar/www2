"use client";
import { Box, Heading, Button, Header } from "grommet";
import { useAuth } from "@/components/Auth/provider";
import { useRouter } from "next/navigation";
export default function LayoutHeader() {
  const { logOut, isLoggedIn } = useAuth();
  const router = useRouter();
  return (
    <Header background="light-3" pad="medium">
      <Box background="brand">
        <Heading>K</Heading>
      </Box>
      {!isLoggedIn ? (
        <Button
          primary
          label="Innskrá"
          onClick={() => {
            router.refresh();
            router.push("/innskra");
          }}
        ></Button>
      ) : (
        <Button primary label="Útskrá" onClick={() => logOut()}></Button>
      )}
    </Header>
  );
}
