pipeline {

  agent any

  environment {
    IMAGENAME = 'artifactory.vitasystems.dev/docker-registry/pds'
  }

  options {
    disableConcurrentBuilds()
    gitLabConnection 'vitagroup GitLab'
  }

  stages {

    stage('Prepare build') {
      steps {
        script {
          env.SONAR_BRANCH_TARGET = sh(script: 'sh .ci/get_target_branch.sh', returnStdout: true).trim()
          env.CDK_LIB_VERSION = sh(script: 'jq -r .version ./packages/cdk/package.json', returnStdout: true).trim()
          env.COMMON_LIB_VERSION = sh(script: 'jq -r .version ./packages/common/package.json', returnStdout: true).trim()
          env.PDS_COMPONENTS_LIB_VERSION = sh(script: 'jq -r .version ./packages/pds-components/package.json', returnStdout: true).trim()
          env.PDS_CSS_LIB_VERSION = sh(script: 'jq -r .version ./packages/pds-css/package.json', returnStdout: true).trim()

          echo "Building PDS from ${env.BRANCH_NAME} with versions:"
          echo " - cdk: ${env.CDK_LIB_VERSION}"
          echo " - common: ${env.COMMON_LIB_VERSION}"
          echo " - pds-components: ${env.PDS_COMPONENTS_LIB_VERSION}"
          echo " - pds-css: ${env.PDS_CSS_LIB_VERSION}"
        }
      }
    }
    stage('Build artifacts') {
      agent {
        docker {
          image 'node:lts-alpine'
          args "-v ${env.WORKSPACE}:/tmp/workspace -w /tmp/workspace"
          reuseNode true
        }
      }

      steps {
          script {
            withCredentials([
              string(credentialsId: 'fontawesome-pro-npm-auth-token', variable: 'FONTAWESOME_TOKEN'),
              usernamePassword(credentialsId: 'artifactory-ci-jenkins', passwordVariable: 'ARTIFACTORY_PASSWORD', usernameVariable: 'ARTIFACTORY_USERNAME')
            ]) {
              env.ARTIFACTORY_PASSWORD_B64 = ARTIFACTORY_PASSWORD.bytes.encodeBase64().toString();
              withEnv([
                "HOME=.",
                "NPM_USERNAME=${env.ARTIFACTORY_USERNAME}",
                "NPM_PASSWORD=${env.ARTIFACTORY_PASSWORD_B64}",
                "FONTAWESOME_NPM_TOKEN=${env.FONTAWESOME_TOKEN}"
              ]) {
                sh 'cp .docker/npm/.npmrc .npmrc'

                sh 'npm ci'
                sh 'npm run pds-doc-icons-to-ts'
                sh 'npm run pds-components:json'
                sh 'npx nx lint cdk'
                sh 'npx nx lint common'
                sh 'npx nx lint pds-components'
/*                 sh 'npx nx test --coverage --skip-nx-cache' */
                sh 'npx nx build cdk --prod --skip-nx-cache'
                sh 'npx nx build common --prod --skip-nx-cache'
                sh 'npx nx build pds-components --prod --skip-nx-cache'
                sh 'npx nx build pds-css --prod --skip-nx-cache'
                sh 'npx nx build storybook --prod --skip-nx-cache'
            }
          }
        }
      }
    }

  /*
  stage('Dependency check') {
      steps {
        script {
          sh 'cd packages/ngx-pen-design-system && npm i && npm prune'
          sh '''docker run \
                    --network host \
                    --shm-size=512m \
                    -v ${pwd}:/tmp/workspace \
                    -w /tmp/workspace \
                    openjdk:latest && \
                    cd packages/ngx-pen-design-system && \
                    chmod +x run-dependency-check.sh && \
                    ./run-dependency-check.sh'''
          sh 'rm -rf node_modules && rm package-lock.json'
        }
      }
    }

    stage('Sonar analysis') {
      agent {
        docker {
          image 'docker-registry/alpine-sonarscanner:0.3.1'
          registryUrl 'https://artifactory.vitasystems.dev'
          registryCredentialsId 'artifactory-ci-jenkins'
          args "-v /var/custom_caches/jenkins/.m2:/var/custom_caches/jenkins/.m2 -v ${env.WORKSPACE}:/tmp/workspace -w /tmp/workspace"
          reuseNode true
        }
      }

      steps {
        script {
          withSonarQubeEnv('Sonar') {
            sh """sonar-scanner \
                        -Dsonar.host.url=${env.SONAR_HOST_URL} \
                        -Dsonar.login=${env.SONAR_AUTH_TOKEN} \
                        -Dsonar.projectVersion=${env.LIB_VERSION} \
                        -Dsonar.branch.name=${env.BRANCH_NAME} \
                        -Dsonar.branch.target=${env.SONAR_BRANCH_TARGET}
                        """
          }
        }
      }
    }

    stage("Quality gate") {
      steps {
        gitlabCommitStatus('Quality gate') {
          timeout(time: 20, unit: 'MINUTES') {
            waitForQualityGate abortPipeline: true
          }
        }
      }
    }

    stage('Publish Design System library') {
      when {
        expression {
          script {
            return env.BRANCH_NAME == 'master'
          }
        }
      }
      steps {
        gitlabCommitStatus('Publish library') {
          script {
            sh 'cd ./dist/packages/ngx-pen-design-system && npm publish --registry https://artifactory.vitasystems.dev/artifactory/api/npm/npm/'
          }
        }
      }
    }

    stage('Build demo Docker image') {
      when {
        expression {
          script {
            return env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'develop'
          }
        }
      }
      steps {
        gitlabCommitStatus('Build docker image') {
          script {
            env.BRANCH_NAME = env.BRANCH_NAME.replaceAll('/', '-')

            env.TAG_LATEST = "${env.IMAGENAME}:latest"
            env.TAG_VERSION = "${env.IMAGENAME}:${env.LIB_VERSION}"

            echo "Version: ${env.LIB_VERSION}"

            echo "Tagging: ${env.TAG_LATEST}"
            echo "Tagging: ${env.TAG_VERSION}"

            withCredentials([usernamePassword(credentialsId: 'artifactory-ci-jenkins', passwordVariable: 'ARTIFACTORY_PASSWORD', usernameVariable: 'ARTIFACTORY_USERNAME')]) {
              env.ARTIFACTORY_PASSWORD_B64 = ARTIFACTORY_PASSWORD.bytes.encodeBase64().toString();
              sh 'docker build . -t ${TAG_LATEST} -t ${TAG_VERSION}'
            }
          }
        }
      }
    }

    stage('Push demo Docker image') {
      when {
        expression {
          script {
            return env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'develop'
          }
        }
      }
      steps {
        gitlabCommitStatus('Push docker image') {
          script {
            withCredentials([usernamePassword(credentialsId: 'artifactory-ci-jenkins', passwordVariable: 'ARTIFACTORY_PASSWORD', usernameVariable: 'ARTIFACTORY_USERNAME')]) {
              sh 'echo ${ARTIFACTORY_PASSWORD} | docker login artifactory.vitasystems.dev/docker-registry -u ${ARTIFACTORY_USERNAME} --password-stdin'
            }

            sh "docker push ${env.TAG_LATEST}"
            sh "docker push ${env.TAG_VERSION}"

            sh "docker rmi ${env.TAG_LATEST} | true"
            sh "docker rmi ${env.TAG_VERSION} | true"
          }

        }
      }
    }

    stage('Deploy demo') {
      when {
        expression {
          script {
            return env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'develop'
          }
        }
      }
      steps {
        gitlabCommitStatus('Deploy Demo') {
          sh "helm upgrade --kube-context kube --install -f ./helm-chart/values.yaml --set images.docs.version=${env.LIB_VERSION} -n pen-design-system-demo pen-design-system-demo ./helm-chart"
        }
      }
    } */

  }

}
