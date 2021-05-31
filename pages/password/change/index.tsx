import { Box, Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";
import { FormChangePassword } from "~/components/forms/form-change-password";
import Struct from "~/components/pages/struct";

interface Props {
  readonly code: string;
}

export default function ChangePassword({ code, ...props }: Props) {
  return (
    <Struct>
      <Flex
        justifyContent="center"
        paddingY={30}
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
            <FormChangePassword code={code} />
          </Box>
        </Box>
      </Flex>
    </Struct>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const code = context.query && context.query.code;

  if (!code) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      code,
    },
  };
};
