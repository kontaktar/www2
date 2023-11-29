import Image from "next/image";
import Link from "next/link";
import FrontPageContainer from "layouts/FrontPageContainer/FrontPageContainer";
import MainLayout from "layouts/MainLayout/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <FrontPageContainer />
    </MainLayout>
  );
}
