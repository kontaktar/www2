import Image from "next/image";
import Link from "next/link";
import AuthProvider from "@/components/Auth/provider";
import { Header } from "components";
import FrontPageContainer from "layouts/FrontPageContainer/FrontPageContainer";
import MainLayout from "layouts/MainLayout/MainLayout";

export default function Home() {
  return (
    <AuthProvider>
      <MainLayout>
        <FrontPageContainer />
      </MainLayout>
    </AuthProvider>
  );
}
