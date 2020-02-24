# Pod Lib Update Action

This action update you pod lib with tag

## Inputs

### `spec_repo_url`

**Required** your spec repo url, make sure you have permission


### `spec_file_path`

**Required** *.podspec file path in your lib repo, relative path

### `lint_args`
**Required** `pod lib lint` spec  args, such as `--allow-warnings`

### `push_args`
**Required** `pod repo push REPO [NAME.podspec]` args, such as `--allow-warnings`


## Example usage
