// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
module rec DevSnicket.Eunice._ExecuteProgram.GetOrPromptForLicenseAcceptance

open DevSnicket.Eunice._ExecuteProgram._GetOrPromptForLicenseAcceptance.CommercialUseText
open DevSnicket.Eunice.ReadTextFromEmbedded

type Boolean = System.Boolean
type ConsoleKey = System.ConsoleKey
type String = System.String

let getOrPromptForLicenseAcceptance
    (parameter:
    {|
        IsAcceptedInArguments: Boolean
        IsInteractive: Boolean
        ReadKey: unit -> ConsoleKey
        WriteLine: String -> unit
    |}) =
    async {
        if parameter.IsAcceptedInArguments then
            parameter.WriteLine |> writeLinesForAcceptedInProcessArguments

            return true
        else
            return! parameter |> instructOrPrompt
    }

let private writeLinesForAcceptedInProcessArguments writeLine =
    for line in
        seq [
            "By specifying " + ArgumentNames.AcceptLicense + " you have accepted " + licenseUrlText
            commercialUseText
            ""
        ] do
        line |> writeLine

let private instructOrPrompt parameter =
    async {
        for line in
            seq [
                "To use this program you must accept " + licenseUrlText
                commercialUseText
                ""
            ] do
            line |> parameter.WriteLine

        if parameter.IsInteractive then
            return! parameter |> prompt
        else
            "To accept and continue run again with the " + ArgumentNames.AcceptLicense + " argument."
            |> parameter.WriteLine

            return false
    }

let private prompt parameter =
    let rec prompt () =
        async {
            for line in
                seq [
                    "To accept and continue, press the A key or run again with the " + ArgumentNames.AcceptLicense + " argument."
                    "Press the V key to view the license."
                    "Any other key will exit without accepting the license."
                    ""
                ] do
                line |> parameter.WriteLine

            return!
                parameter.ReadKey()
                |> function
                    | ConsoleKey.V ->
                        viewLicense ()
                    | ConsoleKey.A ->
                        true |> async.Return
                    | _ ->
                        false |> async.Return
        }

    and viewLicense () =
        async {
            let! license =
                [ "license.txt" ] // cspell:disable-line
                |> readTextFromEmbedded

            for line in
                seq [
                    yield! license.Split("\n")
                    ""
                ] do
                line |> parameter.WriteLine

            return! prompt ()
        }

    prompt ()

let licenseUrlText = "the license https://devsnicket.com/eunice/licensing"