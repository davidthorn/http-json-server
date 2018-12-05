# Http JSON Server

So this is an experiment to see how much I can advance this database over time using various techniques which I will need to experiment with.

The test is as follows:

Create 2 files, named: `people.json` and the other `towns.json` in the `db` folder.

Next write one entry to each file.

An entry must contain the following properties:

```javascript
{
    id: string
    name: string
}
```

The items can be saved either as JSON within [] or simply just written to the file.

The task is to see how quickly the application can find an item with a matching id and return it.

Also the time it takes to accurately return the total number of entries in each database.

Duplicate entries with the same `id` property are not permitted.

This should all be timed and all the output should be saved to the `result.log` file.

This is the first commit which means that the latest commit must test this commits version on the same machine which it is testing its latest version so as to compare results accurately.

The `result.log` must be saved in the repository.

The only dependencies permitted are `fs`, `faker` and the only programming language permitted is `javascript`.

Multiple files are permitted to be saved in order to produce the results.

No code is permitted to be copied from other repositories either.

All research about algorithms and techniques must be referenced within this `README.md` so as to prove where the origin/author.

No changes to the `main.ts` are permitted apart from the `filesToWrite`property to test the number of files which should be produced.

Have fun!