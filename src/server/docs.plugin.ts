import {
  PluginOptions as DocsPluginOptions,
  LoadedContent,
  LoadedVersion,
} from '@docusaurus/plugin-content-docs'
import { LoadedPlugin, Props } from '@docusaurus/types'
import * as path from 'path'
import { Document } from './document'
import { ImageGenerator } from './imageGenerator'
import { DocsPageData } from './types/docs.types'
import { ImageRenderer } from './types/image.types'
import { PluginOptions } from './types/plugin.types'
import logger from '@docusaurus/logger'
import * as progress from './progress';

export class DocsPlugin {
  static plugin = 'docusaurus-plugin-content-docs'

  docs: Omit<DocsPageData, 'document'>[] = []

  constructor(
    private context: Props,
    private options: PluginOptions,
    private imageGenerator: ImageGenerator,
    private imageRenderer: ImageRenderer,
  ) {}

  process = async () => {
    await this.loadData()
    await this.generate()
  }

  loadData = async () => {
    const { plugins = [] } = this.context

    const docPlugins = plugins.filter(
      (plugin) => plugin.name === DocsPlugin.plugin,
    )

    for (const plugin of docPlugins) {
      await this.loadInstance(plugin)
    }
  }

  loadInstance = async (plugin: LoadedPlugin) => {
    const content = plugin.content as LoadedContent
    const options = plugin.options as DocsPluginOptions

    const { loadedVersions } = content

    for (const version of loadedVersions) {
      await this.loadVersion(options, version)
    }
  }

  loadVersion = async (options: DocsPluginOptions, version: LoadedVersion) => {
    this.docs.push(
      ...version.docs.map((doc) => ({
        version,
        metadata: doc,
        plugin: options,
      })),
    )
  }

  generate = async () => {
    logger.info(`Generating og images for ${this.docs.length} docs pages`)
    const bar = progress.defaultBar()
    bar.start(this.docs.length, 0, {prefix: 'rendering images', suffix: '-'})
    for (const doc of this.docs) {
      const document = new Document(this.getHtmlPath(doc)!)
      bar.update({ suffix: doc.metadata.permalink })

      await document.load()

      const image = await this.imageRenderer(
        {
          ...doc,
          document,
          websiteOutDir: this.context.outDir,
        },
        this.context,
      )

      if (!image) {
        await document.write()
        bar.increment()
        continue
      }

      const generated = await this.imageGenerator.generate(...image)
      await document.setImage(generated.url)

      await document.write()
      bar.increment()
    }
    bar.stop()
    logger.success('Generated og images for docs pages')
  }

  getHtmlPath = (doc: Partial<DocsPageData>) =>
    doc.metadata?.permalink &&
    path.join(this.stripLangFromPath(this.context.outDir), `${doc.metadata.permalink}.html`)
  stripLangFromPath = (path: string) => {
    const lang = this.context.i18n.locales.find((locale) => path.endsWith(`/${locale}`))
    return lang ? path.slice(0, -lang.length - 1) : path
  }
}
