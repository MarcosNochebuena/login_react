import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { ResponseType } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);

  const [request, response, promptAsyncG] = Google.useAuthRequest({
    expoClientId:
      "53435770662-m0pqfnroont2qoc9gl9kps0gn2s0hkh4.apps.googleusercontent.com",
    iosClientId:
      "53435770662-mev9spg1cmh984tknh4sct760p7qllfg.apps.googleusercontent.com",
    androidClientId:
      "53435770662-ck2g1do5ap3ea0ee9h9pg0aic9efq79c.apps.googleusercontent.com",
    webClientId:
      "53435770662-318g6aldajlsk3cccq2ici0gr0rs65jp.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken]);

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const useInfo = await response.json();
    setUser(useInfo);
  }

  const [requestfb, responsefb, promptAsyncFb] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId: "466679998751952",
  });
  React.useEffect(() => {
    if (responsefb?.type === "success") {
      const { code } = response.params;
    }
  }, [response]);

  function Logins() {
    return (
      <>
        <TouchableOpacity
          style={styles.buttonGoogle}
          disabled={!request}
          onPress={() => {
            promptAsyncG();
          }}
        >
          <Text style={styles.textButtonG}>Iniciar Sesión con Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonFacebook}
          disabled={!requestfb}
          onPress={() => {
            promptAsyncFb();
          }}
        >
          <Text style={styles.textButtonF}>Iniciar Sesión con Facebook</Text>
        </TouchableOpacity>
      </>
    );
  }
  function ShowUserInfo() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 35, fontWeight: "bold", marginBottom: 20 }}>
          Bienvenido
        </Text>
        <Image
          source={{ uri: user.picture }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        ></Image>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{user.name}</Text>
        <Text>{user.email}</Text>
        <Button
          title="Salir"
          onPress={() => {
            setUser(null);
          }}
        />
      </View>
    );
  }
  if (user) {
    return <ShowUserInfo />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Iniciar Sesión</Text>
        <Image
          source={{
            uri: "https://gogeticon.net/files/2979636/219c4f4538ad0184f002e34887ad73e6.png",
          }}
          style={styles.image}
        />
        <TextInput style={styles.input} placeholder="User" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          textContentType="password"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <Logins />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightskyblue",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#fff",
    resizeMode: "contain",
    margin: 30,
  },
  text: {
    backgroundColor: "dodgerblue",
    marginTop: 50,
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    height: 100,
    width: 400,
    borderRadius: 25,
    paddingTop: 25,
    textAlign: "center",
  },
  textButtonG: {
    position: "relative",
    textAlign: "center",
    left: 40,
    fontSize: 18,
    fontWeight: "500",
  },
  textButtonF: {
    position: "relative",
    textAlign: "center",
    left: 40,
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  icon: {
    position: "relative",
    left: 10,
    padding: 5,
    fontSize: 25,
  },
  iconF: {
    position: "relative",
    left: 10,
    padding: 5,
    fontSize: 25,
    color: "white",
  },
  input: {
    height: 40,
    width: 350,
    margin: 12,
    fontSize: 14,
    fontWeight: "bold",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    paddingLeft: 25,
  },
  button: {
    alignItems: "center",
    backgroundColor: "aliceblue",
    padding: 10,
    borderRadius: 20,
    width: "40%",
    height: "6%",
    margin: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonGoogle: {
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: "azure",
    padding: 10,
    borderRadius: 20,
    width: "90%",
    height: 55,
    margin: 10,
  },
  buttonFacebook: {
    flexDirection: "row",
    backgroundColor: "#275fab",
    padding: 10,
    borderRadius: 20,
    width: "90%",
    height: 55,
    margin: 10,
  },
});
