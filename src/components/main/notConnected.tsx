import useNOSTR from "~/hooks/useNOSTR";
import Button from "../button";

export const NotConnected = () => {
  const { login, nostr, isLoading } = useNOSTR();

  return (
    <div className="flex justify-evenly lg:w-4/5">
      {isLoading ? (
        "is loading..."
      ) : !nostr ? (
        <div className="m-4 text-center">
          {/* <h4 className="text-lg mb-8">¿Es la primera vez por acá?</h4> */}
          <Button onClick={() => window.open("https://getalby.com/", "_blank")}>
            Descarga una wallet
          </Button>
        </div>
      ) : (
        <div className="m-4 text-center">
          {/* <h4 className="text-lg mb-8">Si tienes un usuario y una wallet instalada</h4> */}
          <Button
            onClick={() => {
              void login();
            }}
          >
            Conectar a Nostr
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotConnected;
