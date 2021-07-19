import { Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import NextLink from "next/link";
import { useState } from "react";
import * as Yup from "yup";
import { Button } from "~/components/button";
import { UserIcon } from "~/components/icons";
import { Input, InputEmail, InputPassword } from "~/components/input";
import { axiosClient } from "~/config/axios";
import { AppModel } from "~/shared/@types/app";
import { setToken } from "~/utils/auth";
import { colors } from "~/utils/constants";
import { AppBox } from "../app-box";
import { SocialAuthBox } from "../social-auth-box";

interface Props {
  readonly app: AppModel;
  readonly redirectUri: string;
}

export const FormSignUp: React.FC<Props> = ({ app, redirectUri, ...props }) => {
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: { firstname: "", lastname: "", email: "", password: "" },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Obrigatório"),
      password: Yup.string()
        .min(6, "A senha deve conter no mínimo 6 caracteres!")
        .required("Obrigatório"),
      email: Yup.string()
        .email("Endereço de email inválido!")
        .required("Obrigatório"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setError((data) => "");
      try {
        const response = await axiosClient.post("/default/signup", {
          account: {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: values.password,
          },
          redirectUri,
        });

        const data = response.data;

        const errors: string[] = data.errors;
        if (errors && errors.length) {
          const error = errors.reduce((prev, curr) => {
            const currError = (curr + "").toLowerCase();
            if (currError.match(/already exists/g)) {
              return { ...prev, email: "Email já existe!" };
            }
            if (currError.match(/firstname/g)) {
              return { ...prev, firstname: "Nome não informado!" };
            }
            if (currError.match(/lastname/g)) {
              return { ...prev, lastname: "Sobrenome não informado!" };
            }
            if (currError.match(/email/g)) {
              return { ...prev, email: "Email não informado!" };
            }
            if (currError.match(/password/g)) {
              return { ...prev, password: "Passoword não informado!" };
            }
            return { ...prev };
          }, {});
          setErrors(error);

          setSubmitting(false);
          return;
        }

        if (data && data.accessToken) {
          setToken(data.accessToken);

          window.location.href = data.redirectUri;
        } else {
          setError((data) => "Ooops, desculpe, não consegui cadastrar você!");
        }
      } catch (error) {
        setError((data) => "Ooops, desculpe, não consegui cadastrar você!");
      }

      setSubmitting(false);
    },
  });

  return (
    <Flex gridArea="form" flex={1} height="auto" flexDir="column">
      <Heading
        size="lg"
        textAlign="center"
        lineHeight="shorter"
        marginBottom="6"
      >
        Cadastre-se
      </Heading>

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
          Cadastre-se com o email
        </Text>
      </Flex>

      <Flex height="auto" flexDir="column">
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Input
            id="firstname"
            name="firstname"
            label="Nome"
            placeholder="Nome"
            rightElement={
              <Icon as={UserIcon} color="blackAlpha.700" size="18" />
            }
            borderColor={formik.errors.firstname && "red.400"}
            errorMessage={formik.touched.firstname && formik.errors.firstname}
            {...formik.getFieldProps("firstname")}
          />

          <Input
            id="lastname"
            name="lastname"
            label="Sobrenome"
            placeholder="Sobrenome"
            rightElement={
              <Icon as={UserIcon} color="blackAlpha.700" size="18" />
            }
            borderColor={formik.errors.lastname && "red.400"}
            errorMessage={formik.touched.lastname && formik.errors.lastname}
            {...formik.getFieldProps("lastname")}
          />

          <InputEmail
            id="email"
            name="email"
            label="E-mail"
            placeholder="E-mail"
            borderColor={formik.errors.email && "red.400"}
            errorMessage={formik.touched.email && formik.errors.email}
            {...formik.getFieldProps("email")}
          />

          <InputPassword
            id="password"
            name="password"
            label="Senha"
            placeholder="Senha"
            borderColor={formik.errors.password && "red.400"}
            errorMessage={formik.touched.password && formik.errors.password}
            {...formik.getFieldProps("password")}
          />

          <Flex>
            <Text color="gray.500" fontSize="xs">
              Ao se cadastrar, você concorda com os{" "}
              <NextLink href="/terms">
                <Link color={colors.primary.main}>termos de uso</Link>
              </NextLink>
              .
            </Text>
          </Flex>

          {error && <Text color="red.500">{error}</Text>}

          <Button
            type="submit"
            isLoading={formik.isSubmitting}
            loadingText="Cadastrando"
            spinnerPlacement="end"
            disabled={formik.isSubmitting || !formik.isValid}
            marginTop={6}
          >
            Cadastrar
          </Button>

          <Text textAlign="center" fontSize="sm" marginTop={6}>
            Já possui uma conta?{" "}
            <NextLink
              href={{
                pathname: "/",
                query: { redirectUri, appId: app && app.id },
              }}
            >
              <Link
                color={colors.primary.main}
                fontWeight="bold"
                _hover={{ color: colors.primary.light }}
              >
                Faça login
              </Link>
            </NextLink>
          </Text>
        </form>
      </Flex>
    </Flex>
  );
};
