import { Box, Flex, Text } from "@chakra-ui/react";
import { FormForgotPassword } from "~/components/forms/form-forgot-password";
import Struct from "~/components/pages/struct";

interface Props {}

export default function ForgotPassword({ ...props }: Props) {
  return (
    <Struct>
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
            <FormForgotPassword />
          </Box>
        </Box>
      </Flex>
    </Struct>
  );
}
