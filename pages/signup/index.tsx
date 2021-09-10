import { Box } from '@chakra-ui/react';
import { FormSignUp } from '~/components/forms/form-signup';
import { RootLayout } from '~/components/layouts/root';

export default function SignUp({ ...props }) {
  return (
    <RootLayout>
      <Box
        width="full"
        height="full"
        maxWidth={['full', 'full', '500px', '500px']}
        paddingY={8}
      >
        <Box
          width="100%"
          backgroundColor="gray.50"
          padding={8}
          borderRadius="sm"
          overflowY="auto"
        >
          <FormSignUp />
        </Box>
      </Box>
    </RootLayout>
  );
}
