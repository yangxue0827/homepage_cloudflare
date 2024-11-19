import {
  inject
} from "./chunk-HBGG36HX.js";

// node_modules/.pnpm/@css-render+vue3-ssr@0.15.14_vue@3.4.38_typescript@5.5.4_/node_modules/@css-render/vue3-ssr/esm/index.js
var ssrContextKey = "@css-render/vue3-ssr";
function createStyleString(id, style) {
  return `<style cssr-id="${id}">
${style}
</style>`;
}
function ssrAdapter(id, style, ssrContext) {
  const { styles, ids } = ssrContext;
  if (ids.has(id))
    return;
  if (styles !== null) {
    ids.add(id);
    styles.push(createStyleString(id, style));
  }
}
var isBrowser = typeof document !== "undefined";
function useSsrAdapter() {
  if (isBrowser)
    return void 0;
  const context = inject(ssrContextKey, null);
  if (context === null)
    return void 0;
  return {
    adapter: (id, style) => ssrAdapter(id, style, context),
    context
  };
}
function setup(app) {
  const styles = [];
  const ssrContext = {
    styles,
    ids: /* @__PURE__ */ new Set()
  };
  app.provide(ssrContextKey, ssrContext);
  return {
    collect() {
      const res = styles.join("\n");
      styles.length = 0;
      return res;
    }
  };
}

export {
  useSsrAdapter,
  setup
};
//# sourceMappingURL=chunk-CASWV77M.js.map
