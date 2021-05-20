import { Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../components/Button";
import Divider from "../components/Divider";
import { Input } from "../components/Input";
import { axiosClient } from "../config/axios";
import {
  colors,
  facebookAuthURI,
  googleAuthURI,
  logoUrl,
  SITE_NAME
} from "../utils/constants";

export default function Home({ app, ...props }) {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "A senha deve conter no mínimo 6 caracteres!")
        .required("Obrigatório"),
      email: Yup.string()
        .email("Endereço de email inválido!")
        .required("Obrigatório"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const response = await axiosClient.post("/default/login", {
        account: {
          email: values.email,
          password: values.password,
        },
      });
      console.log(response.data);

      setSubmitting(false);
    },
  });
  return (
    <Flex
      as="main"
      height="auto"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      width={["100%", "100%", "90%", "90%"]}
      direction={["column", "column", "row", "row"]}
      padding={10}
      margin="auto"
    >
      <Flex
        height="auto"
        gridArea="logo"
        flexDir="column"
        alignItems="flex-start"
        paddingRight={{ base: 0, md: 5, lg: 6 }}
        flex={2}
      >
        <Image src={logoUrl} alt={SITE_NAME} />

        <Heading size="2xl" lineHeight="shorter" marginTop={[8, 8, 16, 16]}>
          Faça seu login na plataforma
        </Heading>
      </Flex>

      <Flex
        gridArea="form"
        height="auto"
        backgroundColor="gray.50"
        borderRadius="md"
        flexDir="column"
        padding={16}
        flex={1}
      >
        {app && (
          <Flex>
            <Text>ALGUEM</Text>
          </Flex>
        )}
        <Flex height="auto" flexDir="column" justifyContent="stretch">
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Input
              id="email"
              name="email"
              placeholder="E-mail"
              borderColor={formik.errors.email && "red.400"}
              errorMessage={formik.touched.email && formik.errors.email}
              {...formik.getFieldProps("email")}
            />

            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Senha"
              marginTop={2}
              borderColor={formik.errors.password && "red.400"}
              errorMessage={formik.touched.password && formik.errors.password}
              {...formik.getFieldProps("password")}
            />

            <Link
              alignSelf="flex-start"
              marginTop={2}
              fontSize="sm"
              color={colors.primary.dark}
              fontWeight="bold"
              _hover={{ color: colors.primary.light }}
            >
              Esqueci minha senha
            </Link>

            <Button type="submit" disabled={formik.isSubmitting} marginTop={6}>
              Entrar
            </Button>

            <Text textAlign="center" fontSize="sm" marginTop={6}>
              Não tem uma conta?{" "}
              <Link
                color={colors.primary.dark}
                fontWeight="bold"
                _hover={{ color: colors.primary.light }}
              >
                Registre-se
              </Link>
            </Text>
          </form>
          <Divider />

          <Flex alignItems="center" justifyContent="center">
            <Text fontSize="sm">Ou entre com</Text>
          </Flex>

          <Flex alignItems="center" marginTop={6}>
            <Button
              flex="1"
              backgroundColor="gray.600"
              marginRight={5}
              _hover={{ backgroundColor: "gray.500" }}
              onClick={async () => {
                window.location.href = await googleAuthURI({});
              }}
            >
              Google
            </Button>
            <Button
              flex="1"
              backgroundColor="gray.600"
              marginLeft={5}
              _hover={{ backgroundColor: "gray.500" }}
              onClick={async () => {
                window.location.href = await facebookAuthURI({});
              }}
            >
              Facebook
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
