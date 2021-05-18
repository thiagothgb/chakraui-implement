import { Flex, Button, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../components/Form/Input";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = Yup.object().shape({
  email: Yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: Yup.string().required("Senha obrigatória"),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = (values, event) => {
    console.log(values);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        p="8"
        w="100%"
        as="form"
        bg="gray.800"
        maxWidth={360}
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            name="email"
            label="E-mail"
            type="email"
            error={errors.email}
            {...register("email")}
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            error={errors.password}
            {...register("password")}
          />
        </Stack>
        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
