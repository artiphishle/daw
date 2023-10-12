const config = {
  compilerOptions: {
    baseUrl: "../",
    target: "es5",
    lib: ["es5", "dom"],
    types: ["cypress", "node"],
  },
  include: ["**/*.ts"],
};

export default config;
