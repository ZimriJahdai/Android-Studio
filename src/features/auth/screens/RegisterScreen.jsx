import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { COLORS, SPACING, FONT_SIZE } from "../../../shared/constants/theme";
import Input from "../../../shared/components/common/Input";
import Button from "../../../shared/components/common/Button";
import { useAuth } from "../hooks/useAuth.js";

import kinalSportsLogo from "../../../../assets/kinal_sports.png";

const RegisterScreen = ({navigation}) => {
  const { handleRegister, loading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

const onSubmit = async (data) => {
  try {
    await handleRegister(data);

    Alert.alert(
      "Registro Exitoso",
      "Tu cuenta ha sido creada. Ahora puedes iniciar sesión.",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"),
        },
      ]
    );
  } catch (error) {
    console.error(error);

    const message =
      error.response?.data?.message || "Error al registrarse";

    Alert.alert("Error", message);
  }
};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image
            source={kinalSportsLogo}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.subtitle}>Crea tu nueva cuenta</Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="firstName"
            rules={{ required: "El nombre es obligatorio" }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Nombres"
                placeholder="Juan"
                onChangeText={onChange}
                value={value}
                error={errors.firstName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            rules={{ required: "El apellido es obligatorio" }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Apellidos"
                placeholder="Pérez"
                onChangeText={onChange}
                value={value}
                error={errors.lastName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="username"
            rules={{ required: "El usuario es obligatorio" }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Usuario"
                placeholder="usuario123"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                error={errors.username?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{ required: "El correo es obligatorio" }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Correo"
                placeholder="correo@ejemplo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: "La contraseña es obligatoria" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            rules={{ required: "Confirma tu contraseña" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Confirmar contraseña"
                placeholder="Repite tu contraseña"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.confirmPassword?.message}
              />
            )}
          />

          <Button
            title="Crear cuenta"
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    flexGrow: 1,
    padding: SPACING.xl,
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: SPACING.xxl,
  },

  logo: {
    width: 200,
    height: 80,
    marginBottom: SPACING.sm,
  },

  subtitle: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.secondary,
    marginTop: SPACING.sm,
    textAlign: "center",
  },

  form: {
    width: "100%",
  },

  button: {
    marginTop: SPACING.lg,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SPACING.xl,
  },

  footerText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textLight,
  },

  link: {
    fontSize: FONT_SIZE.md,
    color: COLORS.primary,
    fontWeight: "700",
  },
});

export default RegisterScreen;
