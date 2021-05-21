import { Box } from "@chakra-ui/react";
import { Footer } from "../footer/footer";
import Header from "../header";

interface Props {
  readonly redirectUri?: string;
  readonly appId?: string;
}

export const Struct: React.FC<Props> = ({ redirectUri, appId, children }) => {
  return (
    <Box>
      <Header redirectUri={redirectUri} appId={appId} />
      <Box width="100%" height="auto" minHeight="100%" as="main">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Struct;
