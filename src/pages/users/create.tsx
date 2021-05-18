import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = Yup.object().shape({
  name: Yup.string().required("Nome obrigatório"),
  email: Yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: Yup.string()
    .required("Senha obrigatória")
    .min(6, "No mínimo 6 caracteres"),
  password_confirmation: Yup.string().oneOf([null, Yup.ref("password")]),
});

export default function CreateUser() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = (
    values,
    event
  ) => {
    console.log(values);
  };

  return (
    <Box>
      <Header></Header>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="normal">
            Criar Usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                label="Nome completo"
                error={errors.name}
                {...register("name")}
              ></Input>
              <Input
                name="email"
                type="email"
                error={errors.email}
                label="E-mail"
                {...register("email")}
              ></Input>
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="password"
                type="password"
                error={errors.password}
                label="Senha"
                {...register("password")}
              ></Input>
              <Input
                name="password_confirmation"
                type="password"
                error={errors.password_confirmation}
                label="Confirmação da senha"
                {...register("password_confirmation")}
              ></Input>
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha" as="a">
                  Cancelar
                </Button>
              </Link>
              <Button
                isLoading={formState.isSubmitting}
                type="submit"
                colorScheme="pink"
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
