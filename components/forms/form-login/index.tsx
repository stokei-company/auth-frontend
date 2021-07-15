import { Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import NextLink from "next/link";
import React from "react";
import * as Yup from "yup";
import { Button, FacebookButton, GoogleButton } from "~/components/button";
import { Input } from "~/components/input";
import { axiosClient } from "~/config/axios";
import { AppModel } from "~/shared/@types/app";
import { setToken } from "~/utils/auth";
import { colors, facebookAuthURI, googleAuthURI } from "~/utils/constants";
import { AppBox } from "../app-box";
import { SocialAuthBox } from "../social-auth-box";

interface Props {
  readonly app: AppModel;
  readonly redirectUri: string;
}

export const FormLogin: React.FC<Props> = ({ app, redirectUri, ...props }) => {
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
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axiosClient.post("/default/login", {
          account: {
            email: values.email,
            password: values.password,
          },
          redirectUri,
        });

        const data = response.data;
        if (data && data.accessToken) {
          setToken(data.accessToken);

          window.location.href = data.redirectUri;
          setSubmitting(false);
          return;
        }
      } catch (error) {}

      setErrors({
        email: "E-mail ou senha inválidos!",
        password: "E-mail ou senha inválidos!",
      });

      setSubmitting(false);
    },
  });

  return (
    <Flex gridArea="form" flex={1} height="auto" flexDir="column">
      {!app && (
        <Heading
          size="lg"
          textAlign="center"
          lineHeight="shorter"
          marginBottom="6"
        >
          Login
        </Heading>
      )}
      {app && (
        <Flex
          width="full"
          marginBottom={5}
          alignItems="center"
          justifyContent="center"
        >
          <AppBox app={app} />
        </Flex>
      )}

      <SocialAuthBox redirectUri={redirectUri} appId={app?.id} />

      <Flex alignItems="center" justifyContent="center" marginBottom={8}>
        <Text color="gray.600" fontSize="sm" textTransform="uppercase">
          Entre com o email
        </Text>
      </Flex>

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
            label="E-mail"
            placeholder="E-mail"
            borderColor={formik.errors.email && "red.400"}
            errorMessage={formik.touched.email && formik.errors.email}
            {...formik.getFieldProps("email")}
          />

          <Input
            id="password"
            type="password"
            name="password"
            label="Senha"
            placeholder="Senha"
            borderColor={formik.errors.password && "red.400"}
            errorMessage={formik.touched.password && formik.errors.password}
            {...formik.getFieldProps("password")}
          />

          <NextLink href="/password/forgot">
            <Link
              alignSelf="flex-start"
              marginTop={2}
              fontSize="sm"
              color={colors.primary.main}
              fontWeight="bold"
              _hover={{ color: colors.primary.light }}
            >
              Esqueci minha senha
            </Link>
          </NextLink>

          <Button
            type="submit"
            isLoading={formik.isSubmitting}
            loadingText="Salvando"
            spinnerPlacement="end"
            disabled={formik.isSubmitting || !formik.isValid}
            marginTop={6}
          >
            Entrar
          </Button>

          <Text textAlign="center" fontSize="sm" marginTop={6}>
            Não tem uma conta?{" "}
            <NextLink
              href={{
                pathname: "/signup",
                query: { redirectUri, appId: app && app.id },
              }}
            >
              <Link
                color={colors.primary.main}
                fontWeight="bold"
                _hover={{ color: colors.primary.light }}
              >
                Registre-se
              </Link>
            </NextLink>
          </Text>
        </form>
      </Flex>
    </Flex>
  );
};
