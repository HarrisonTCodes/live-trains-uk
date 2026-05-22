import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'app/utils/prisma/client/**'],
  },
  ...nextVitals,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
];

export default eslintConfig;
