import { Flex, Icon, SimpleGrid } from "@chakra-ui/react";
import { FaUser, FaUserTie } from "react-icons/fa";
import { Header } from "~/components/pages/redirect/header";
import { Option } from "~/components/pages/redirect/option";
import { Struct } from "~/components/pages/struct";
import { PAINEL_ADMIN_URL, PAINEL_URL } from "~/environments";

interface Props {}

export default function Home({ ...props }: Props) {
  return (
    <Struct>
      <Flex
        minHeight="70vh"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        padding={10}
      >
        <Header title="O que você é?" />

        <SimpleGrid columns={2} spacing={[5, 5, 10, 10]} padding={[2, 2, 5, 5]}>
          <Option
            title="Aluno(a)"
            icon={<Icon as={FaUser} />}
            link={PAINEL_URL}
          />
          <Option
            title="Parceiro(a)"
            icon={<Icon as={FaUserTie} />}
            link={PAINEL_ADMIN_URL}
          />
        </SimpleGrid>
      </Flex>
    </Struct>
  );
}
