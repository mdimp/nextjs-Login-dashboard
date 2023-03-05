import { Box, Typography } from "@mui/material";
import { getSession } from "next-auth/react";
import axios from "axios";

export default function Dashboard({ username, levels }: any) {
  return (
    <Box
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome {username}
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Your Levels: {levels?.data[0].attributes?.level}
      </Typography>
    </Box>
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
