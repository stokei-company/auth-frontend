import { Box } from '@chakra-ui/react';
import { FormLogin } from '~/components/forms/form-login';
import { RootLayout } from '~/components/layouts/root';

export default function Home({ ...props }) {
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
          <FormLogin />
        </Box>
      </Box>
    </RootLayout>
  );
}
