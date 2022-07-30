# Pod Lib Update Action

> When your private pod repo updated, all you have to do is submit the code and tag it. Then action will automatically generate a new version of the library for you. No need to manually modify the spec file and submit to the spec repository


> [中文参考链接](https://zhuanlan.zhihu.com/p/108654090)

## Example usage
	name: 'update pob lib'
	on: 
	  create:
	    tags: 
	      - v*
	
	jobs:
	  pod_lib_update:
	    runs-on: macos-latest
	
	    steps: 
	      - name: Checkout
	        uses: actions/checkout@v2
	
	      - name: pod lib update
	        uses: wlixcc/pod-lib-update-action@1.0.0
	        with:
	          spec_repo_url: https://wlixcc:${{secrets.ACCESS_TOKEN}}@github.com/wlixcc/ninja-specs.git  
	          spec_file_path: /ninja-kit.podspec
	          
> [pod lib repo example](https://github.com/wlixcc/ninja-kit)

> [pod spec repo](https://github.com/wlixcc/ninja-specs)	          

## Inputs

### `spec_repo_url`

**Required** your spec repo url, Make sure the virtual machine has access to your repository, E.g. `https://wlixcc:${{secrets.ACCESS_TOKEN}}@github.com/wlixcc/ninja-specs.git`


### `spec_file_path`

**Required** *.podspec file path in your lib repo, repo root is '/', E.g. `/ninja-kit.podspec`

### `lint_args`
**Required** `pod lib lint` spec  args, such as `--allow-warnings`

### `push_args`
**Required** `pod repo push REPO [NAME.podspec]` args, such as `--allow-warnings`


