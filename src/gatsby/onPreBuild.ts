import { execSync } from 'child_process';

const onPreBuild = async () => {
  process.env.GATSBY_BUILD_DATE = new Date().toISOString();
  process.env.GATSBY_GIT_SHA = execSync('git rev-parse HEAD').toString().trim().substring(0,8);
};

export default onPreBuild;
