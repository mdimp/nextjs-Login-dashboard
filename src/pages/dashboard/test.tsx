import Layout from "@/components/Layout";
import { getSession } from "next-auth/react";

export default function Test() {
  return (
    <Layout>
      <h1>Test</h1>
    </Layout>
  );
}

export const getServerSideProps = async (context: any) => {
  const session: any = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
