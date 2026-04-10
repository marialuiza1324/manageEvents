const { execSync } = require("child_process");
const os = require("os");

const SDK_VERSION = "54"; // 🔒 Atualizado para SDK 54
const PROJECT_PREFIX = "aula";

function run(command) {
  execSync(command, { stdio: "inherit" });
}

function runSafe(command) {
  execSync(command, { stdio: "inherit", shell: true });
}

function getNodeMajorVersion() {
  const version = process.version;
  return parseInt(version.replace("v", "").split(".")[0]);
}

function validateNodeVersion() {
  const nodeVersion = getNodeMajorVersion();

  console.log("🔎 Detectando versão do Node...");
  console.log(`Node detectado: v${nodeVersion}`);

  if (nodeVersion < 18) {
    console.error("❌ Node muito antigo.");
    console.error("👉 Instale Node 18 ou 20 para continuar.");
    process.exit(1);
  }

  if (nodeVersion >= 22) {
    console.warn("⚠️ Node muito recente detectado.");
    console.warn("👉 Recomendado usar Node 20 para maior estabilidade em laboratório.");
  }
}

function fixWindowsExecutionPolicy() {
  if (os.platform() === "win32") {
    console.log("🛠 Ajustando ExecutionPolicy no Windows...");
    try {
      runSafe(
        'powershell -Command "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force"'
      );
    } catch (err) {
      console.warn("⚠️ Não foi possível ajustar automaticamente a ExecutionPolicy.");
    }
  }
}

try {
  console.log("==========================================");
  console.log("🏫 LAB REACT NATIVE - CONFIGURAÇÃO SEGURA");
  console.log("==========================================");
  console.log(`Sistema operacional: ${os.platform()}`);
  console.log("");

  validateNodeVersion();
  fixWindowsExecutionPolicy();

  const projectName = `${PROJECT_PREFIX}-${Date.now()}`;

  console.log("");
  console.log(`📦 Criando projeto Expo SDK ${SDK_VERSION}...`);
  console.log("");

  run(
    `npx create-expo-app@latest ${projectName} --template blank@sdk-${SDK_VERSION}`
  );

  process.chdir(projectName);

  console.log("");
  console.log("📦 Garantindo dependências principais do Expo...");
  console.log("");

  // Corrige erro expo-asset
  run("npx expo install expo expo-asset expo-file-system expo-constants");

  console.log("");
  console.log("📦 Instalando dependências de navegação...");
  console.log("");

  run("npx expo install @react-navigation/native");
  run("npx expo install @react-navigation/drawer");
  run(
    "npx expo install react-native-gesture-handler react-native-reanimated react-native-worklets"
  );
  run("npx expo install react-native-screens react-native-safe-area-context");
  run("npx expo install @react-native-masked-view/masked-view");

  console.log("");
  console.log("📦 Ajustando Babel para SDK 54...");
  console.log("");

  run("npm install --save-dev babel-preset-expo@~54.0.10");

  console.log("");
  console.log("🧹 Limpando cache preventivamente...");
  console.log("");

  run("npx expo start --clear");

  console.log("");
  console.log("==========================================");
  console.log("✅ PROJETO CRIADO COM SUCESSO");
  console.log("==========================================");
  console.log(`📁 Pasta: ${projectName}`);
  console.log("");
  console.log("▶️ Para iniciar novamente depois:");
  console.log(`cd ${projectName}`);
  console.log("npx expo start");
  console.log("");
  console.log("📱 Abra o Expo Go e escaneie o QR Code.");
  console.log("==========================================");

} catch (err) {
  console.error("");
  console.error("❌ ERRO DURANTE A INSTALAÇÃO:");
  console.error(err.message);
  process.exit(1);
}