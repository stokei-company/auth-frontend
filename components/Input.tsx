import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import React from "react";

interface Props extends ChakraInputProps {
  readonly label?: string;
  readonly helperMessage?: string;
  readonly errorMessage?: string;
}

export const Input: React.FC<Props> = ({
  label,
  helperMessage,
  errorMessage,
  ...props
}) => {
  return (
    <FormControl id={props.id}>
      {label && <FormLabel>{label}</FormLabel>}

      <ChakraInput
        height="50px"
        minHeight="50px"
        backgroundColor="white"
        _hover={{
          borderColor: "green.600",
        }}
        focusBorderColor="green.600"
        borderRadius="sm"
        {...props}
      />

      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}

      {helperMessage && <FormHelperText>{helperMessage}</FormHelperText>}
    </FormControl>
  );
};

export default Input;
