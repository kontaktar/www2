import React, { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { IronSession, Routes, UserSessionStorage } from "types";
import { wrapper } from "store";
import { withSession } from "lib/sessions";
import { debug } from "helpers/debug";
import useAuth from "hooks/useAuthOld";
import { ProfileContainer, UserLayout } from "layouts";

type Props = {
  reroute?: boolean;
  user?: UserSessionStorage;
};
const Profile: NextPage<Props> = ({ reroute, user: userServerSide }) => {
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    if (reroute || (!user && !userServerSide)) {
      router.push(Routes.Login);
    }
  }, [user, userServerSide, reroute, router]);
  return (
    <UserLayout>
      <ProfileContainer editMode />
    </UserLayout>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) =>
    withSession(async ({ req }) => {
      const user: UserSessionStorage = req?.session?.get(
        IronSession.UserSession
      );

      debug("getServerSideProps user", user);

      if (user === undefined) {
        return { props: { reroute: true } };
      }

      return {
        props: { user },
      };
    })
  );

export default Profile;
