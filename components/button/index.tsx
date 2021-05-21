import React from "react";
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  Image,
} from "@chakra-ui/react";

import { FaFacebook, FaGoogle } from "react-icons/fa";
import { colors } from "~/utils/constants";

export const Button: React.FC<ChakraButtonProps> = (props) => {
  return (
    <ChakraButton
      color={props.color || "white"}
      backgroundColor={props.backgroundColor || colors.primary.dark}
      height="50px"
      minHeight="50px"
      borderRadius="full"
      paddingX="24px"
      _hover={{
        ...props._hover,
        backgroundColor: props._hover?.backgroundColor || colors.primary.light,
      }}
      {...props}
    />
  );
};

export const ButtonClean: React.FC<ChakraButtonProps> = (props) => {
  return (
    <ChakraButton
      color={props.color || colors.primary.dark}
      height="50px"
      minHeight="50px"
      borderRadius="full"
      paddingX="24px"
      variant="ghost"
      {...props}
    />
  );
};

export const ButtonOutlined: React.FC<ChakraButtonProps> = (props) => {
  return (
    <ChakraButton
      color={props.color || colors.primary.dark}
      borderColor={props.borderColor || colors.primary.dark}
      height="50px"
      minHeight="50px"
      borderRadius="full"
      paddingX="24px"
      variant="outline"
      {...props}
    />
  );
};

export const FacebookButton: React.FC<ChakraButtonProps> = (props) => {
  return (
    <ChakraButton
      backgroundColor="#e9effb"
      color="black.200"
      leftIcon={<FaFacebook color="#385898" size="18px" />}
      height="50px"
      minHeight="50px"
      borderRadius="full"
      paddingX="24px"
      _active={{
        ...props._active,
        backgroundColor: "gray.300",
      }}
      _focus={{
        ...props._focus,
        backgroundColor: "gray.300",
      }}
      _hover={{
        ...props._hover,
        backgroundColor: "gray.300",
      }}
      {...props}
    />
  );
};

export const GoogleButton: React.FC<ChakraButtonProps> = (props) => {
  return (
    <ChakraButton
      backgroundColor="#e9effb"
      color="black.200"
      leftIcon={<Image src="/google_logo.png" boxSize="15px" />}
      height="50px"
      minHeight="50px"
      borderRadius="full"
      paddingX="24px"
      _active={{
        ...props._active,
        backgroundColor: "gray.300",
      }}
      _focus={{
        ...props._focus,
        backgroundColor: "gray.300",
      }}
      _hover={{
        ...props._hover,
        backgroundColor: "gray.300",
      }}
      {...props}
    />
  );
};
