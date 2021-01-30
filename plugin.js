export const regex = /^\s*deferFile\s*\(\s*["'`]([^"'`]*)["'`],?([^]*)\)$/;

export default {
  processAST(buffer, env) {
    const promises = [];
    const result = [];
    for (let entry of buffer) {
      if (entry.val) {
        const val = entry.val.trim();
        if (regex.test(val)) {
          const match = regex.exec(val);
          const filename = match[1];
          const paramStr = match[2].trim();
          promises.push({ filename, paramStr });
        }
      }
      result.push(entry);
    }

    if (promises.length) {
      const promiseCalls = promises.map(({ filename, paramStr }) =>
        `\nE.includeFile("${filename}", ${paramStr || null})`
      ).join(",");

      const topline = `const __resolved = await Promise.all([${promiseCalls}]);
        const deferFile = () => __resolved.shift();`;

      result.unshift({ t: "e", val: topline });
    }
    return result;
  },
};
