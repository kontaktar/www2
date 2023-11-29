"use client";
import {
  Box,
  Button,
  Form,
  FormField,
  Page,
  PageContent,
  Paragraph,
  TextInput,
} from "grommet";
import { StatusGood } from "grommet-icons";
import { useAuth } from "@/components/Auth/provider";
import useUser from "hooks/useUser";
import { useState } from "react";
import toast from "react-hot-toast";
import { useProfile } from "./ContextProvider";
export default function ProfileRegister() {
  const { user } = useAuth();
  const [value, setValue] = useState({});
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const { register } = useProfile();
  // const { setIsRegistered } = useUser();

  return (
    <Box width="medium">
      <Form
        value={value}
        validate="blur"
        onChange={(nextValue) => setValue(nextValue)}
        onReset={() => setValue({})}
        onSubmit={({ value }) => {
          register(value);
        }}
      >
        <FormField
          name="ssn"
          htmlFor="ssn"
          label="Kennitala"
          validate={[
            { regexp: /\d{10}/, message: "Ekki rétt kennitala!" },
            () => {
              return {
                message: (
                  <Box align="end">
                    <StatusGood />
                  </Box>
                ),
                status: "info",
              };
            },
          ]}
          validateOn="blur"
        >
          <TextInput id="ssn" name="ssn" type="ssn" placeholder="0101000009" />
        </FormField>
        <FormField
          name="userName"
          htmlFor="userName"
          label="Notendanafn"
          validate={[{ regexp: /.{2,}/, message: "Nafn of stutt" }]}
          validateOn="blur"
        >
          <TextInput id="userName" name="userName" type="name" />
        </FormField>
        <FormField
          name="firstName"
          htmlFor="firstName"
          label="Fornafn"
          validate={[{ regexp: /.{2,}/, message: "Nafn of stutt" }]}
          validateOn="blur"
        >
          <TextInput id="firstName" name="firstName" type="name" />
        </FormField>
        <FormField
          name="lastName"
          htmlFor="lastName"
          label="Eftirnafn"
          validate={[{ regexp: /.{2,}/, message: "Nafn of stutt" }]}
          validateOn="blur"
        >
          <TextInput id="lastName" name="lastName" type="name" />
        </FormField>
        <FormField name="address" htmlFor="address" label="Heimilisfang">
          <TextInput id="address" name="address" type="address" />
        </FormField>
        <FormField
          name="postCode"
          htmlFor="postCode"
          label="Póstnúmer"
          validate={[{ regexp: /\d{3}/, message: "Ógilt póstnúmer" }]}
          validateOn="blur"
        >
          <TextInput id="postCode" name="postCode" type="address" />
        </FormField>
        <FormField
          name="phonenumber"
          htmlFor="phonenumber"
          label="Símanúmer"
          validate={[{ regexp: /\d{7}/, message: "Ógilt póstnúmer" }]}
          validateOn="blur"
        >
          <TextInput
            id="phonenumber"
            name="phonenumber"
            type="phonenumber"
            placeholder="5550000"
          />
        </FormField>

        <Box direction="row" gap="medium">
          <Button type="submit" primary label="Submit" />
        </Box>
      </Form>
    </Box>
  );
}
