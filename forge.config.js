const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-deb',
      config: {
        icon: "./assets/file.svg"
      },
    },
    {
      name: "@reforged/maker-appimage",
      config: {
        options: {
          categories: ["Utility"],
          icon: "./assets/file.svg"
        }
      }
    },
    {
      name: "@felixrieseberg/electron-forge-maker-nsis",
      config: {
        getAdditionalConfig: () => {
          return {
            artifactName: "OptimiPanel Setup ${version}"
          }
        },
        icon: "./assets/file.svg"
      },
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        background: './assets/dmg.png',
        format: 'ULFO',
        icon: "./assets/file.svg"
      }
    }

  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
