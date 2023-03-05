import { getSession } from "next-auth/react";
import axios from "axios";
import Layout from "@/components/Layout";

export default function Dashboard({ username, levels }: any) {
  console.log(levels);
  return (
    <Layout>
      <h2>Welcome {username}!</h2>
      <h3>Levels: {levels.data[0].attributes.level}</h3>
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
  const { data, status } = await axios.get("http://localhost:1337/api/levels", {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  return {
    props: { username: session?.user?.name, levels: data },
  };
};
