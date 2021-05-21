import { Link as DefaultLink, LinkProps } from "@chakra-ui/react";
import { colors } from "~/utils/constants";

interface Props extends LinkProps {}

export const Link: React.FC<Props> = ({ children, ...props }) => {
  return (
    <DefaultLink
      fontSize="lg"
      borderBottomWidth="2px"
      borderBottomColor="transparent"
      _hover={{ color: colors.primary.dark, borderColor: colors.primary.dark }}
      {...props}
    >
      {children}
    </DefaultLink>
  );
};

export default Link;
