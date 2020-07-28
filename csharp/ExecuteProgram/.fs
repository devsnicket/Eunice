[<System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage>]
module rec DevSnicket.Eunice.ExecuteProgram

open DevSnicket.Eunice.AnalyzeProject
open DevSnicket.Eunice.CallAnalyzeProjectForProjectOrSolutionPath
open DevSnicket.Eunice._ExecuteProgram.FormatHeaderComment
open DevSnicket.Eunice._ExecuteProgram.GetOrPromptForLicenseAcceptance
open DevSnicket.Eunice._ExecuteProgram.ParseArgumentsAndInferFromDirectoryPath
open DevSnicket.Eunice._ExecuteProgram.WriteNameAndVersion
open DevSnicket.Eunice.WriteInteractiveInDirectoryPathWithYaml

type Assembly = System.Reflection.Assembly
type Console = System.Console
type Int32 = System.Int32
type String = System.String

[<EntryPoint>]
let executeProgramWithArguments arguments =
    let version = Assembly.GetExecutingAssembly().GetName().Version

    writeNameAndVersion
        {|
            ResetColor = Console.ResetColor
            SetForegroundColor = Console.set_ForegroundColor
            Version = version
            Write = Console.Write
            WriteLine = Console.WriteLine
        |}

    arguments
    |> parseArgumentsAndInferFromDirectoryPath "."
    |> function
        | ParsedArguments parsedArguments ->
            executeProgramWithParsedArguments (parsedArguments, version)
            |> Async.RunSynchronously
        | Error error ->
            error |> Console.Error.WriteLine
            1

let private executeProgramWithParsedArguments (arguments: ParsedArguments, version) =
    async {
        let! isLicenseAccepted =
            getOrPromptForLicenseAcceptance
                {|
                    IsAcceptedInArguments = arguments.IsLicenseAccepted
                    IsInteractive = not <| Console.IsOutputRedirected
                    ReadKey = consoleReadKeyIntercept
                    WriteLine = Console.WriteLine
                |}

        if isLicenseAccepted then
            Microsoft.Build.Locator.MSBuildLocator.RegisterDefaults ()
            |> ignore

            let! {
                    Errors = errors
                    Yaml = yaml
                }
                =
                analyzeProject arguments.MemberBehavior
                |> callAnalyzeProjectForProjectOrSolutionPath arguments.FilePath

            errors |> Seq.iter Console.Error.WriteLine

            do!
                seq [
                    formatHeaderComment (DateTime.Now, version)
                    yield! yaml
                ]
                |> writeInteractiveInDirectoryPathWithYaml "."

            return 0
        else
            return 1
    }

let private consoleReadKeyIntercept () =
    Console.ReadKey(true).Key