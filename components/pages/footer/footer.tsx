import { Flex, Text } from "@chakra-ui/react";
import { SITE_NAME } from "~/utils/constants";

interface Props {}

export const Footer: React.FC<Props> = (props) => {
  return (
    <Flex
      as="footer"
      width="100%"
      justifyContent="center"
      alignItems="center"
      paddingY={5}
      paddingX={10}
    >
      <Text fontSize="xs">Copyright © {SITE_NAME} - Todos os direitos reservados</Text>
    </Flex>
  );
};
