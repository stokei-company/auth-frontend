import { Flex, Heading, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ButtonOutlined } from "~/components/button";
import Struct from "~/components/pages/struct";
import { setToken } from "~/utils/auth";

interface Props {}

export default function Logout({ ...props }: Props) {
  const router = useRouter();

  useEffect(() => {
    setToken("");
  }, []);

  return (
    <Struct>
      <Flex
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        padding={10}
      >
        <Flex flexDir="column" alignItems="flex-start" marginBottom={3}>
          <Heading size="2xl" lineHeight="shorter">
            Já estou com saudades de você.
          </Heading>
        </Flex>

        <ButtonOutlined mt={6} onClick={() => router.replace("/")}>
          Fazer login
        </ButtonOutlined>
      </Flex>
    </Struct>
  );
}
