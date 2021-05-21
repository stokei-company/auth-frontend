import { Box, Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { FormSignUp } from "~/components/forms/form-signup";
import Struct from "~/components/pages/struct";
import { axiosClient } from "~/config/axios";
import { AppModel } from "~/shared/@types/app";

export default function SignUp({ app, redirectUri, ...props }) {
  return (
    <Struct redirectUri={redirectUri} appId={app && app.id}>
      <Flex
        justifyContent="center"
        paddingTop={["100px", "100px", "120px", "120px"]}
        paddingBottom={"50px"}
      >
        <Box
          width="100%"
          maxWidth={["100%", "100%", "500px", "500px"]}
          padding={5}
        >
          <Box
            width="100%"
            backgroundColor="gray.50"
            borderRadius="md"
            padding={16}
          >
            <FormSignUp app={app} redirectUri={redirectUri} />
          </Box>
        </Box>
      </Flex>
    </Struct>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const appId = context.query && context.query.appId;
  const redirectUri =
    context.query && context.query.redirectUri
      ? context.query.redirectUri
      : null;

  let app: AppModel = null;
  if (appId) {
    try {
      const res = await axiosClient.get("apps/" + context.query.appId);
      const data = res.data;
      if (data) {
        app = data;
      }
    } catch (error) {}
  }

  return {
    props: {
      app,
      redirectUri,
    },
  };
};
