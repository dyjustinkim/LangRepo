import { useAuth0 } from "@auth0/auth0-react";

const GetTokenButton = () => {
  const { getAccessTokenSilently } = useAuth0();

  const handleClick = async () => {
    const token = await getAccessTokenSilently();
  };

  return <button onClick={handleClick}>Get Access Token</button>;
};

export default GetTokenButton;