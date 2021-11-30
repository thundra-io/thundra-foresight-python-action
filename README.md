# thundra-foresight-python-action

A GitHub Action to instrument your Python test runs.

## Usage

Information about available parameters is listed [below](#parameters). **Make sure to check out the [Known Issues](#known-issues)**.

The required parameters are the Thundra API Key and the Thundra Project ID, which can be obtained from [foresight.thundra.io](https://foresight.thundra.io/).

You can learn more about Thundra at [thundra.io](https://thundra.io)

Once you get the Thundra API Key, make sure to set it as a secret. A sample Github Action workflow would look like this:

### Running the Command With Thundra

It is possible to run test commands by giving them to the Thundra stage like below. Please make sure that pytest and pip have been installed.

```yaml
# ...

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: [3.9]
    
    steps:
      - uses: actions/checkout@v2
      
        # Specify your python install step
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: ${{ matrix.python-version }}

      - name: Install system requirements
        run: pip install pytest

      - name: Install Thundra Python Agent
        uses: thundra-io/thundra-foresight-python-action@v1
        with:
          apikey: ${{ secrets.THUNDRA_APIKEY }}
          project_id: ${{ secrets.THUNDRA_PROJECT_ID }}
          command: pytest ${TEST_FOLDER}
```

### Running the Command Separately

If you have already steps that run your tests by using pytest, Adding Thundra Python Github
Action after whole dependencies installing steps is all you need with using THUNDRA_APIKEY and THUNDRA_PROJECT_ID from secrets.

```yaml
# ...

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
      
      => Predefined steps for setting up and installing both system and test dependencies

      - name: Install Thundra Python Agent
        uses: thundra-io/thundra-foresight-python-action@v1
        with:
          apikey: ${{ secrets.THUNDRA_APIKEY }}
          project_id: ${{ secrets.THUNDRA_PROJECT_ID }}

      => Test Steps
```

## Known Issues

### Using It with Build Matrix

If you are using a build matrix in your workflow, each run in your build matrix will show up like it's a different testrun on Thundra Foresight where in fact they belong to the same build.

With the current GitHub Action context, it's not possible to understand that those runs belogs to the same run. So, the obvious solution is to set a unique testrun ID for these runs before the matrix starts.

To solve this problem and other issues if we need to, we've written the [Thundra Test Init Action](https://github.com/thundra-io/thundra-test-init-action).

Make sure to follow the instruction in the repository.

## Parameters

| Name                      | Requirement       | Default                  | Description
| ---                       | ---               | ---                      | ---
| apikey                    | Required          | ---                      | Thundra API Key
| project_id                | Required          | ---                      | Your project id from Thundra. Will be used to filter and classify your testruns.
| test_disable              | Optional          | False                    | Disable Thundra 
| framework                 | Optional          | pytest                   | Test framework type. Currently only pytest framework is allowed.
| command                   | Optional          | ---                      | The pytest command you want to run. 
| agent_version             | Optional          | ---                      | A specific version Thundra Python Agent you want to use should be defined here. If this value is not specified latest version of Thundra Python Agent will be use.