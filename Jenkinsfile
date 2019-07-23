podTemplate(label: 'jenkins-pipeline', containers: [
    containerTemplate(
      name: 'docker',
      image: 'docker',
      command: 'cat',
      ttyEnabled: true,
      alwaysPullImage: true
    ),
],
volumes:[
    hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
]){

  node ('jenkins-pipeline') {

    // User Custom Setting ////////////////////////////////////////////////////////////////////////////////////////////////
    def DEPLOY_TARGET = "alpha"
    def K8S_NAMESPACE = "serverless-console"

    def STAGE_EXECUTE_docker          = "true"
    def STAGE_EXECUTE_kubectl_config  = "true"
    def STAGE_EXECUTE_helm            = "true"
    def STAGE_EXECUTE_kubectl_apply   = "true"

    def SERVICE_NAME = "serverless-console-frontend"
    def SERVICE_VERSION = "1.0.3-devworkflow"
    def IMAGE_VERSION = "${SERVICE_VERSION}-${DEPLOY_TARGET}"
    def SERVICE_HOST = "alpha.action.cloudz.co.kr"
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    def DOCKER_REGISTRY_URL = "harbor.ops.action.cloudz.co.kr"
    def DOCKER_PROJECT = "intern_test"
    def DOCKER_USERNAME = "admin"
    def DOCKER_PASSWORD = "!Cloudev00"
    def DOCKER_DOCKERFILE = './Dockerfile'

    // checkout sources
    checkout scm

    stage ('Docker Build/Push') {
      container('docker') {
        if("${STAGE_EXECUTE_docker}" == "true"){
          println "Docker Build/Push Started"
          retry(3) {
            sh "docker login ${DOCKER_REGISTRY_URL} --username ${DOCKER_USERNAME} --password ${DOCKER_PASSWORD}"
            sh "docker build -f ${DOCKER_DOCKERFILE} -t ${DOCKER_REGISTRY_URL}/${DOCKER_PROJECT}/${SERVICE_NAME}:${IMAGE_VERSION} ."
            sh "docker push ${DOCKER_REGISTRY_URL}/${DOCKER_PROJECT}/${SERVICE_NAME}:${IMAGE_VERSION}"
          }
        }else{
          println "Docker Build/Push Passed"
        }
      }
    }
  }
}
