import { Box, Flex, Image, Spacer, Stack } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { Button, ButtonOutlined } from "~/components/button";
import { logoUrl } from "~/utils/constants";
import { Link } from "./link";

interface Props {
  readonly redirectUri?: string;
  readonly appId?: string;
}

export const Header: React.FC<Props> = ({ redirectUri, appId }) => {
  const router = useRouter();

  const loginUri = useMemo(() => {
    let url = "/";
    if (!redirectUri && !appId) {
      return url;
    }
    const items = [];
    if (appId) {
      items.push(`appId=${appId}`);
    }
    if (redirectUri) {
      items.push(`redirectUri=${redirectUri}`);
    }
    return url + "?" + items.join("&");
  }, [redirectUri, appId]);

  const signupUri = useMemo(() => {
    let url = "/signup";
    if (!redirectUri && !appId) {
      return url;
    }
    const items = [];
    if (appId) {
      items.push(`appId=${appId}`);
    }
    if (redirectUri) {
      items.push(`redirectUri=${redirectUri}`);
    }
    return url + "?" + items.join("&");
  }, [redirectUri, appId]);

  return (
    <Flex
      width="100%"
      alignItems="center"
      paddingY={5}
      paddingX={10}
    >
      <Box margin={["auto", "auto", "0px", "0px"]}>
        <NextLink href="/">
          <Image height={10} src={logoUrl} cursor="pointer" />
        </NextLink>
      </Box>
{/* 
      <Spacer display={["none", "none", "flex", "flex"]} />

      <Stack
        display={["none", "none", "flex", "flex"]}
        direction="row"
        spacing="12"
        align="center"
      >
        <Link>Inicio</Link>
        <Link>Sobre</Link>
        <Link>Preços</Link>
      </Stack>
 */}
      <Spacer display={["none", "none", "flex", "flex"]} />

      <Stack
        display={["none", "none", "flex", "flex"]}
        direction="row"
        spacing={6}
        align="center"
      >
        <ButtonOutlined onClick={() => router.replace(loginUri)}>
          Entrar
        </ButtonOutlined>
        <Button onClick={() => router.replace(signupUri)}>Cadastre-se</Button>
      </Stack>
    </Flex>
  );
};

export default Header;
