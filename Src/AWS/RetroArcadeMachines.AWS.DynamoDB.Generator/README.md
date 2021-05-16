# RetroArcadeMachines AWS DynamoDB Generator
An application that allows creates required tables in Dynamo DB, to be able to run retro arcade machines thie must be run prior to deploying any services


AWS access key and secret key needs to be added to have this application work.
Values are not kept in source control for so that ther are never accidently shared.
The code to add profile credentials to your local environment is commented out in StartupExtensions.
A file will get created at C:\Users\[your username]\AppData\Local\AWSToolkit\RegisteredAccounts.json