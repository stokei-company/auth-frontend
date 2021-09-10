import { Stack } from '@chakra-ui/react';
import { FacebookButton, GoogleButton } from '~/components/ui/button';
import { facebookAuthURI, googleAuthURI } from '~/utils/constants';

interface Props {
  readonly appId?: string;
  readonly redirectUri?: string;
}

export const SocialAuthBox: React.FC<Props> = ({
  redirectUri,
  appId,
  ...props
}) => {
  return (
    <Stack
      direction={['column', 'column', 'row', 'row']}
      align={['stretch', 'stretch', 'center', 'center']}
      spacing={3}
      marginBottom={[6, 6, 10, 10]}
    >
      <GoogleButton
        flex="1"
        onClick={async () => {
          const href = await googleAuthURI({
            redirectUri,
            appId
          });
          window.location.href = href;
        }}
      >
        Google
      </GoogleButton>
      <FacebookButton
        flex="1"
        onClick={async () => {
          const href = await facebookAuthURI({
            redirectUri,
            appId
          });
          window.location.href = href;
        }}
      >
        Facebook
      </FacebookButton>
    </Stack>
  );
};
