module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-case': [2, 'never', 'lower-case'],
    'type-enum': [0, 'always', ['Task',],],
    'body-has-properties': [2, 'always', ['[UPD]', '[ADD]', '[FIX]', '[DEL]']],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(Task #[0-9]{1,}):(.*)/,
      headerCorrespondence: ['type', 'subject']
    }
  },
  plugins: [
    {
      rules: {
        'body-has-properties': function ({ body }, _, prefixes) {
          if (body !== null && body !== undefined) {
            return [
              body.split('\n').every(element => prefixes.some(prefix => element.startsWith(prefix))),
              `Your body line should be init with one of ${prefixes.join(", ")}`,
            ];
          } else {
            return [
              true,
              "Body Ok"
            ]
          }
        },
      },
    }
  ]
}
