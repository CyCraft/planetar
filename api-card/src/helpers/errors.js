export const noRequiredPropExampleErrorMsg = `You need to provide an example for all required props to be able to generate a preview.
Eg.
\`\`\`js
props: {
  /*
   * @example ['First Tab', 'Second Tab']
   */
  labels: { type: Array, required: true },
}
\`\`\``
