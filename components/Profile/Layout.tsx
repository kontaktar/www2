"use client";
import { Page, PageContent } from "grommet";
import useAuth from "hooks/useAuth";
import Register from "./Register";
import useSWR from "swr";
import { useProfile } from "./ContextProvider";
export default function ProfileLayout() {
  const { userDetail, isLoadingUserDetail, isReady } = useProfile();
  console.log(
    "%c userDetail",
    "color:white; padding: 30px; background-color: red",
    userDetail
  );

  if (!isReady || isLoadingUserDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Page>
      <PageContent>
        {userDetail?.id ? (
          <h1>Welcome {userDetail?.firstName}</h1>
        ) : (
          <>
            <Register />
          </>
        )}
      </PageContent>
    </Page>
  );
}
