
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert
} from "react-native";

import { useForm, Controller } from "react-hook-form";

import { COLORS, SPACING, FONT_SIZE } from "../../../shared/constants/theme";
import Input from "../../../shared/components/common/Input";
import Button from "../../../shared/components/common/Button";

import kinalSportsLogo from "../../../../assets/kinal_sports.png";

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    Alert.alert("Login", "Formulario enviado correctamente");
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

          <Text style={styles.subtitle}>Bienvenido de nuevo</Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="emailOrUsername"
            rules={{required: "El correo o usuario es obligatorio",}}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Email o usuario"
                placeholder="correo@ejemplo.com o usario"
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                error={errors.emailOrUsername?.message}
              />
            )}
            name="emailOrUsername"
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: "La contraseña es obligatoria",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Contraseña"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
              />
            )}
          />

          <Button
            title="Iniciar Sesión"
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ¿No tienes una cuenta?{" "}
          </Text>

          <Text style={styles.link}>Regístrate</Text>
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

export default LoginScreen;