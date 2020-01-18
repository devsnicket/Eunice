import { ParserPlugin } from "@babel/parser"

export = Options

interface Options {
	readonly babelParserPlugins?: Iterable<ParserPlugin>
	readonly directoryPath?: DirectoryPath
	readonly fileExtensions?: string[]
	readonly isCalleeIgnored?: boolean
}

interface DirectoryPath {
	readonly absolute: string
	readonly relative: string
}