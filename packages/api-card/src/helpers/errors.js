export const noRequiredPropExampleErrorMsg = `You **must** provide an example for all _required_ props to be able to generate an interactive preview!!
Eg.
\`\`\`js
props: {
  /**
   * @type {string[]}
   * @example ['First Tab', 'Second Tab']
   */
  labels: { type: Array, required: true },
}
\`\`\``
