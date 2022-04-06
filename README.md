# csv-to-md-table-action

This action prints converts a given CSV to a markdown formatted table

## Inputs

### `csvinput`

**Required** CSV to be converted.

## Outputs

### `markdown-table`

The markdown formatted table

## Example usage

```yaml
uses: petems/csv-to-md-action@master
with:
  csvinput: | 
    First Name, Last Name, Address, Town, State, Zip
    John,Doe,120 jefferson st.,Riverside, NJ, 08075
    Jack,McGinnis,220 hobo Av.,Phila, PA,09119
```

You can then take the output to post comments on pull-requests for example:

```yaml
on:
  pull_request:
    paths:
      - '*/**.csv'

jobs:
  build:
    name: Comment CSV as Pull-request Table
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@master
      - name: Read CSV
        id: csv
        uses: juliangruber/read-file-action@v1
        with:
          path: ./people.csv
      - name: Create MD
        uses: petems/csv-to-md-table-action@master
        id: csv-table-output
        with:
          csvinput: ${{ steps.csv.outputs.content }}
      - uses: mshick/add-pr-comment@v1
        with:
          message: |
            ${{steps.csv-table-output.outputs.markdown-table}}
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          repo-token-user-login: 'github-actions[bot]' # The user.login for temporary GitHub tokens
          allow-repeats: true
```

So when you make a change to CSV file via pull-request, it makes a comment with the table:
![image](https://user-images.githubusercontent.com/1064715/93686821-e0260e80-fab0-11ea-8932-4424172c8190.png)

There's a demo of it in action here: https://github.com/petems/csv-table-comment-example

## Testing

Install the dependencies

```bash
npm install
```

Run the tests :heavy_check_mark:

```bash
$ npm test

> javascript-action@1.0.0 test /Users/petersouter/projects/csv-to-md-table-action
> jest

 PASS  ./index.test.js
  ✓ parses csv and converts to valid markdown table (138ms)
...
```

## Package for distribution

GitHub Actions will run the entry point from the action.yml. Packaging assembles the code into one file that can be checked in to Git, enabling fast and reliable execution and preventing the need to check in node_modules.

Actions are run from GitHub repos.  Packaging the action will create a packaged action in the dist folder.

Run prepare

```bash
npm run prepare
```

Since the packaged index.js is run from the dist folder.

```bash
git add dist
```

## Create a release branch

Users shouldn't consume the action from master since that would be latest code and actions can break compatibility between major versions.

Checkin to the v1 release branch

```bash
git checkout -b v1
git commit -a -m "v1 release"
```

```bash
git push origin v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)
