import React from "react";
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";
import { colors } from "../utils/constants";

export const Button: React.FC<ChakraButtonProps> = (props) => {
  return (
    <ChakraButton
      color={props.color || "white"}
      backgroundColor={props.backgroundColor || colors.primary.dark}
      height="50px"
      minHeight="50px"
      borderRadius="sm"
      _hover={{
        ...props._hover,
        backgroundColor: props._hover?.backgroundColor || colors.primary.light,
      }}
      {...props}
    />
  );
};

export default Button;
