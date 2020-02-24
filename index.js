const core = require('@actions/core');
const github = require('@actions/github');
const shell = require('shelljs');

// get input
const spec_repo_url = core.getInput('spec_repo_url');
const spec_file_path = core.getInput('spec_file_path');
const lint_args = core.getInput('lint_args');
const push_args = core.getInput('push_args');
const ab_path = `${process.env.GITHUB_WORKSPACE}${spec_file_path}`;
const spec_repo_name = 'private_spec_repo';


const tagRef = 'refs/tags/';
if (!github.context.ref.startsWith('refs/tags/')) {
    core.setFailed('could not found tag');
    shell.exit(1);
}
const tag = github.context.ref.substring(tagRef.length);
console.log('version:' + tag);

// add spec repo
if (shell.exec(`pod repo add ${spec_repo_name} ${spec_repo_url}`).code !== 0) {
    core.setFailed('add spec repo failed');
    shell.exit(1);
}
// install fastlane
if (shell.exec('brew install fastlane').code !== 0) {
    core.setFailed('install fastlane failed');
    shell.exit(1);
}
// change version at spec file
if (shell.exec(`fastlane run version_bump_podspec path:${ab_path} version_number:${tag}`).code !== 0) {
    core.setFailed('spec file edit failed');
    shell.exit(1);
}
// lint spec
if (shell.exec(`pod spec lint ${ab_path} ${lint_args}`).code !== 0) {
    core.setFailed('lint spec failed');
    shell.exit(1);
}
// pod repo push
if (shell.exec(`pod repo push ${spec_repo_name} ${ab_path} ${push_args}`).code !== 0) {
    core.setFailed('pod repo push failed');
    shell.exit(1);
}
