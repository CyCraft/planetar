export type BlockTag = ParamTag | Tag

export interface Module {
  name: string
  path: string
}

/**
 * Universal model to display origin
 */
export interface Descriptor {
  extends?: Module
  mixin?: Module
}

export interface ParamType {
  name: string
  elements?: ParamType[]
}

export interface UnnamedParam {
  type?: ParamType
  description?: string | boolean
}

export interface Param extends UnnamedParam {
  name?: string
}

interface RootTag {
  title: string
}

export interface Tag extends RootTag {
  content: string | boolean
}

export interface ParamTag extends RootTag, Param {}

export interface DocBlockTags {
  description?: string
  tags?: Array<ParamTag | Tag>
}

interface EventType {
  names: string[]
}

interface EventProperty {
  type: EventType
  name?: string
  description?: string | boolean
}

export interface EventDescriptor extends DocBlockTags, Descriptor {
  name: string
  type?: EventType
  properties?: EventProperty[]
}

export interface PropDescriptor extends Descriptor {
  type?: { name: string; func?: boolean }
  description?: string
  required?: boolean
  defaultValue?: { value: string; func?: boolean }
  tags?: { [title: string]: BlockTag[] }
  values?: string[]
  name: string
}

export interface MethodDescriptor extends Descriptor {
  name: string
  description: string
  returns?: UnnamedParam
  tags?: { [key: string]: BlockTag[] }
  params?: Param[]
  modifiers?: string[]
  [key: string]: any
}

export interface SlotDescriptor extends Descriptor {
  name: string
  description?: string
  bindings?: ParamTag[]
  scoped?: boolean
}

export interface ComponentDoc {
  /**
   * Usual name of the component:
   *  It will take by order of priority
   *  - The contents of the @displayName tag of the component
   *  - The name of the variable containing the component (or the class if class component)
   *  - the name of the file containing the component
   */
  displayName: string

  /**
   * name of the export containing the component
   * In most cases `default`
   * If you export es6 named components you can find those names here
   */
  exportName: string

  /**
   * Contents of every line that is not contained in a tag
   * in the code block before your component
   * @see below
   */
  description?: string
  /**
   * Array of `PropDescriptor` objects describing all props unless ignored via the @ignore tag
   */
  props?: PropDescriptor[]
  /**
   * Array of `MethodDescriptor` objects describing all methods declared public via the @public tag
   */
  methods?: MethodDescriptor[]
  /**
   * Array of `SlotDescriptor` objects describing all slots
   */
  slots?: SlotDescriptor[]
  /**
   * Array of `EventDescriptor` objects describing all event emitted by your components
   */
  events?: EventDescriptor[]
  /**
   * All tags applied to the component
   * @remark only component tags are stored here.
   * Prop, method and event tags are stored with the property they describe
   */
  tags?: { [key: string]: BlockTag[] }
  /**
   * When using SFC components, one can use `<docs>` blocks.
   * This is the content of the current docs block if it was found
   */
  docsBlocks?: string[]
  /**
   * Extra free data that user can set if they need (not used in the current standard)
   */
  [key: string]: any
}
