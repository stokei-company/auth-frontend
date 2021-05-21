import { Flex, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BoxResponse } from "~/components/pages/callback/box-response";
import { Header } from "~/components/pages/callback/header";
import Struct from "~/components/pages/struct";
import { PAINEL_URL } from "~/environments";
import { setToken } from "~/utils/auth";
import { colors } from "~/utils/constants";

interface Props {}

export default function Callback({ ...props }: Props) {
  const [init, setInit] = useState(true);
  const router = useRouter();
  const { token, redirectUri } = router.query || {};
  const success = token ? true : false;

  useEffect(() => {
    if (init) {
      setInit((i) => false);
      return null;
    }

    if (token) {
      setToken(String(token));
    }

    if (String(redirectUri)) {
      window.location.href = redirectUri + "";
    }
    window.location.href = PAINEL_URL;
  }, [token, redirectUri]);

  return (
    <Struct redirectUri={redirectUri + ""}>
      <Flex
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        padding={10}
      >
        <Header
          title={success ? "Sucesso" : "Ooops!"}
          color={success ? "green.400" : "red.500"}
        />

        <BoxResponse success={success} />

        {redirectUri && (
          <Link
            mt={6}
            fontWeight="bold"
            color={colors.primary.light}
            _hover={{ color: colors.primary.light }}
            href={redirectUri + ""}
          >
            Voltar
          </Link>
        )}
      </Flex>
    </Struct>
  );
}
